import { refuel } from "./refuel"

export function mine(distance: number) {
    turtle.digDown()
    turtle.digUp()
    for (let index = 0; index < distance; index++) {
        forwardDig()
        turtle.digDown()
        turtle.digUp()
    }
}

function forwardDig() {
    while (true) {
        turtle.dig()
        let [success, reason] = turtle.forward()
        if (success) {
            break;
        }

        switch (reason) {
            case "Out of fuel":
                refuel()
                break;
            default:
                break;
        }
    }
}

