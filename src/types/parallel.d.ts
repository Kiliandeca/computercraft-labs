declare namespace parallel {

    /*
        Wait for any of the given functions to finish.
    */
		export function waitForAny(...functions: Function[]): void;

    /*
        Wait for all of the given functions to finish.
    */
    export function waitForAll(...functions: Function[]): void;
}
