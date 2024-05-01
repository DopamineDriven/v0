import { execSync } from "child_process";
import fsSync from "fs";
import { relative } from "path";
import type {
  ExecuteCommandProps,
  MkDirSyncProps,
  ReadDirProps,
  SvgConfig,
  WriteStreamProps
} from "../types/index.js";
import * as dotenv from "dotenv";

dotenv.config();

export class ConfigHandler {
  constructor(public cwd: string) {}

  public wait<const T extends number>(ms: T) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public pathHandler<const T extends string>(path: T) {
    return /\//g.test(path) === true
      ? path
          /* eslint-disable-next-line no-useless-escape */
          .split(/([\/])/gim)
          .reverse()
          .slice(2)
          .reverse()
          .join("")
      : path;
  }

  public arrToArrOfArrs = <T, const N extends number>({
    arrToFragment,
    arrOfArrsAggregator = Array.of<T[]>(),
    interval
  }: {
    arrToFragment: T[];
    arrOfArrsAggregator: T[][];
    interval: N;
  }) =>
    new Promise((resolve, _reject) =>
      resolve(
        ((interval: number) => {
          for (let i = 0; i <= arrToFragment.length; i++) {
            if ((i % interval === 0 || i === 0) && i <= arrToFragment.length) {
              /* eslint-disable-next-line prefer-const */
              let segment = arrToFragment.slice(i, i + interval);
              arrOfArrsAggregator.push(segment);
            }
          }
        })(interval)
      )
    ).then(_ => arrOfArrsAggregator);

  public existsSync<const T extends string>(path: T) {
    return fsSync.existsSync(relative(this.cwd, path));
  }

  public readDir<const T extends string>({ path, options }: ReadDirProps<T>) {
    return fsSync.readdirSync(relative(this.cwd, path), options) satisfies (
      | string
      | Buffer
    )[];
  }

  public mkdirSync<const T extends string>({
    path,
    options
  }: MkDirSyncProps<T>) {
    return fsSync.mkdirSync(relative(this.cwd, path), options);
  }

  public fileSizeMb<const T extends string>(path: T) {
    return fsSync.statSync(relative(this.cwd, path)).size / (1024 * 1024);
  }

  public generateDirIfDNE<const T extends string>({
    path,
    options
  }: MkDirSyncProps<T>) {
    const doesExist = this.existsSync(path);
    if (doesExist === true) return;
    else {
      return this.mkdirSync({ path, options });
    }
  }

  public getUserPkgManager(): "yarn" | "pnpm" | "bun" | "npm" {
    // This environment variable is set by npm and yarn but pnpm seems less consistent
    const userAgent = process.env.npm_config_user_agent;

    if (userAgent) {
      if (userAgent.startsWith("yarn")) {
        return "yarn";
      } else if (userAgent.startsWith("pnpm")) {
        return "pnpm";
      } else if (userAgent.startsWith("bun")) {
        return "bun";
      } else {
        return "npm";
      }
    } else {
      // If no user agent is set, assume npm
      return "npm";
    }
  }

  public handleScriptsByPkgManager<const C extends string>(
    props: "yarn" | "pnpm" | "bun" | "npm",
    command: C
  ) {
    switch (props) {
      case "bun": {
        return `bun ${command}` as const;
      }
      case "npm": {
        return `npx ${command}` as const;
      }
      case "pnpm": {
        return `pnpm ${command}` as const;
      }
      case "yarn": {
        return `yarn ${command}` as const;
      }
      default: {
        return `npx ${command}` as const;
      }
    }
  }

  public withWs<const T extends string>({ data, path }: WriteStreamProps<T>) {
    try {
      if (/\//g.test(path) === true) {
        return this.generateDirIfDNE({
          path: this.pathHandler(path),
          options: { recursive: true }
        });
      } else return path;
    } catch (error) {
      const toString = String(error);
      console.error(toString);
    } finally {
      /* eslint-disable-next-line no-unsafe-finally */
      return fsSync
        .createWriteStream(relative(this.cwd, path), { autoClose: true })
        .write(Buffer.from(Buffer.from(data).toJSON().data));
    }
  }

  public fileToBuffer = <const T extends string>(path: T) =>
    Buffer.from(
      Buffer.from(fsSync.readFileSync(relative(this.cwd, path)).toJSON().data)
    );

  public handleBufStr<const V extends Buffer | string>(target: V): string {
    return Buffer.isBuffer(target) ? target.toString("utf-8") : target;
  }

  public executeCommand = <const T extends string>({
    command,
    ...options
  }: ExecuteCommandProps<T>) =>
    Buffer.from(
      Buffer.from(execSync(command, { ...options })).toJSON().data
    ).toString("utf-8");

