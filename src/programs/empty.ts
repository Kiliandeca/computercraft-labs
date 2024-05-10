import { info } from "../utils/logger"
import { Program } from "./program"

export class EmptyProgram implements Program {
	static name: "Factory Computer"

	start(): void {
		info(`Setup ${EmptyProgram.name}`)
	}

}

export const empty = new EmptyProgram()
