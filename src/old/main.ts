import { listenKeys, listenModem } from "./keyListener"


for (const side of peripheral.getNames()) {    
    if (peripheral.isPresent(side)) {
        if (peripheral.getType(side) === 'modem') {
            console.log('Modem detected');
            rednet.open(side)
        }
    }
}

if(turtle){
    console.log(`Current Turtle fuel level: ${turtle.getFuelLevel()}`);
}

if(pocket){
    console.log(`Pocket`);
}

parallel.waitForAny(listenKeys, listenModem)

console.log("End main");
