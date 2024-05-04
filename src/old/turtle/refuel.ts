export function refuel() {
    console.log('Trying to refuel');
    for (const i of $range(1, 16)) {
        turtle.select(i as turtle.TurtleSlot);
        const isFuel = turtle.refuel(0);
        if (isFuel) {
            turtle.refuel(Math.max(turtle.getItemCount(), 10));
            break;
        }
    }
    turtle.select(1);
}
