#!/usr/bin/env zx

const vmName = await question('name for vm: ');
const osType = await question('ostype of vm: ');
const memSize = await question('memorysize of vm (in KB): ');
const hdName = await question('filename for hdd image: ');
const hdSize = await question('hddsize for virtual disk (in MB): ');
const storageController = await question(
	'do you want to use ide or sata controller: ',
	{ choices: ['ide', 'sata'] },
);
const isoImage = await question('path and filename of your iso image: ');
const vrde = await question('turn on vrde: ', {
	choices: ['on', 'off'],
});
const audio = await question('turn on audio: ', {
	choices: ['on', 'off'],
});
const cpus = await question('number of cpus: ');
const vram = await question('how much vram do you want to use (max. 256MB): ');
const sharedName = await question(
	'name of shared folder (let empty to skip creation of folder): ',
);
const sharedPath = await question('path to shared folder: ');
const automount = await question('do you want to automount shared folder: ', {
	choices: ['yes', 'no'],
});
const additional = await question(
	'add additional params (in format --<param> <value>): ',
);

const vmStorageControllerName =
	storageController === 'ide' ? 'IDE Controller' : 'SATA Controller';
const vmStorageController = storageController === 'ide' ? 'PIIX4' : 'IntelAHCI';

await $`vboxmanage createvm --name ${vmName} --ostype ${osType} --register`;
await $`vboxmanage modifyvm ${vmName} --memory ${memSize} --acpi on --nic1 nat --boot1 dvd`;
await $`vboxmanage createhd --filename ${hdName} --size ${hdSize}`;
await $`vboxmanage storagectl ${vmName} --name ${vmStorageControllerName} --add ${storageController} --controller ${vmStorageController}`;
if (storageController === 'ide') {
	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 0 --type hdd --medium ${hdName}`;
	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 1 --type dvddrive --medium ${isoImage}`;
} else {
	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 0 --type hdd --medium ${hdName}`;
	await $`vboxmanage storagectl ${vmName} --name 'IDE Controller' --add ide --controller PIIX4`;
	await $`vboxmanage storageattach ${vmName} --storagectl 'IDE Controller' --port 0 --device 0 --type dvddrive --medium ${isoImage}`;
}
await $`vboxmanage modifyvm ${vmName} --vrde ${vrde} --audio ${
	audio === 'off' ? 'none' : 'alsa'
} --audioout ${audio} --vram ${vram} --clipboard-mode bidirectional --cpus ${cpus}`;
if (sharedName !== '') {
	await $`vboxmanage sharedfolder add ${vmName} --name ${sharedName} --hostpath ${sharedPath} ${
		automount === 'yes' ? '--automount' : ''
	}`;
}
await $`vboxmanage modifyvm ${vmName} ${additional}`;
console.log(chalk.green('operation successful!'));
