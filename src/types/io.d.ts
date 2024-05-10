declare namespace io {
    
    /*
        A file handle representing the "standard input". Reading from this file will prompt the user for input.
    */
    export const stdin: Handle;

    /*
        A file handle representing the "standard output". Writing to this file will display the written text to the screen.
    */
    export const stdout: Handle;

    /*
        A file handle representing the "standard error" stream.
    */
    export const stderr: Handle;

    /*
        Closes the provided file handle.
    */
    export function close(file?: Handle): void;

    /*
        Flushes the current output file.
    */
    export function flush(): LuaMultiReturn<[true | undefined, string]>;

    /*
        Get or set the current input file.
    */
    export function input(file?: Handle | string): Handle;

    /*
        Opens the given file name in read mode and returns an iterator that, each time it is called, returns a new line from the file.
    */
    export function lines(filename?: string, ...args: any[]): () => string | undefined;

    /*
        Open a file with the given mode, either returning a new file handle or nil, plus an error message.
    */
    export function open(filename: string, mode?: string): LuaMultiReturn<[Handle | undefined, string]>;

    /*
        Get or set the current output file.
    */
    export function output(file?: Handle | string): Handle;

    /*
        Read from the currently opened input file.
    */
    export function read(...args: any[]): string | undefined;

    /*
        Checks whether handle is a given file handle, and determine if it is open or not.
    */
    export function type(obj: any): "file" | "closed file" | undefined;

    /*
        Write to the currently opened output file.
    */
    export function write(...args: any[]): LuaMultiReturn<[Handle | undefined, string]>;
}
