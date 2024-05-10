import { warn } from "./logger"

export function getRequiredPeripheral(name: string): any {

    const p = peripheral.find(name)
    if (!p) {
        throw `Peripheral ${name} is required but not present`
    }

    return p
}

export function getOptionalPeripheral(name: string): any | undefined {

    const p = peripheral.find(name)
    if (!p) {
        warn(`Peripheral ${name} is optional but not present`)
    }

    return p
}
