import { error, info, warn } from "../../utils/logger"
import { findFirstEmptySlot } from "../../utils/turtle";
import { Program } from "../program"

export class FactoryPlacerProgram implements Program {
    name: string

    constructor() {
        this.name = 'Factory Placer'
    }

	start(): void {
		info(`Setup ${FactoryPlacerProgram.name}`)
        while (true) {
        
            if(this.getTurtle()) {
                if (this.placeTurtle()) {
                    this.turnOnTurtle()
                }
            }
    
            sleep(0.1);
        }

	}

    getTurtle(): boolean {
        const count = turtle.getItemCount();
        if (count < 1) {
            const [suckSuccess, suckReason] = turtle.suckUp();
            if (!suckSuccess) {
                sleep(2);
                return false
            }
        }
    
        const item = turtle.getItemDetail()
        if (!item) {
            error('Can not get item details');
            return false
        }
    
        if (item.name !== 'computercraft:turtle_normal') {
            warn(`This is not a turtle: ${item.name}`);
            
            const emptySlot = findFirstEmptySlot(2)
            if (!emptySlot) {
                error('No empty slot available please clean turtle inventory');
                sleep(5)
                return false
            }
    
            turtle.transferTo(emptySlot)
            return false
        }
    
        return true
    }

    placeTurtle() {
        // Wait for the previous turtle to be break
        while (turtle.detect()) {
            sleep(0.2);
        }
    
        const [placeSuccess, placeReason] = turtle.place();
        if (!placeSuccess) {
            warn(`Can't place turtle: ${placeReason}`);
            return false
        }
    
        return true
    }

    turnOnTurtle() {
        sleep(0.1)
        const periph = peripheral.wrap('front');
        periph.turnOn();
    
        while (!periph.isOn()) {
            periph.turnOn();
            sleep(0.2)
        }
    
        // Turtle disconect when breaked
        // os.pullEvent("peripheral_detach");
    }

}

export const factoryPlacer = new FactoryPlacerProgram()
