export const OBJECTS = {
    ENDER_CHEST: "enderchests:ender_chest",
}

export function shortName(name: string): string {
    return name.split(":")[1]
}
