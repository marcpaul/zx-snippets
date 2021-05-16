#!/usr/bin/env zx

const home = await os.homedir();
const defaultFile = await fs.readFile(`${home}/.nvm/alias/default`);

try {
    let latestNodeVersion =
        await $`source ${home}/.nvm/nvm.sh && nvm version-remote --lts`;

    latestNodeVersion = await latestNodeVersion.toString().split("\n")[0];

    const currentNodeVersion = await defaultFile.toString().trim();

    if (latestNodeVersion !== currentNodeVersion) {
        await $`source ${home}/.nvm/nvm.sh && nvm install ${latestNodeVersion} --reinstall-packages-from=${currentNodeVersion} && nvm alias default ${latestNodeVersion}`;
    } else {
        console.log(
            chalk.blue(
                `You are already using the latest node lts version (${currentNodeVersion})`
            )
        );
    }
} catch (error) {
    console.error(`Error: ${error.stderr}, Exit code: ${error.exitCode}`);
}
