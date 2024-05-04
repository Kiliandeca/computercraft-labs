import { findFirstEmptySlot } from "../utils/inventory";

function isComputer(wrappedPeripheral: peripheral.WrappedPeripheral | null): wrappedPeripheral is peripheral.Computer {
    if (wrappedPeripheral === null)
        return false;
    return 'getID' in wrappedPeripheral;
}


function getTurtles(): boolean {

    const count = turtle.getItemCount();
    if (count < 1) {
        const [suckSuccess, suckReason] = turtle.suckUp();
        if (!suckSuccess) {
            // console.log(`[I] Waiting: ${suckReason}`);
            sleep(2);
            return false
        }
    }

    const item = turtle.getItemDetail()
    if (!item) {
        console.log('[E] Can not get item details');
        return false
    }

    if (item.name !== 'computercraft:turtle_normal') {
        console.log(`[W] This is not a turtle: ${item.name}`);
        
        const emptySlot = findFirstEmptySlot(2)
        if (!emptySlot) {
            console.log('[E] No empty slot available please clean turtle inventory');
            sleep(5)
            return false
        }

        turtle.transferTo(emptySlot)
        return false
    }


    return true
}

function placeTurtle() {
    // Wait for the previous turtle to be break
    while (turtle.detect()) {
        sleep(0.2);
    }

    const [placeSuccess, placeReason] = turtle.place();
    if (!placeSuccess) {
        console.log(`[W] Can't place turtle: ${placeReason}`);
        return false
    }

    return true
}

function turnOnTurtle() {
    sleep(0.1)
    const periph = peripheral.wrap('front');
    
    if (!isComputer(periph)) {
        console.log(`[E] not a computer`);
        sleep(5)
        return false;
    }

    periph.turnOn();

    while (!periph.isOn()) {
        periph.turnOn();
        sleep(0.2)
    }

    // Turtle disconect when breaked
    // os.pullEvent("peripheral_detach");
}


export function placer() {
    console.log("[I] Entering Placer mode");
    while (true) {
        
        if(getTurtles()) {
            if (placeTurtle()) {
                turnOnTurtle()
            }
        }

        sleep(0.1);
    }
}

