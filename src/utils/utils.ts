import { info } from "./logger";

export function isNull<T>(value: null | T): value is null{
    return value === null;
}

export function isUndefined<T>(value: undefined | T): value is undefined{
    return value === undefined;
}

export function askInput(prompt: string): string | undefined {
    info(prompt);
    const result = io.read()
    return result;
}

export enum TurtleDropFailures {
    NO_SPACE = "No space for items",
    NO_ITEMS = "No items to drop",
}
