import { autonomousMiner } from "./programs/autonomousMiner";
import { Program, programs } from "./programs/program";
import { fileExists, readFile } from "./utils/files";
import { error, info, warn } from "./utils/logger";
import { isNull, isUndefined } from "./utils/utils";

info("Main");

interface MenuItem {
    key: string;
    program: Program;
}

const MainMenu: MenuItem[] = [
    {
        key: 'u',
        program: programs.updateStartup,
    },
    {
        key: 'y',
        program: programs.factoryComputer,
    },
    {
        key: 'b',
        program: programs.factoryBreaker,
    },
    {
        key: 'p',
        program: programs.factoryPlacer,
    },
    {
        key: 'c',
        program: programs.factoryComputer,
    },
    {
        key: 'm',
        program: programs.autonomousMiner,
    },
]

function displayMenu(menu: MenuItem[]) {
    for (const item of menu) {
        info(`[${item.key}]: ${item.program.name}`)
    }
}



function listenKeys() {
    displayMenu(MainMenu)
    while (true) {
        const [event, keycode] = os.pullEvent('key')
        const key = keys.getName(keycode)
        const selectedProgram = MainMenu.find((item) => item.key === key)

        if (!selectedProgram) {
            error(`Key ${key} not found in Menu`)
            continue
        }
        try {
            selectedProgram.program.start()
        } catch (e) {
            if (e === 'Terminated') {
                return
            }
            error(e)
        }
    }
}

function tryToResumeProgram(){
    if(!fileExists("resume")) {
        info("No program to resume")
        return
    }
   
    const resumeFile = readFile("resume")
    const programToResumeName = resumeFile.split("\n")[0]

    const pogram = programs[programToResumeName]
    if(!pogram) {
        warn(`This program ${programToResumeName} doesn't exist anymore, moving to resume.old`)
        fs.deletePath("resume.old")
        fs.move("resume", "resume.old")
        return
    }
        
    info(`Resuming program: ${programToResumeName}`)
    programs[programToResumeName].start()
}

function main(){
    tryToResumeProgram()


    try {
        programs.playerKillSwitch.start()



    } catch (e) {
        error(e)
    }

}


parallel.waitForAll(listenKeys, main)
