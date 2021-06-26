#!/usr/bin/env zx

const home = await os.homedir();
const defaultFile = await fs.readFile(`${home}/.nvm/alias/default`);

try {
    let latestNodeVersion =
        await $`source ${home}/.nvm/nvm.sh && nvm version-remote --lts`;

    latestNodeVersion = await latestNodeVersion.toString().split("\n")[0];

    const currentNodeVersion = await defaultFile.toString().trim();

    if (latestNodeVersion !== currentNodeVersion) {
        let reinstallPackages = await question(`do you want to reinstall global packages from ${currentNodeVersion} (Y/n)? `, {
            choices: ['Y', 'n']
        })
        if (await reinstallPackages === 'n') {
            await $`source ${home}/.nvm/nvm.sh && nvm install ${latestNodeVersion} && nvm alias default ${latestNodeVersion}`;
        } else {
            await $`source ${home}/.nvm/nvm.sh && nvm install ${latestNodeVersion} --reinstall-packages-from=${currentNodeVersion} && nvm alias default ${latestNodeVersion}`;
        }
        let deleteOldVersion = await question('do you want to delete old node version (y/N)? ', {
            choices: ['y', 'N']
        });

        if (await deleteOldVersion === 'y') {
            await $`source ${home}/.nvm/nvm.sh && nvm uninstall ${currentNodeVersion}`;
        }
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
