# @d0paminedriven/codemod

Run a single command to effortlessly prepend Reacts "use client" flag in files without it containing client-only patterns

![ddcodemod](https://github.com/DopamineDriven/v0/blob/master/packages/codemod/public/ddcodemod.png)

---

- example usage with pnpm

```bash
pnpm ddcodemod react18 src --logs
```

- `react18` is the codemod flag
- `src` is the directory to target recursively
- `--logs` outputs detailed logs to a .gitignored directory at the root of the cwd in which this package is installed (a .ddcodemod dir)

---

- See the [executable](./src/bin/init.ts) file for instructions or run

```bash
npx ddcodemod --help
```

```bash
yarn ddcodemod --help
```

```bash
pnpm ddcodemod --help
```

### Package available as `@d0paminedriven/codemod` on npm
