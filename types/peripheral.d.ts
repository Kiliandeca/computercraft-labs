/** @noSelfInFile */
declare namespace peripheral {
    type WrappedPeripheral = Monitor | Computer | Modem | Drive;

    /** @noSelf **/
    export interface Computer {
        turnOn(): void
        shutdown(): void
        reboot(): void
        getID(): number
        isOn(): boolean
        getLabel(): string
    }

    /** @noSelf **/
    export interface Modem {
        // missing more function
        open(channel: number): void
        isOpen(channel: number): boolean
        close(channel: number): void
        closeAll(): number
        transmit(channel: number, replyChannel: number, payload: boolean | number | string | LuaTable<AnyNotNil, any>): void
        isWireless(): boolean
    }

    /** @noSelf **/
    export interface Drive {
        isDiskPresent(): boolean
        // missing more function
    }

    /** @noSelf **/
    export interface Monitor {
    }

    function getType(...args: any[]): any
    function isPresent(...args: any[]): any
    function getNames(...args: any[]): any
    function wrap(...args: any[]): any
}