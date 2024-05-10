import { ChatBox } from "../types/advancedPeripherals/chatbox"
import { PlayerDetector } from "../types/advancedPeripherals/playerDetector"
import { info, warn } from "../utils/logger"
import { getOptionalPeripheral, getRequiredPeripheral } from "../utils/peripheral"
import { Program } from "./program"

const dangerousPlayers = [
    "Solasmeryl",
    // "Lif,"
    //"Xaxam",
]

const levelColors: {[level: number]: number} = {
    0: colors.green,
    1: colors.yellow,
    2: colors.orange,
    3: colors.red
}

const alarmSide = 'top'
const tntSide = 'bottom'

export class PlayerKillSwitchProgram implements Program {
    name: string
    detector!: PlayerDetector
    monitor: any
    chatBox!: ChatBox


    constructor() {
        this.name = 'Player Kill Switch'
    }

	start(): void {
		info(`Setup ${PlayerKillSwitchProgram.name}`)
        this.detector = getRequiredPeripheral('playerDetector')
        this.monitor = getOptionalPeripheral('monitor')
        this.chatBox = getOptionalPeripheral('chatBox')

        while (true) {
            const level = this.getDangerlevel()
            this.updateMonitor(level)
            this.updateAlarm(level)

            if (level > 1) {
                info(`Delete startup script`)
                fs.deletePath('startup')
            }

            if (level === 3){
                this.killSwitch()
            }

        }
	}

    getDangerlevel(){
        const close = this.getDangerousPlayersInRange(3)
        if (close.length > 0) {
            info(`Dangerous players is close: ${close.join(', ')}`)
            return 3
        }

        const withinComputerOpening = this.getDangerousPlayersInRange(6)
        if (this.getDangerousPlayersInRange(6).length > 0) {
            info(`Dangerous players is close: ${withinComputerOpening.join(', ')}`)
            return 2
        }

        const online = this.getDangerousPlayerOnline()
        if (online.length > 0) {
            info(`Dangerous players online: ${online.join(', ')}`)
            return 1
        }

        return 0
    }

    getDangerousPlayerOnline(): string[] {
        const online = this.detector.getOnlinePlayers()
        return online.filter((player: string) => dangerousPlayers.includes(player))
    }

    getDangerousPlayersInRange(range: number): string[] {
        const players = this.detector.getPlayersInRange(range)
        return players.filter((player: string) => dangerousPlayers.includes(player))
    }

    updateMonitor(level: number) {
        const color = levelColors[level]
        if (this.monitor) {
            this.monitor.setBackgroundColor(color)
            this.monitor.clear()
        }
    }

    updateAlarm(level: number) {
        if (level > 1) {
            redstone.setOutput(alarmSide, true)
        } else {
            redstone.setOutput(alarmSide, false)
        }
    }

    killSwitch() {
        info(`Kill switch activated`)
        if (this.chatBox !== undefined) {
            this.chatBox.sendMessage('Kill switch activated')
        }

        sleep(1)
        if (this.chatBox !== undefined) {
            this.chatBox.sendMessage('Initiating self destruct sequence...')
        }
        redstone.setOutput(tntSide, true)
        sleep(100)
        os.reboot()
    }

}

export const playerKillSwitch = new PlayerKillSwitchProgram()
