export enum TurtleMovement {
    FORWARD,
    BACK,
    UP,
    DOWN,
    TURNRIGHT,
    TURNLEFT
}
export const movementMap = new Map<TurtleMovement, Function>()
    .set(TurtleMovement.FORWARD, () => {
        turtle.dig();
        turtle.forward();
    })
    .set(TurtleMovement.BACK, () => turtle.back())
    .set(TurtleMovement.UP, () => {
        turtle.digUp();
        turtle.up();
    })
    .set(TurtleMovement.DOWN, () => {
        turtle.digDown();
        turtle.down();
    })
    .set(TurtleMovement.TURNRIGHT, () => turtle.turnRight())
    .set(TurtleMovement.TURNLEFT, () => turtle.turnLeft());

export const keyToMovementMap = new Map<string, TurtleMovement>()
    .set('w', TurtleMovement.FORWARD)
    .set('s', TurtleMovement.BACK)
    .set('z', TurtleMovement.UP)
    .set('x', TurtleMovement.DOWN)
    .set('e', TurtleMovement.TURNRIGHT)
    .set('q', TurtleMovement.TURNLEFT);
