
declare namespace fs {
    /**
     * When a directory is a possible candidate for completion, two entries are included - one with a trailing slash (indicating that entries within this directory exist) and one without it (meaning this entry is an immediate completion candidate). include_dirs can be set to false to only include those with a trailing slash.
     * @param path The path to complete.
     * @param location The location where paths are resolved from.
     * @param include_files When false, only directories will be included in the returned list.
     * @param include_dirs When false, "raw" directories will not be included in the returned list.
     */

    export function complete(path: string, location: string, include_files?: boolean, include_dirs?: boolean): string[];

    /**
     * Searches for files matching a string with wildcards.
     * @param path The path to complete.
     * @param location The location where paths are resolved from.
     * @param options 
     */
    export function complete(path: string, location: string, options: { include_files?: boolean, include_dirs?: boolean, include_hidden?: boolean }): string[];

    /**
     * Searches for files matching a string with wildcards.
     * @param path The wildcard-qualified path to search for.
     */
    export function find(path: string): string[];

    /**
     * Returns true if a path is mounted to the parent filesystem.
     * @param path The path to check.
     */
    export function isDriveRoot(path: string): boolean;

    /**
     * Returns a list of files in a directory.
     * @param path The path to list.
     */
    export function list(path: string): string[];

    /**
     * Combines several parts of a path into one full path, adding separators as needed.
     * @param path The first part of the path. For example, a parent directory path.
     * @param args Additional parts of the path to combine.
     */
    export function combine(path: string, ...args: string[]): string;

    /**
     * Returns the file name portion of a path.
     * @param path The path to get the name from.
     */
    export function getName(path: string): string;

    /**
     * Returns the parent directory portion of a path.
     * @param path The path to get the directory from.
     */
    export function getDir(path: string): string;

    /**
     * Returns the size of the specified file.
     * @param path The file to get the file size of.
     */
    export function getSize(path: string): number;

    /**
     * Returns whether the specified path exists.
     * @param path The path to check the existence of.
     */
    export function exists(path: string): boolean;

    /**
     * Returns whether the specified path is a directory.
     * @param path The path to check.
     */
    export function isDir(path: string): boolean;

    /**
     * Returns whether a path is read-only.
     * @param path The path to check.
     */
    export function isReadOnly(path: string): boolean;

    /**
     * Creates a directory, and any missing parents, at the specified path.
     * @param path The path to the directory to create.
     */
    export function makeDir(path: string): void;

    /**
     * Moves a file or directory from one path to another.
     * @param path The current file or directory to move from.
     * @param dest The destination path for the file or directory.
     */
    export function move(path: string, dest: string): void;

    /**
     * Copies a file or directory to a new path.
     * @param path The file or directory to copy.
     * @param dest The path to the destination file or directory.
     */
    export function copy(path: string, dest: string): void;

    /**
     * Deletes a file or directory.
     * @param path The path to the file or directory to delete.
     * @customName delete
     */
    export function deletePath(path: string): void;

    /**
     * Opens a file for reading or writing at a path.
     * @param path The path to the file to open.
     * @param mode The mode to open the file with.
     */
    export function open(path: string, mode: string): LuaMultiReturn<[Handle | undefined, string]>;

    /**
     * Returns the name of the mount that the specified path is located on.
     * @param path The path to get the drive of.
     */
    export function getDrive(path: string): string | undefined;

    /**
     * Returns the amount of free space available on the drive the path is located on.
     * @param path The path to check the free space for.
     */
    export function getFreeSpace(path: string): number | "unlimited";

    /**
     * Returns the capacity of the drive the path is located on.
     * @param path The path of the drive to get.
     */
    export function getCapacity(path: string): number | undefined;

    /**
     * Get attributes about a specific file or folder.
     * @param path The path to get attributes for.
     */
    export function attributes(path: string): { size: number, isDir: boolean, isReadOnly: boolean, created: number, modified: number };
}

/** @noSelf **/
declare class Handle {
    /**
     * Read a number of bytes from this file.
     * @param count The number of bytes to read. This may be 0 to determine we are at the end of the file. When absent, a single byte will be read.
     */
    read(count?: number): string | number | undefined;

    /**
     * Read the remainder of the file.
     */
    readAll(): string | undefined;

    /**
     * Read a line from the file.
     * @param withTrailing Whether to include the newline characters with the returned string. Defaults to false.
     */
    readLine(withTrailing?: boolean): string | undefined;

    /**
     * Seek to a new position within the file, changing where bytes are written to.
     * @param whence Where the offset is relative to.
     * @param offset The offset to seek to.
     */
    seek(whence?: string, offset?: number): number | string | undefined;

    /**
     * Write a string or byte to the file.
     * @param contents The string to write.
     */
    write(contents: string | number): void;

    /**
     * Write a string of characters to the file, following them with a new line character.
     * @param text The text to write to the file.
     */
    writeLine(text: string): void;

    /**
     * Save the current file without closing it.
     */
    flush(): void;

    /**
     * Close this file, freeing any resources it uses.
     */
    close(): void;
}
