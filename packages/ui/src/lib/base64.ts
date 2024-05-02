/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str, "utf-8").toString("base64")
    : window.btoa(str);

export const fromBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str, "base64").toString("utf-8")
    : window.atob(str);
