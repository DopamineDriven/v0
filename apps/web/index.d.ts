/// <reference types="@edge-runtime/types" />
/// <reference types="gtag.js" />

declare module "@edge-runtime/types";
declare module "gtag.js";

export declare global {
  export interface Window {
    define?: unknown;
  }
}
