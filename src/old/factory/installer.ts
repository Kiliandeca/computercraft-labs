import { getPressedKey } from "../utils/keys";
import { updateFloppy } from "./floppy";
import { placer } from "./placer";



function breaker (){
    console.log("[I] Entering Breaker mode");
    
    while(true) {
        if (turtle.getItemCount()){
            turtle.dropUp()
        }
        if (redstone.getInput("front")) {
            turtle.dig()
            turtle.dropUp()
        }

        // Sometime the placer is too fast
        // New turtle is ready before the cooldown of dig and dropUp
        // Redstone is already active when the Breaker wait for redstone change
        if (!redstone.getInput("front")) {
            os.pullEvent("redstone")
        }
    }
}

export function factoryMain(){
    if(!turtle){
        updateFloppy()
    } else {
        console.log('[Menu] Please specify Turtle role:');
        console.log('  [P]lace');
        console.log('  [B]reak');

        const key = getPressedKey()
        switch (key) {
            case 'p':
                placer()
                break;
            case 'b':
                breaker()
                break;
            default:
                console.log(`[W] Nothing for: ${key}`);
                break;
        }
    }
}