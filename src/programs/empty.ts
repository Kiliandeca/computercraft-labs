import { info } from "../utils/logger"
import { Program } from "./program"

export class EmptyProgram implements Program {
    name: string

    constructor() {
        this.name = 'Empty'
    }

	start(): void {
		info(`Setup ${EmptyProgram.name}`)
	}

}

export const empty = new EmptyProgram()
