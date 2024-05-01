import { ConfigHandler } from "../../config/index.js";

export class CodemodService extends ConfigHandler {
  constructor(
    public override cwd: string,
    public argv: string[]
  ) {
    super(cwd);
  }

  private isFlagged<const File extends string>(file: File) {
    return /[`|'|"]+use client+[`|'|"]+[;]?/g.test(file);
  }

  public importPatternRegex() {
    /* eslint-disable-next-line no-useless-escape */
    return /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g;
  }

  public detectExportFile<const File extends string>(file: File) {
    return /(export (([{]+?\s{0,}(default\s{1,}as\s{1,}|\s)?((React\.)?(use)+[A-Z]{1,1}[a-z]+?[\w]+)\s{0,}[}]?)|((React\.)?(use)+[A-Z]{1,1}[a-z]+?[\w]+)|([*])?) from ['|"]+(.*?)+['|"]+[;]?)/g.test(
      file
    );
  }

  public get source() {
    return this.argv[3] ?? "";
  }

  public filterForFiles() {
    return this.readDirRecursive(this.source)
      .filter(t => t.split(/\./g).length > 1)
      .filter(v =>
        /((c|m)?(j|t)sx?)/g.test(
          v.split(/(\.)/g).reverse()[0] ?? "")
      )
      .map(prependSrc => `${this.source}/${prependSrc}`);
  }

  public recursivelyReadAndSort(
    arrMatch: [string, string][] = Array.of<[string, string]>(),
    arrNoMatch: [string, string][] = Array.of<[string, string]>()
  ) {
    try {
      const fileToBuff = (props: string) => this.fileToBuffer(props);
      this.filterForFiles().forEach(function (v) {
        const data = fileToBuff(v).toString("utf-8");
        if (
          /\b((React\.)?(((use)+(Breadcrumb|Callback|(Clear|Current|Toggle)?Refinement(s|List)?|Configure|Connector|Context|DynamicWidgets|(Debug|Deferred)Value|(Layout|Insertion)?Effect|Form(State|Status)|GeoSearch|(Hierarchical|Numeric)?Menu|(Infinite)?Hits(PerPage)?|ImperativeHandle|InstantSearch|Memo|Optimistic|Pagination|(Search)?Params|Pathname|PoweredBy|QueryRules|Range|Reducer|Ref|ReportWebVitals|Router|SearchBox|SelectedLayoutSegment|SelectedLayoutSegments|SortBy|State|Stats|SyncExternalStore|Transition))|((create)(Context|Element|Factory|Ref|Root|Portal))|((hydrate)(Root))|((cloneElement)|(findDOMNode)|(flushSync)|(forwardRef)|(isValidElement)|(memo)|(startTransition))))\b/g.test(
            data
          )
        ) {
          arrMatch.push([v, data]);
          return [v, data];
        } else {
          arrNoMatch.push([v, data]);
          return [v, data];
        }
      });
    } catch (err) {
      throw new Error(JSON.stringify(err, null, 2));
    } finally {
      /* eslint-disable-next-line no-unsafe-finally */
      return { arrMatch, arrNoMatch };
    }
  }

  public prependCodemodFlag<const T extends string>(file: T) {
    return file
      .split(`\n`)
      .reverse()
      .concat('"use client";')
      .reverse()
      .join(`\n`);
  }

  public sortRecord<const T extends Record<string, number>>(record: T) {
    return Object.fromEntries(
      Object.entries(record)
        .sort(
          ([aKey, _aVal], [bKey, _bVal]) =>
            aKey.localeCompare(bKey) - bKey.localeCompare(aKey)
        )
        .sort(([_aKey, aVal], [_bKey, bVal]) => bVal - aVal)
    );
  }

  public outputFilePatternTrigger<
    const V extends string,
    const F extends string,
    const B extends boolean
  >(val: V, file: F, withLogFile: B) {
    const valRemoveImports = val.replace(
      /* eslint-disable-next-line no-useless-escape */
      /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
      ""
    );
    const matchRegExpArr = valRemoveImports.match(
      /\b((React\.)?(((use)+(Breadcrumb|Callback|(Clear|Current|Toggle)?Refinement(s|List)?|Configure|Connector|Context|DynamicWidgets|(Debug|Deferred)Value|(Layout|Insertion)?Effect|Form(State|Status)|GeoSearch|(Hierarchical|Numeric)?Menu|(Infinite)?Hits(PerPage)?|ImperativeHandle|InstantSearch|Memo|Optimistic|Pagination|(Search)?Params|Pathname|PoweredBy|QueryRules|Range|Reducer|Ref|ReportWebVitals|Router|SearchBox|SelectedLayoutSegment|SelectedLayoutSegments|SortBy|State|Stats|SyncExternalStore|Transition))|((create)(Context|Element|Factory|Ref|Root|Portal))|((hydrate)(Root))|((cloneElement)|(findDOMNode)|(flushSync)|(forwardRef)|(isValidElement)|(memo)|(startTransition))))\b/g
    );
    if (withLogFile === true) {
      /* eslint-disable-next-line prefer-const */
      let accumulator: Record<string, number> = {};
      matchRegExpArr?.forEach(function (match) {
        /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */
        accumulator[match] = (accumulator[match] || 0) + 1;
      });
      const sorted = this.sortRecord(accumulator);
      const keys = Object.entries(sorted).map(([key, _val]) => key);
      this.withWs({
        data: JSON.stringify(
          {
            ["detected"]: keys,
            counts: sorted
          },
          null,
          2
        ),
        path: `.ddcodemod/${file}.json`
      });
      return matchRegExpArr;
    } else return matchRegExpArr;
  }

  public checkSorted<const T extends boolean>(withLogFile: T) {
    const { arrMatch } = this.recursivelyReadAndSort(
      Array.of<[string, string]>(),
      Array.of<[string, string]>()
    );
    return arrMatch.map(([key, val]) => {
      if (this.isFlagged(val) === false) {
        this.outputFilePatternTrigger(val, key, withLogFile);
        this.withWs({ data: this.prependCodemodFlag(val), path: key });
      } else return;
    });
  }

  public handleGitIgnore() {
    const exists = this.existsSync(".ddcodemod/.gitignore");

    if (exists === true) {
      return;
    } else {
      return this.withWs({
        path: ".ddcodemod/.gitignore",
        data: "**/*"
      });
    }
  }

  public async exe<const T extends boolean>(withLogFile: T) {
    return Promise.all([this.checkSorted(withLogFile)]).then(([_]) =>
      this.handleGitIgnore()
    );
  }
}
