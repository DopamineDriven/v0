import Image from "next/image";
import Link from "next/link";
import type React from "react";

export type Unenumerate<T> = T extends readonly (infer U)[] | (infer U)[]
  ? U
  : T;

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type RemoveFields<T, P extends keyof T = keyof T> = {
  [S in keyof T as Exclude<S, P>]: T[S];
};

export type InferReactForwardRefExoticComponentProps<T> =
  T extends React.ForwardRefExoticComponent<infer U> ? U : T;

// Next Link Props

export type LinkPropsInferred = {
  [P in keyof InferReactForwardRefExoticComponentProps<
    typeof Link
  >]: InferReactForwardRefExoticComponentProps<typeof Link>[P];
};

export type LinkPropsTargeted<T extends keyof LinkPropsInferred> = {
  [P in T]: LinkPropsInferred[P];
};

export type LinkPropsExclude<T extends keyof LinkPropsInferred> = RemoveFields<
  LinkPropsTargeted<keyof LinkPropsInferred>,
  T
>;

export type LinkPropsInclude<T extends keyof LinkPropsInferred> = RemoveFields<
  LinkPropsTargeted<keyof LinkPropsInferred>,
  Exclude<keyof LinkPropsInferred, T>
>;

// Next Image Props

export type ImagePropsInferred = {
  [P in keyof InferReactForwardRefExoticComponentProps<
    typeof Image
  >]: InferReactForwardRefExoticComponentProps<typeof Image>[P];
};

export type ImagePropsTargeted<T extends keyof ImagePropsInferred> = {
  [P in T]: ImagePropsInferred[P];
};

export type ImagePropsExclude<T extends keyof ImagePropsInferred> =
  RemoveFields<ImagePropsTargeted<keyof ImagePropsInferred>, T>;

export type ImagePropsInclude<T extends keyof ImagePropsInferred> =
  RemoveFields<
    ImagePropsTargeted<keyof ImagePropsInferred>,
    Exclude<keyof ImagePropsInferred, T>
  >;

// React Intrinsic Elements Props

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

export type ConditionalToRequired<
  T,
  Z extends keyof T = keyof T
> = RemoveFields<T, Z> & { [Q in Z]-?: T[Q] };

export type RequiredToConditional<
  T,
  X extends keyof T = keyof T
> = RemoveFields<T, X> & { [Q in X]?: T[Q] };

export type FieldToConditionallyNever<
  T,
  X extends keyof T = keyof T
> = RemoveFields<T, X> & { [Q in X]?: XOR<T[Q], never> };

export type ExcludeFieldEnumerable<T, K extends keyof T> = RemoveFields<T, K>;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export function whAdjust<O extends string, T extends number>(
  ogVal: O,
  widthOrHeight?: string | number | undefined,
  relAdjust?: T
) {
  return widthOrHeight && relAdjust
    ? typeof widthOrHeight === "string"
      ? Number.parseInt(widthOrHeight, 10) * relAdjust
      : widthOrHeight * relAdjust
    : ogVal;
}

export function omitFields<
  Target extends { [record: string | symbol | number]: unknown },
  Key extends (keyof Target)[]
>(target: Target, ...keys: Key[]): Omit<Target, Unenumerate<Key>> {
  for (const key in keys) {
    delete target[key];
  }
  return target;
}

export type UserAgentProps = {
  isBot: boolean;
  ua: string;
  browser: {
    name?: string;
    version?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  engine: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  cpu: {
    architecture?: string;
  };
};

/** Convert literal string types like 'foo-bar' to 'FooBar' */
export type ToPascalCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}-${infer U}`
    ? `${Capitalize<T>}${ToPascalCase<U>}`
    : Capitalize<S>;

/** Convert literal string types like 'foo-bar' to 'fooBar' */
export type ToCamelCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}-${infer U}`
    ? `${T}${ToPascalCase<U>}`
    : S;

export type EventHandler<E extends React.SyntheticEvent<any>> = {
  bivarianceHack(event: E): void;
}["bivarianceHack"];

export type InferGenerateStaticParamsReturnType<
  T extends (...args: any) => any
> = { params: Unenumerate<UnwrapPromise<ReturnType<T>>> };

/**
 * RT->ReturnType
 *
 * P->Parameters
 *
 * B->readonly [P, RT] (Both)
 */

export type InferIt<T, V extends "RT" | "P" | "B"> = Unenumerate<
  T extends (
    ...args: infer P
  ) =>
    | infer RT
    | Unenumerate<infer RT>
    | Promise<infer RT>
    | Unenumerate<Promise<infer RT>>
    | Promise<Unenumerate<infer RT>>
    ? V extends "B"
      ? { readonly params: P; readonly returnType: RT }
      : V extends "RT"
        ? RT
        : V extends "P"
          ? P
          : T
    : T
>;

export type InferGenerateStaticParamsRT<V extends (...args: any) => any> = {
  params: InferIt<V, "RT">;
};

type TestProps = {
  d: typeof Date;
  v: boolean;
  c: {
    nested: number;
    object: string[];
  };
};

const testing = (props: TestProps) => {
  const returnString =
    `${props.v} ${props.c.nested} ${new Date(props.d.now())}` as const;
  props.c.object.push(returnString);
  return returnString;
};

const getIt = (props: InferIt<typeof testing, "P">) => props;
const getItt = (props: InferIt<typeof testing, "RT">) => props;

const getIttt = ({ params, returnType }: InferIt<typeof testing, "B">) =>
  returnType;
export type InferTsxTargetedFlexi<T> =
  T extends React.DetailedHTMLProps<infer U, infer E> ? readonly [U, E] : T;

export type Selector<
  T,
  K extends "attribute" | "element" | "tuple"
> = T extends readonly [infer A, infer B]
  ? K extends "attribute"
    ? A
    : K extends "element"
      ? B
      : readonly [A, B]
  : T;
export type FlexiKeys = Unenumerate<readonly ["attribute", "element", "tuple"]>;
export type TsxTargetedExp<
  T extends keyof React.JSX.IntrinsicElements,
  K extends FlexiKeys
> = {
  readonly [P in T]: Selector<
    InferTsxTargetedFlexi<React.JSX.IntrinsicElements[P]>,
    K
  >;
}[T];

export type TsxExcludeExp<
  I extends FlexiKeys,
  K extends keyof React.JSX.IntrinsicElements,
  J extends keyof TsxTargetedExp<K, I>
> = RemoveFields<TsxTargetedExp<K, I>, J>;

export type TsxIncludeExp<
  I extends FlexiKeys,
  K extends keyof React.JSX.IntrinsicElements,
  J extends keyof TsxTargetedExp<K, I>
> = RemoveFields<TsxTargetedExp<K, I>, Exclude<keyof TsxTargetedExp<K, I>, J>>;
