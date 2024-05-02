import type { InferIt, RemoveFields } from "@/types/helpers";

export type LinkPropsInferred = InferIt<
  typeof import("next/link.js").default,
  "P"
>["0"];

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

export type ImagePropsInferred = InferIt<
  typeof import("next/image.js").default,
  "P"
>["0"];
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
