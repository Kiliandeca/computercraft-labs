declare namespace os {
    export enum Locale {
        ingame = "ingame",
        utc = "utc",
        local = "local",
    }
    
    /*
        Pause execution of the current thread and waits for any events matching filter.
        This function yields the current process and waits for it to be resumed with a vararg list where the first element matches filter. If no filter is supplied, this will match all events.
        Unlike os.pullEventRaw, it will stop the application upon a "terminate" event, printing the error "Terminated".
    */
    export function pullEvent(filter?: string): LuaMultiReturn<[string, ...any]>;

    /*
        Pause execution of the current thread and waits for events, including the terminate event.
        This behaves almost the same as os.pullEvent, except it allows you to handle the terminate event yourself - the program will not stop execution when Ctrl+T is pressed.
    */
    export function pullEventRaw(filter?: string): LuaMultiReturn<[string, ...any]>;

    /*
        Pauses execution for the specified number of seconds, alias of _G.sleep.
    */
    export function sleep(time: number): void;

    /*
        Get the current CraftOS version (for example, CraftOS 1.9).
    */
    export function version(): string;

    /*
        Run the program at the given path with the specified environment and arguments.
    */
    export function run(env: LuaTable, path: string, ...args: any[]): boolean;

    /*
        Adds an event to the event queue. This event can later be pulled with os.pullEvent.
    */
    export function queueEvent(name: string, ...args: any[]): void;

    /*
        Starts a timer that will run for the specified number of seconds. Once the timer fires, a timer event will be added to the queue with the ID returned from this function as the first parameter.
    */
    export function startTimer(time: number): number;

    /*
        Cancels a timer previously started with startTimer. This will stop the timer from firing.
    */
    export function cancelTimer(token: number): void;
    
    /*
        Sets an alarm that will fire at the specified in-game time. When it fires, an alarm event will be added to the event queue with the ID returned from this function as the first parameter.
    */
    export function setAlarm(time: number): number;

    /*
        Cancels an alarm previously started with setAlarm. This will stop the alarm from firing.
    */
    export function cancelAlarm(token: number): void;

    /*
        Shuts down the computer immediately.
    */
    export function shutdown(): void;

    /*
        Reboots the computer immediately.
    */
    export function reboot(): void;

    /*
        Returns the ID of the computer.
    */
    export function getComputerID(): number;

    /*
        Returns the ID of the computer.
    */
    export function computerID(): number;

    /*
        Returns the label of the computer, or nil if none is set.
    */
    export function getComputerLabel(): string | null;

    /*
        Returns the label of the computer, or nil if none is set.
    */
    export function computerLabel(): string | null;

    /*
        Set the label of this computer.
    */
    export function setComputerLabel(label?: string): void;

    /*
        Returns the number of seconds that the computer has been running.
    */
    export function clock(): number;

    /*
        Returns the current time depending on the string passed in. This will always be in the range [0.0, 24.0).
        
    */
    export function time(locale?: Locale | LuaTable): any;

    /*
        Returns the day depending on the locale specified.
    */
    export function day(args?: Locale): number;

    /*
        Returns the number of milliseconds since an epoch depending on the locale.
    */
    export function epoch(args?: Locale): number;

    /*
        Returns a date string (or table) using a specified format string and optional time to format.
    */
    export function date(format?: string, time?: number): any;
}
