import { config } from "../config";
import { saveFile } from "../utils/files";
import { error, info } from "../utils/logger";
import { Program } from "./program";

class updateStartupProgram implements Program {

    name: string

    constructor() {
        this.name = 'UpdateStartup'
    }

	start({reboot = true}: {reboot?: boolean} = {}): void {
		info(`Setup ${updateStartupProgram.name}`)
        info('Trying to download latest code from server')
        const [code, message] = http.get(`${config.CONTROL_SERVER}/output.lua`)
        if (!code) {
            throw error(`Could not download code, got status ${code} from server: ${message}`)
        }

        info('Code downloaded, updating startup')
        saveFile('/startup', code.readAll())
        info('Startup updated')

        if (reboot){
            info('Rebooting...')
            os.reboot()
        }
	}
}

export const updateStartup = new updateStartupProgram()