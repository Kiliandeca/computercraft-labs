import { config } from "../../config"
import { error, info, warn } from "../../utils/logger"
import { checkIsFuel, getFuelPotential } from "../../utils/turtle"
import { Program } from "../program"

export class FactoryTurtleProgram implements Program {
    name: string

    constructor() {
        this.name = 'Factory Turtle'
    }

	start(): void {
		info(`Setup ${FactoryTurtleProgram.name}`)

        const fuel = turtle.getFuelLevel()
        const target = config.TURTLE_TARGET_FUEL_LEVEL
        info(`Fuel level: ${fuel}/${target}`)
        if (fuel != "unlimited" && fuel <= target) {
            this.refuelUntilTargetReached(target)
        }

        fs.deletePath("resume")
        // Tell the breaker we are ready to be retrieved
        redstone.setOutput("front", true)
	}

    refuelUntilTargetReached(target: number): void {
        while (true) {
            const [success, message] = turtle.suckDown()
            if (!success) {
                error(`Failed to suck: ${message}`)
                sleep(1)
                continue
            }

            if (!checkIsFuel(1)) {
                throw(`Item is not fuel`)
            }

            const details = turtle.getItemDetail()
            if (!details) {
                throw(`Could not get item details`)
            }

            const fuelPerItem = getFuelPotential(details.name)
            const fuel = turtle.getFuelLevel() as number
            const fuelNeeded = target - fuel 

            const itemNeeded = Math.ceil(fuelNeeded / fuelPerItem)
            info(`I need ${itemNeeded} ${details.name} to reach ${target}`)
            info(Math.max(itemNeeded, details.count))
            turtle.refuel(Math.min(itemNeeded, details.count))

            const newFuel = turtle.getFuelLevel() as number
            info(`Fuel level reached: ${newFuel}/${target}`)
            if (newFuel >= target) {
                info(`Refuel is done`)
                turtle.dropDown()
                return
            }
        }
    }
}

export const factoryTurtle = new FactoryTurtleProgram()
