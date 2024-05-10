import { error, info, warn } from "../../utils/logger"
import { Program } from "../program"

export class FactoryBreakerProgram implements Program {
    name: string

    constructor() {
        this.name = 'Factory Breaker'
    }


	start(): void {
		info(`Setup ${FactoryBreakerProgram.name}`)

        while (true) {
            if(redstone.getInput("front")) {
                this.retrieveTurtle()
            }
            // We check again in case the turtle was stuck and a new one is already in place
            if (!redstone.getInput("front")) {
                os.pullEvent("redstone")
            }
        }
	}

    retrieveTurtle(): void {
        turtle.dig()
        let success = false
        do {
            const [success, reason] = turtle.dropDown()
            if (success) {
                break
            }

            warn(`Failed to drop down: ${reason}`)
            sleep(2)
        } while (!success)
    }

}

export const factoryBreaker = new FactoryBreakerProgram()
