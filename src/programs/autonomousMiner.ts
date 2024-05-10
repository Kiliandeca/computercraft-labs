import { OBJECTS, shortName } from "../utils/blocks";
import { readFile, saveFile } from "../utils/files";
import { error, info, warn } from "../utils/logger";
import { moveDirections, moveDirectionsEnum, doMove, waitForItemInSlot } from "../utils/turtle";
import { TurtleDropFailures, askInput } from "../utils/utils";
import { Program } from "./program";

export class autonomousMinerProgram implements Program {
	static name: "Autonomous Miner"

	state = {
		length: 0,
		width: 0,
		startI: 1,
		startJ: 1,
	}

	start(): void {
		info(`Setup ${autonomousMinerProgram.name}`)
		const param = this.setup()

		info(`Start mining ${param.length}x${param.width}`)
		this.saveState()
		saveFile("resume", "autonomousMiner")
		this.mine({...param})
	}

	setup(): { length: number, width: number } {
		info(`Please insert ${shortName(OBJECTS.ENDER_CHEST)} in Slot 1`)
		waitForItemInSlot(1, OBJECTS.ENDER_CHEST)
		return this.askParams()
	}

	askParams(): { length: number, width: number } {
		const result = askInput(`Please enter the parameters: length width? height?`)
		if (!result) {
			throw Error(`No parameters entered, exiting`)
		}

		const length = parseInt(result.split(" ")[0])
		const width = parseInt(result.split(" ")[1] || result.split(" ")[0])

		return {
			length,
			width,
		}
	}

	mine({length, width, startI=1, startJ=1}: {length: number, width: number, startI?: number, startJ?: number}): void {
		info(`Mining`)

		let turnDirection = [turtle.turnLeft, turtle.turnRight]

		doMove(moveDirectionsEnum.DOWN)
		doMove(moveDirectionsEnum.DOWN)

		while (true){
			for (const i of $range(startI, width)) {
				for (const j of $range(startJ, length-1)) {
					turtle.digUp()
					turtle.digDown()
					doMove(moveDirectionsEnum.FORWARD) 
					// TO DO in case of unload during this step Do something clever as transaction with fuel level
					this.state.startI++
					this.saveState()
					if(this.needToEmptyInventory()) this.emptyInventory()
				}
				turtle.digUp()
				turtle.digDown()

				turnDirection[i % 2]()
				if (i !== width) doMove(moveDirectionsEnum.FORWARD);
				this.state.startJ++
				this.saveState()
				turnDirection[i % 2]()
			}

			doMove(moveDirectionsEnum.DOWN)
			doMove(moveDirectionsEnum.DOWN)
			doMove(moveDirectionsEnum.DOWN)
			if (width % 2 === 0) {
				turnDirection = turnDirection.reverse()
			}
		}

	}

	needToEmptyInventory(): boolean {
		return turtle.getItemCount(16) > 0
	}

	emptyInventory(): void {
		while (true) {
			turtle.digUp()
			turtle.select(1)
			const [chestPlaced] = turtle.placeUp()
			if (chestPlaced) {
				break
			}
		}

		for (const i of $range(2, 16)) {
            const count = turtle.getItemCount(i)
            if (count !== 0){
                this.emptySlot(i)
            }
        }

		turtle.select(1)
		turtle.digUp()
	}

	emptySlot(slot: number) {
		turtle.select(slot)
		let dropSuccess, dropReason
		do {
			[dropSuccess, dropReason] = turtle.dropUp()
			if (!dropSuccess) {
				switch (dropReason) {
					case  TurtleDropFailures.NO_SPACE:
						info("No space, waiting");
						os.sleep(1)
						break;
					case TurtleDropFailures.NO_ITEMS:
						info("Item was removed");
						return;
					default:
						error(`Unknown failure: ${dropReason}`);
						return;
				}
			}
		} while (!dropSuccess)
	}

	saveState(){
		saveFile(autonomousMinerProgram.name, textutils.serialise(this.state, {}))
	}

	loadState(){
		const state = textutils.unserialise(readFile(autonomousMinerProgram.name))
		this.state = state
	}

	resume(){
		warn("Resuming...")
		this.loadState()
		this.mine(this.state)
	}
}

export const autonomousMiner = new autonomousMinerProgram()