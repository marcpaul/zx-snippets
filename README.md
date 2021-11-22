# zx-snippets 1.01

Finally we can write bash scripts with javascript.

[zx on github](https://github.com/google/zx)

### Install zx

```bash
npm i -g zx
yarn global add zx
```

### Available scripts

**upgrade_node_lts.mjs**

Keep your node lts version up-to-date!
Checks if there is a new version, installs it and sets it as default.
After that it reinstalls all global packages from the old version.
Maybe I will make this a little bit more flexible.

**create_headless_vm.mjs**
Create a new headless virtualbox virtual machine.
Answer all the questions and vm is created. In the last question you can add
all the additional parameters that were missing in the questions before.

### Updates

1.01

-   **upgrade_node_lts.mjs** Add the question to delete old version
-   **upgrade_node_lts.mjs** Add question if you want to reinstall packages from old version

### Planned scripts

-   keep your sdk versions up-to-date
-   some stuff for homebrew
-   ...

### Demo

[Examples](https://github.com/google/zx/tree/main/examples)

### Documentation

[Documentation](https://github.com/google/zx)

Write your scripts in a file with `.mjs` extension in order to
be able to use `await` on top level. If you prefer the `.js` extension,
wrap your scripts in something like `void async function () {...}()`.

Add the following shebang to the beginning of your `zx` scripts:

```bash
#!/usr/bin/env zx
```

Now you will be able to run your script like so:

```bash
chmod +x ./script.mjs
./script.mjs
```

Or via the `zx` executable:

```bash
zx ./script.mjs
```

When using `zx` via the executable or a shebang, all of the functions
(`$`, `cd`, `fetch`, etc) are available straight away without any imports.