  public parseJsonBuffer(p: Buffer) {
    return JSON.parse(
      Buffer.from(Buffer.from(p).toJSON().data).toString("utf-8")
    );
  }

  public getFormat(t: string) {
    return t.split(/([.])/gim).reverse()[0];
  }

  public trailing<const P extends string>(path: P) {
    if (path.endsWith("/")) {
      return true;
    } else return false;
  }

  public handleDotsAndFiles<
    const T extends string,
    const V extends SvgConfig["fileNameFormat"]
  >(t: T, target: V) {
    const splitDots = t.split(/(\.)/g);
    if (splitDots.length > 3) {
      return splitDots
        .reverse()
        .slice(2)
        .reverse()
        .filter((_, v) => v % 2 === 0)
        .map((text, i) => {
          return target === "camelcase"
            ? i === 0
              ? text.toLowerCase()
              : text.substring(0, 1).toUpperCase().concat(text.substring(1))
            : target === "pascalcase"
              ? text.substring(0, 1).toUpperCase().concat(text.substring(1))
              : target === "uppercase"
                ? text.toUpperCase()
                : target === "lowercase"
                  ? text.toLowerCase()
                  : text;
        });
        /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
    } else return [splitDots?.[0]] as string[];
  }

  public joinHelper<const V extends SvgConfig["fileNameFormat"]>(v: V) {
    return v === "snakecase"
      ? "_"
      : v === "kebabcase"
        ? "-"
        : v === "uppercase"
          ? "_"
          : "";
  }

  public handleDashes<
    const T extends string,
    const V extends SvgConfig["fileNameFormat"]
  >(t: T, target: V) {
    /* eslint-disable-next-line no-useless-escape */
    const splitDashes = t.split(/(\-)/g);
    if (splitDashes.length > 1) {
      return splitDashes
        .filter((_, i) => i % 2 === 0)
        .map((text, i) => {
          return target === "camelcase"
            ? i === 0
              ? text.toLowerCase()
              : text.substring(0, 1).toUpperCase().concat(text.substring(1))
            : target === "pascalcase"
              ? text.substring(0, 1).toUpperCase().concat(text.substring(1))
              : target === "uppercase"
                ? text.toUpperCase()
                : target === "lowercase"
                  ? text.toLowerCase()
                  : text;
        })
        .join(this.joinHelper(target));
      /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
    } else return splitDashes?.[0];
  }

  public toUppercaseHelper<const V extends string>(text: V) {
    return (
      text
        .split(
          /([a-z]+|[0-9]+|(?:[A-Z][a-z]+)|(?:[A-Z]+(?=(?:[A-Z][a-z])|[^A-Za-z]|[$\d\n]|\b)))/g
        )
        .filter(noblanks => noblanks.length > 0)
        .map(c => c.toUpperCase())
        .join("_")
        /* eslint-disable-next-line no-useless-escape */
        .replace(/(\_){2,}/g, "_")
    );
  }

  public uppercaseHelper<const T extends string>(text: T) {
    if (/-| /g.test(text) === true) {
      return text
        .split(/-| /g)
        .map(v => this.toUppercaseHelper(v))
        .join("_");
    } else {
      return this.toUppercaseHelper(text);
    }
  }

  public pascalCaseHelper<const T extends string>(v: T) {
    return v.substring(0, 1).toUpperCase().concat(v.substring(1));
  }

  public toPascalCase<const T extends string[]>(arr: T) {
    return arr
      .map(v => {
        return this.pascalCaseHelper(v)
          .split(/-| |_/g)
          .map(t => t.substring(0, 1).toUpperCase().concat(t.substring(1)))
          .join("");
      })
      .join("");
  }

  public caseFormatter<
    const S extends string | Buffer,
    const V extends SvgConfig["fileNameFormat"]
  >(stringOrBuff: S, format: V) {
    const s = this.handleBufStr(stringOrBuff);
    return format === "pascalcase"
      ? this.handleDashes(
          this.toPascalCase(this.handleDotsAndFiles(s, format)),
          format
        )
      : format === "uppercase"
        ? this.handleDashes(
            this.uppercaseHelper(
              this.handleDotsAndFiles(s, format).join(this.joinHelper(format))
            ),
            format
          )
        : this.handleDashes(
            this.handleDotsAndFiles(s, format).join(this.joinHelper(format)),
            format
          );
  }

  /**
   * substring(1) handles dirs with leading dot format
   * */
  public readDirRecursive<const T extends string>(path: T) {
    if (/\./g.test(path) === true && /\./g.test(path.substring(1)) === true) {
      throw new Error(
        `[readDirRecursive error]: path must point to a directory, received ${path}`
      );
    }
    return this.readDir({
      path: path,
      options: { recursive: true, encoding: "utf-8" }
    }).map(resolveBuf => this.handleBufStr(resolveBuf));
  }
}
