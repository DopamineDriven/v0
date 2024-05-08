#!/usr/bin/env node
import { ConfigHandler } from "../config/index.js";
import { renderTitle } from "../consts/index.js";
import { CodemodService } from "../services/codemod/index.js";



/* eslint-disable @typescript-eslint/no-non-null-assertion */

export function getCount(config: ConfigHandler) {
  if (config.existsSync(config.logsDir)) {
    return config
      .readDirRecursive(config.logsDir)
      .filter(v => /([0-9])/g.test(v.split(/\//g)[0]!))
      .filter(t => !t.includes("/"))
      .length.toString(10);
  } else return "0";
}

export async function runCodemodClientFlags<
  const Argv extends string[],
  const B extends boolean
>(argv: Argv, withLogFIle: B) {
  const config = new ConfigHandler(process.cwd());
  renderTitle();
  console.log(`targeting the ${argv[3]} directory...`);
  const handler = new CodemodService(process.cwd(), argv, getCount(config));
  /* eslint-disable-next-line @typescript-eslint/require-await */
  async function handleArgs() {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-floating-promises */
      handler.exe(withLogFIle);
    } catch (err) {
      throw new Error(JSON.stringify(err, null, 2));
    }
  }
  return handleArgs();
}

export function helpFlag<const Argv extends string[]>(argv: Argv) {
  const config = new ConfigHandler(process.cwd());
  const handler = new CodemodService(process.cwd(), argv, getCount(config));
  console.log(`
    Usage: ${handler.handleScriptsByPkgManager(handler.getUserPkgManager(), "ddcodemod <codemod> <path> <OUTPUT_OPTIONS>")}

    Output options:

      --logs                logs codemod information by file to .ddcodemod/log.json

    Codemod options:

      react18               detect client patterns in files targeted by a provided <path>; prepend "use client" if client patterns detected and no flag present yet

    Other options:

      -h, --help            Show CLI usage


    Example:                ${handler.handleScriptsByPkgManager(handler.getUserPkgManager(), "ddcodemod react18 src --logs")}
  `);
}

/* eslint-disable @typescript-eslint/no-floating-promises */
if (process.argv[2] === "react18") {
  if (process.argv[4] === "--logs") {
    Promise.all([runCodemodClientFlags(process.argv, true)]);
  } else Promise.all([runCodemodClientFlags(process.argv, false)]);
}

if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  Promise.all([helpFlag(process.argv)]);
}
