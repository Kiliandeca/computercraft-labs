import { isEmpty } from "../utils/inventory";
import { runUntileBackspace } from "../utils/keys"

export function looting() {
    console.log("[I] Starting Looting");
    
    const gotEc = gotEnderchest()

    if(gotEc) {
        turtle.turnLeft()
        turtle.turnLeft()
        turtle.select(1)
        turtle.place()

        if (detectTurtleOrChest()){
            // todo while neighbour not ok
            runUntileBackspace(emptyItself)
        } else {
            console.log('[E] Invalid container');
        }

        turtle.select(1)
        turtle.dig()
        turtle.turnRight()
        turtle.turnRight()

    } else {
        turtle.turnLeft()

        if (detectTurtleOrChest()){
            // todo while neighbour not ok
            runUntileBackspace(emptyItself)
        } else {
            console.log('[E] Invalid container');
        }
    
        turtle.turnRight()
    }
}

function gotEnderchest(slot: turtle.TurtleSlot = 1){
    const itemDetail = turtle.getItemDetail(slot)
    if (!itemDetail) {
        return false
    }

    if (itemDetail.name !== "enderstorage:ender_chest") {
        return false
    }

    return true
}

function emptyItself(start: turtle.TurtleSlot = 1) {
    console.log("[I] Emptying myself");

    do {
        for (const i of $range(start, 16)) {
            const count = turtle.getItemCount(i as turtle.TurtleSlot)
            if (count !== 0){
                emptySlot(i as turtle.TurtleSlot)
            }
        }
    } while (!isEmpty());

    turtle.select(1)  
}

function emptySlot(slot: turtle.TurtleSlot) {
    turtle.select(slot)
    let dropSuccess, dropReason
    do {
        [dropSuccess, dropReason] = turtle.drop()
        if (!dropSuccess) {

            switch (dropReason) {
                case  TurtleDropFailures.NO_SPACE:
                    console.log("[I] No space, waiting");
                    sleep(1)
                    break;
                case TurtleDropFailures.NO_ITEMS:
                    console.log("[I] Item was removed");
                    return;
                default:
                    console.log(`[E] Unknown failure: ${dropReason}`);
                    return;
            }

        }
    } while (!dropSuccess)
}

// https://github.com/cc-tweaked/CC-Tweaked/blob/mc-1.16.x/src/main/java/dan200/computercraft/shared/turtle/core/TurtleDropCommand.java
enum TurtleDropFailures {
    NO_SPACE = "No space for items",
    NO_ITEMS = "No items to drop",
}

const expectedContainer = [
    'computercraft:turtle_normal',
    'enderstorage:ender_chest',
]

function detectTurtleOrChest(){
    if (!turtle.detect()){
        return false
    }

    const [success, data] = turtle.inspect()
    if (!success) {
        return false
    }    

    return expectedContainer.findIndex(e => e === (data as turtle.InspectItemData).name) !== -1
}
