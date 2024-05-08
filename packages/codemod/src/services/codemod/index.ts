import type { OutputLogsShape } from "../../types/index.js";
import { ConfigHandler } from "../../config/index.js";

/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */

export class CodemodService extends ConfigHandler {
  constructor(
    public override cwd: string,
    public argv: string[],
    public logCount: string
  ) {
    super(cwd);
  }

  private isFlagged<const F extends string>(file: F) {
    return /[`|'|"]+use client+[`|'|"]+[;]?/g.test(file);
  }

  public isComment() {
    return /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm;
  }

  public importPatternRegex() {
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
        /((c|m)?(j|t)sx?)/g.test(v.split(/(\.)/g).reverse()[0] ?? "")
      )
      .map(prependSrc => `${this.source}/${prependSrc}`);
  }

  public detectStyleJsx() {
    return /(<style\s+jsx>)/g;
  }

  public recursivelyReadAndSort(
    arrMatch: [string, string][] = Array.of<[string, string]>(),
    arrNoMatch: [string, string][] = Array.of<[string, string]>()
  ) {
    try {
      const fileToBuff = (props: string) => this.fileToBuffer(props);
      this.filterForFiles().forEach(function (v) {
        const data = fileToBuff(v).toString("utf-8");
        // prevent false positives by omitting comments/commented out code
        const dataSansComments = data.replace(
          /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm,
          ""
        );
        if (
          /(<style\s+jsx>)|\b((React\.)?(((use)+(Breadcrumb|Callback|(Clear|Current|Toggle)?Refinement(s|List)?|Configure|Connector|Context|DynamicWidgets|(Debug|Deferred)Value|(Layout|Insertion)?Effect|Form(State|Status)|GeoSearch|(Hierarchical|Numeric)?Menu|(Infinite)?Hits(PerPage)?|ImperativeHandle|InstantSearch|Memo|Optimistic|Pagination|(Search)?Params|Pathname|PoweredBy|QueryRules|Range|Reducer|Ref|ReportWebVitals|Router|SearchBox|SelectedLayoutSegment|SelectedLayoutSegments|SortBy|State|Stats|SyncExternalStore|Transition))|((create)(Context|Element|Factory|Ref|Root|Portal))|((hydrate)(Root))|((cloneElement)|(findDOMNode)|(flushSync)|(forwardRef)|(isValidElement)|(memo)|(startTransition))))\b/g.test(
            dataSansComments
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

  public readOutputLogs() {
    if (this.existsSync(`${this.logsDir}/${this.logCount}`)) {
    return this.readDirRecursive(`${this.logsDir}/${this.logCount}`)
      .filter(t => /((summary_*)|\.(gitignore))/g.test(t) === false)
      .filter(path => path.split(/\./g).length > 1);
    }
    else return null
  }

  public extractOutputLogCounts() {
    const output = this.readOutputLogs();
    if (output) {
    return output
      .map(
        v =>
          JSON.parse(
            this.fileToBuffer(`${this.logsDir}/${this.logCount}/${v}`).toString("utf-8")
          ) as OutputLogsShape
      )
      .map(file => {
        return file.counts;
      });
  } else return null
}

  public recordAggregation() {
    let r: Record<string, number> = {};
    const countsArr = this.extractOutputLogCounts();

    if (countsArr && countsArr.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
      for (let i = 0; i < countsArr.length; i++) {
        Object.entries(countsArr[i]!).map(([key, val]) => {
          r[key] = (r[key]! || 0) + val;
          return r;
        }),
          {};
      }
      return r;
    } else return 0;
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
    /* omit imports (1st) and comments (2nd) to prevent erroneous reads */
    const valRemoveImportsAndComments = val
      .replace(
        /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
        ""
      )
      .replace(
        /(?:(?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:(?<!\:|\\\|\')\/\/.*))/gm,
        ""
      );
    const matchRegExpArr = valRemoveImportsAndComments.match(
      /(<style\s+jsx>)|\b((React\.)?(((use)+(Breadcrumb|Callback|(Clear|Current|Toggle)?Refinement(s|List)?|Configure|Connector|Context|DynamicWidgets|(Debug|Deferred)Value|(Layout|Insertion)?Effect|Form(State|Status)|GeoSearch|(Hierarchical|Numeric)?Menu|(Infinite)?Hits(PerPage)?|ImperativeHandle|InstantSearch|Memo|Optimistic|Pagination|(Search)?Params|Pathname|PoweredBy|QueryRules|Range|Reducer|Ref|ReportWebVitals|Router|SearchBox|SelectedLayoutSegment|SelectedLayoutSegments|SortBy|State|Stats|SyncExternalStore|Transition))|((create)(Context|Element|Factory|Ref|Root|Portal))|((hydrate)(Root))|((cloneElement)|(findDOMNode)|(flushSync)|(forwardRef)|(isValidElement)|(memo)|(startTransition))))\b/g
    );
    if (withLogFile === true && matchRegExpArr) {
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
        path: `${this.logsDir}/${this.logCount}/${file}.json`
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
    const exists = this.existsSync(`${this.logsDir}/.gitignore`);

    if (exists === true) {
      return;
    } else {
      return this.withWs({
        path: `${this.logsDir}/.gitignore`,
        data: "**/*"
      });
    }
  }

  public get summaryPathsFormatted() {
    const output = this.readOutputLogs();
    if (output) {
    return output
      .filter(t => /summary\//g.test(t) === false)
      .map(t => t.split(/\.json/g)?.[0]);
    }
    else return [""]
  }

  public doesLogDirectoryExist() {
    return this.existsSync(this.logsDir);
  }

  public handleLogSummary(d: typeof Date, withLogFile: boolean) {
    const [date, time] = new Date(d.now()).toISOString().split(/T/g) as [
      string,
      string
    ];
    const [hours, minutes, seconds] = time.split(/Z/g)?.[0]!.split(/:/g) as [
      string,
      string,
      string
    ];
    // if (this.doesLogDirectoryExist() === true) {
    //   this.executeCommand({ command: `rm -rf ${this.logsDir}/summary*` });
    // }

    const [year, month, day] = date.split(/-/g) as [string, string, string];
    const filename =
      `${this.logsDir}/${this.logCount}/summary_${year}_${month}_${day}_${hours}_${minutes}_${seconds.split(/\./g)?.[0] ?? seconds}.json` as const;
    if (withLogFile === true) {
      const getRecs = this.recordAggregation();


      const summaryCounts = typeof getRecs === "number" ? getRecs : this.sortRecord(getRecs);
      return this.withWs({
        data: JSON.stringify(
          {
            summary: {
              dirTargeted: this.source,
              fileCount: this.extractOutputLogCounts()?.length ?? 0,
              counts: summaryCounts,
              files: this.summaryPathsFormatted
            }
          },
          null,
          2
        ),
        path: filename
      });
    } else return;
  }

  public async exe<const T extends boolean>(withLogFile: T) {
    return Promise.all([this.checkSorted(withLogFile)])
      .then(([_]) => this.handleGitIgnore())
      .then(_ => {
        this.wait(200).then(_val =>
          Promise.all([this.handleLogSummary(Date, withLogFile)])
        );
      });
  }
}
