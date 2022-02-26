export function findFirstEmptySlot(start: turtle.TurtleSlot = 1, end: turtle.TurtleSlot = 16) {
    for (const i of $range(start, end)) {
        const result = turtle.getItemDetail(i as turtle.TurtleSlot)
        
        if (!result) {
            return i as turtle.TurtleSlot
        }
    }

    return false
}

export function isEmpty(start: turtle.TurtleSlot = 1, end: turtle.TurtleSlot = 16) {
    for (const i of $range(start, end)) {
        const result = turtle.getItemDetail(i as turtle.TurtleSlot)
        
        if (result) {
            return false
        }
    }

    return true
}