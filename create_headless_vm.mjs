#!/usr/bin/env zx

let questions = await fs.readFile('./headless_vm_questions.json');

for await (const [key, value] of questions) {
    console.log(`[--->] ~ file: create_headless_vm.mjs ~ line 6 ~ forawait ~ [key, value`, [key, value);

}

// const vmStorageControllerName =
// 	storageController === 'ide' ? 'IDE Controller' : 'SATA Controller';
// const vmStorageController = storageController === 'ide' ? 'PIIX4' : 'IntelAHCI';

// await $`vboxmanage createvm --name ${vmName} --ostype ${osType} --register`;
// await $`vboxmanage mofifyvm ${vmName} --memory ${memSize} --acpi on --nic1 nat --boot1 dvd`;
// await $`vboxmanage createhd --filename ${hdName} --size ${hdSize}`;
// await $`vboxmanage storagectl ${vmName} --name ${vmStorageControllerName} --add ${storageController} --controller ${vmStorageController}`;
// if (storageController === 'ide') {
// 	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 0 --type hdd --medium ${hdName}`;
// 	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 1 --type dvddrive --medium ${isoImage}`;
// } else {
// 	await $`vboxmanage storageattach ${vmName} --storagectl ${vmStorageControllerName} --port 0 --device 0 --type hdd --medium ${hdName}`;
// 	await $`vboxmanage storageattach ${vmName} --storagectl 'IDE Controller' --port 0 --device 0 --type dvddrive --medium ${isoImage}`;
// }
// await $`vboxmanage modifyvm ${vmName} --vrde ${vrde} --audio ${
// 	audio === 'off' ? 'none' : 'alsa'
// } --audioout ${audio} --vram ${vram} --clipboard-mode bidirectional --cpus ${cpus}`;
// if (sharedName !== '') {
// 	await $`vboxmanage sharedfolder add ${vmName} --name ${sharedName} --hostpath ${sharedPath} ${
// 		automount === 'yes' ? '--automount' : ''
// 	}`;
// }
