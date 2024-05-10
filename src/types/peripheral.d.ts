declare namespace peripheral {
    export type wrappedPeripheral = any;
    export type Side = "left" | "right" | "top" | "bottom" | "front" | "back"

    /*
        Provides a list of all peripherals available.
    */
    export function getNames(): Array<Side | string>;

    /*
        Determines if a peripheral is present with the given name.
    */
    export function isPresent(name: string | Side): boolean;

    /*
        Get the types of a named or wrapped peripheral.
    */
    export function getType(peripheral: Side | wrappedPeripheral): string | undefined;

    /*
        Check if a peripheral is of a particular type.
    */
    export function hasType(peripheral: Side | wrappedPeripheral, peripheral_type: string): boolean | undefined;

    /*
        Get all available methods for the peripheral with the given name.
    */
    export function getMethods(name: string): string[] | undefined;

    /*
        Get the name of a peripheral wrapped with peripheral.wrap.
    */
    export function getName(peripheral: wrappedPeripheral): string;

    /*
        Call a method on the peripheral with the given name.
    */
    export function call(name: string, method: string, ...args: any[]): any;

    /*
        Get a table containing all functions available on a peripheral. These can then be called instead of using peripheral.call every time.
    */
    export function wrap(name: string): wrappedPeripheral | undefined;

    /*
        Find all peripherals of a specific type, and return the wrapped peripherals.
    */
    export function find(type: string, filter?: (name: string, wrapped: wrappedPeripheral) => boolean): LuaMultiReturn<wrappedPeripheral>;
}
