import type React from "react";

export type SvgConfig = Readonly<{
  readonly componentNameFormat: "pascalcase" | "uppercase";
  readonly fileNameFormat:
    | "camelcase"
    | "pascalcase"
    | "uppercase"
    | "lowercase"
    | "kebabcase"
    | "snakecase";
  readonly originDir: string;
  readonly outputDir: string;
  readonly withTurbo: boolean;
}>;

export type GetKeys<T> = T extends
  | Record<infer U, unknown>
  | Readonly<Record<infer U, unknown>>
  ? U
  : T;

// type S<K extends keyof SvgConfig> = {
//  readonly [P in K]: SvgConfig[P]
// };

export type OmitSrc<T> = T extends `src/${infer U}` ? U : T;

export type BufferEncodingUnion =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

export interface ObjEncodingOptions {
  encoding?: BufferEncodingUnion | null | undefined;
}

export type ReadDirProps<T extends string> = {
  path: T;
  options?:
    | BufferEncodingUnion
    | (
        | (ObjEncodingOptions & {
            withFileTypes?: false | undefined;
            recursive?: boolean | undefined;
          })
        | null
        | undefined
      );
};

export type TypedArray =
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array
  | BigUint64Array
  | BigInt64Array
  | Float32Array
  | Float64Array;

export type ArrayBufferView = DataView | TypedArray;

export type CoercionUnion = string | Uint8Array | readonly number[];

export type ArrayBufferUnion = ArrayBuffer | SharedArrayBuffer;

export type WriteStreamProps<T extends string> = {
  data: WithImplicitCoercion<CoercionUnion>;
  path: T;
  // options?: {
  //   encoding?: BufferEncoding | undefined;
  //   autoClose?: boolean | undefined;
  //   emitClose?: boolean | undefined;
  //   start?: number | undefined;
  //   highWaterMark?: number | undefined;
  //   flush?: boolean | undefined;
  // }
};

export type WriteFileAsyncDataUnion =
  | WithImplicitCoercion<string>
  | { [Symbol.toPrimitive](hint: "string"): string };

export type WriteFileAsyncProps<T extends string = string> = {
  path: T;
  data: WriteFileAsyncDataUnion;
  options?:
    | (ObjEncodingOptions & {
        mode?: Mode | undefined;
        flag?: OpenMode | undefined;
      } & Abortable)
    | BufferEncodingUnion
    | null;
};

export interface Abortable {
  /**
   * When provided the corresponding `AbortController` can be used to cancel an asynchronous action.
   */
  signal?: AbortSignal | undefined;
}

export type OpenMode = string | number;

export type Mode = string | number;

export interface MkDirOptions {
  /**
   * Indicates whether parent folders should be created.
   * If a folder was created, the path to the first created folder will be returned.
   * @default false
   */
  recursive?: boolean | undefined;
  /**
   * A file mode. If a string is passed, it is parsed as an octal integer. If not specified
   * @default 0o777
   */
  mode?: Mode | undefined;
}

export type MkDirSyncProps<T extends string> = {
  path: T;
  options?:
    | Mode
    | (MkDirOptions & {
        recursive?: boolean | undefined;
      })
    | null
    | undefined;
};

// React Intrinsic Elements Props
export type Unenumerate<T> = T extends (infer U)[] | readonly (infer U)[]
  ? U
  : T;

export type InferTsxTargeted<T> =
  T extends React.DetailedHTMLProps<infer U, Element> ? U : T;

export type TsxTargeted<T extends keyof React.JSX.IntrinsicElements> = {
  [P in T]: InferTsxTargeted<React.JSX.IntrinsicElements[P]>;
}[T];

export type TsxExclude<
  T extends keyof React.JSX.IntrinsicElements,
  J extends keyof TsxTargeted<T>
> = RemoveFields<TsxTargeted<T>, J>;

export type TsxInclude<
  T extends keyof React.JSX.IntrinsicElements,
  J extends keyof TsxTargeted<T>
> = RemoveFields<TsxTargeted<T>, Exclude<keyof TsxTargeted<T>, J>>;

export type RemoveFields<T, P extends keyof T = keyof T> = {
  [S in keyof T as Exclude<S, P>]: T[S];
};

export type Signals =
  | "SIGABRT"
  | "SIGALRM"
  | "SIGBUS"
  | "SIGCHLD"
  | "SIGCONT"
  | "SIGFPE"
  | "SIGHUP"
  | "SIGILL"
  | "SIGINT"
  | "SIGIO"
  | "SIGIOT"
  | "SIGKILL"
  | "SIGPIPE"
  | "SIGPOLL"
  | "SIGPROF"
  | "SIGPWR"
  | "SIGQUIT"
  | "SIGSEGV"
  | "SIGSTKFLT"
  | "SIGSTOP"
  | "SIGSYS"
  | "SIGTERM"
  | "SIGTRAP"
  | "SIGTSTP"
  | "SIGTTIN"
  | "SIGTTOU"
  | "SIGUNUSED"
  | "SIGURG"
  | "SIGUSR1"
  | "SIGUSR2"
  | "SIGVTALRM"
  | "SIGWINCH"
  | "SIGXCPU"
  | "SIGXFSZ"
  | "SIGBREAK"
  | "SIGLOST"
  | "SIGINFO";

export interface Dict<T> {
  [key: string]: T | undefined;
}
export interface ProcessEnv extends Dict<string> {
  readonly NODE_ENV: "development" | "production" | "test";
  /**
   * Can be used to change the default timezone at runtime
   */
  TZ?: string;
}

export interface ProcessEnvOptions {
  uid?: number | undefined;
  gid?: number | undefined;
  cwd?: string | URL | undefined;
  env?: ProcessEnv | undefined;
}

export interface CommonOptions extends ProcessEnvOptions {
  /**
   * @default false
   */
  windowsHide?: boolean | undefined;
  /**
   * @default 0
   */
  timeout?: number | undefined;
}

export type IOType = "overlapped" | "pipe" | "ignore" | "inherit";
export type StdioOptions =
  | IOType
  | (IOType | "ipc" | import("stream").Stream | number | null | undefined)[];

export interface CommonExecOptions extends CommonOptions {
  input?: string | ArrayBufferView | undefined;
  /**
   * Can be set to 'pipe', 'inherit, or 'ignore', or an array of these strings.
   * If passed as an array, the first element is used for `stdin`, the second for
   * `stdout`, and the third for `stderr`. A fourth element can be used to
   * specify the `stdio` behavior beyond the standard streams.
   *
   * @default 'pipe'
   */
  stdio?: StdioOptions | undefined;
  killSignal?: Signals | number | undefined;
  maxBuffer?: number | undefined;
  encoding?: BufferEncoding | "buffer" | null | undefined;
}

export interface ExecSyncOptions extends CommonExecOptions {
  shell?: string | undefined;
}
export interface ExecSyncOptionsWithBufferEncoding extends ExecSyncOptions {
  encoding?: "buffer" | null | undefined;
}

export interface ExecuteCommandProps<T extends string>
  extends ExecSyncOptionsWithBufferEncoding {
  command: T;
}

export type OutputLogsShape = {
  detected: string[];
  counts: {
    [record: string]: number;
  };
};
