import { info } from "../../utils/logger";
import { readFile, saveFile } from "../../utils/files";
import { Program } from "../program";
import { updateStartup } from "../updateStartup";
import { getFloppy } from "./floppy";

export class factoryComputerProgram implements Program {
    name: string

    constructor() {
        this.name = 'Factory Computer'
    }

	start(): void {
		info(`Setup ${factoryComputerProgram.name}`)
        const drive = peripheral.find('drive')
        if (!drive) {
            throw Error('No disk drive found')
        }

        if (!drive.isDiskPresent()) {
            throw Error('No disk found')
        }

        // info('Disk found, updating itself..')
        // updateStartup.start({reboot: false}) // Doesn't work?

        // info('Copying startup script to disk')
        // fs.deletePath('/disk/output')
        // fs.copy('/startup', "/disk/output")

        info('Copying floppy script to disk')
        fs.deletePath('/disk/startup')
        saveFile('/disk/startup', getFloppy(80))

        drive.setDiskLabel('Factory Floppy')
        info('Done')
	}

}

export const factoryComputer = new factoryComputerProgram()
