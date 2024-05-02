import { CodemodService } from "@dd/codemod";

const codemod = new CodemodService(process.cwd(), process.argv);

const readRecursively = codemod
  .readDirRecursive(`.ddcodemod`)
  .filter(t => /\.gitignore/g.test(t) === false)
  .filter(path => path.split(/\./g).length > 1);

type CodeGenFields = {
  detected: string[];
  counts: {
    [record: string]: number;
  };
};

const getCounts = readRecursively
  .map(
    v =>
      JSON.parse(
        codemod.fileToBuffer(`.ddcodemod/${v}`).toString("utf-8")
      ) as CodeGenFields
  )
  .map(fields => {
    return fields.counts;
  });

console.log(getCounts);
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      /* eslint-disable prefer-const */
let r: Record<string, number> = {};
function countIt() {
  /* eslint-disable-next-line @typescript-eslint/prefer-for-of */
  for (let i = 0;i < getCounts.length; i++) {

     (Object.entries(getCounts[i]!).map(([key, val]) => {
      r[key] = ((r[key]! || 0) +val)
      return r;
    }), {})
  }
  return r;
}

console.log(countIt());
