import { info, warn } from "./logger"

export function waitForInventoryChange() {
    os.pullEvent("turtle_inventory")
}

export function waitForItemInSlot(slot: number, name: string) {
    turtle.select(slot)
    while (true) {
        if (turtle.getItemCount(slot) == 0) {
            waitForInventoryChange()
        }

        const item = turtle.getItemDetail(slot)
        if (!item) {
            waitForInventoryChange()
            continue
        }

        if (item.name !== name) {
            warn(`Expected ${name} in slot ${slot}, but found ${item.name}`)
            waitForInventoryChange()
            continue
        }

        turtle.select(1)
        return
    }
}

export type moveDirections = "forward" | "up" | "down"
export enum moveDirectionsEnum {
    FORWARD = "forward",
    UP = "up",
    DOWN = "down",
}

// This must be a function because turtle is not defined on regular computers and it crashes
export const getMoveDirectionFunctions = () => {
    return {
        forward : {
            move: turtle.forward,
            dig: turtle.dig,
        },
        up : {
            move: turtle.up,
            dig: turtle.digUp,
        },
        down: {
            move: turtle.down,
            dig: turtle.digDown,
        },
    }
}

export function doMove(direction: moveDirections) {
    const move = getMoveDirectionFunctions()[direction].move
    const dig = getMoveDirectionFunctions()[direction].dig

    while (turtle.getFuelLevel() == 0) {
        refuel()
    }

    while (true) {
        let [success, reason] = move()
        if (success) {
            break;
        }
        dig()
    }
}

export function refuel() {
    console.log('Trying to refuel');
    for (const i of $range(1, 16)) {
        turtle.select(i);
        const [isFuel] = turtle.refuel(0);
        if (isFuel) {
            turtle.refuel(Math.max(turtle.getItemCount(), 16));
            break;
        }
    }
    turtle.select(1);
}

export function checkIsFuel(slot: number): boolean {
    const oldSlot = turtle.getSelectedSlot()
    turtle.select(slot)
    const [result] = turtle.refuel(0)
    turtle.select(oldSlot)
    return result === true
}


export function fuelIsKnown(name: string): name is keyof typeof OBJECTS_FUEL {
    return OBJECTS_FUEL.hasOwnProperty(name)
}

const OBJECTS_FUEL = {
    "minecraft:blaze_rod": 120,
    "minecraft:coal": 80,
    "minecraft:charcoal": 80,
}

export function getFuelPotential(name: string): number {
    if (!fuelIsKnown(name)) {
        turtle.refuel()
        warn(`Fuel ${name} is not known, assuming 80`)
        return 80
    }
    return OBJECTS_FUEL[name]
}

export function findFirstEmptySlot(start: number = 1, end: number = 16) {
    for (const i of $range(start, end)) {
        const result = turtle.getItemDetail(i)
        
        if (!result) {
            return i
        }
    }

    return false
}