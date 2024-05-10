import { autonomousMiner } from "./programs/autonomousMiner";
import { programs } from "./programs/program";
import { readFile } from "./utils/files";
import { error, info, warn } from "./utils/logger";
import { isNull, isUndefined } from "./utils/utils";

info("Main");



function listenKeys() {
    while (true) {
        try {
            const [event, keycode] = os.pullEvent('key')
            switch (keys.getName(keycode)) {
                case 'u':
                    programs.updateStartup.start({reboot: true})
                    break
                case 'y':
                    programs.factoryComputer.start()
                    break
                case 'b':
                    programs.factoryBreaker.start()
                    break
                case 'p':
                    programs.factoryPlacer.start()
                    break
                case 'm':
                    programs.autonomousMiner.start()
                    break
            }
        } catch (e) {
            if (e === 'Terminated') {
                return
            }
            error(e)
        }
    }
}

function tryToResumeProgram(){
    if(!fs.exists("resume")) {
        info("No program to resume")
        return
    }

    const resumeFile = readFile("resume")
    const programToResume = resumeFile.split("\n")[0]
    info(`Resuming program: ${programToResume}`)

    const pogram = programs[programToResume]
    if(!pogram) {
        warn(`This program ${programToResume} doesn't exist anymore, moving to resume.old`)
        fs.deletePath("resume.old")
        fs.move("resume", "resume.old")
        return
    }
    
    if (programs[programToResume].resume) {
        programs[programToResume].resume()
    } else {
        programs[programToResume].start()
    }
}

function main(){
    tryToResumeProgram()

    try {
        if (!turtle) {
            programs.factoryComputer.start()
        }
    } catch (e) {
        error(e)
    }

}


parallel.waitForAll(listenKeys, main)
