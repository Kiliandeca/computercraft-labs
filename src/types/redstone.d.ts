

// getSides()	Returns a table containing the six sides of the computer.
// setOutput(side, on)	Turn the redstone signal of a specific side on or off.
// getOutput(side)	Get the current redstone output of a specific side.
// getInput(side)	Get the current redstone input of a specific side.
// setAnalogOutput(side, value)	Set the redstone signal strength for a specific side.
// setAnalogueOutput(side, value)	Set the redstone signal strength for a specific side.
// getAnalogOutput(side)	Get the redstone output signal strength for a specific side.
// getAnalogueOutput(side)	Get the redstone output signal strength for a specific side.
// getAnalogInput(side)	Get the redstone input signal strength for a specific side.
// getAnalogueInput(side)	Get the redstone input signal strength for a specific side.
// setBundledOutput(side, output)	Set the bundled cable output for a specific side.
// getBundledOutput(side)	Get the bundled cable output for a specific side.
// getBundledInput(side)	Get the bundled cable input for a specific side.
// testBundledInput(side, mask)	Determine if a specific combination of colours are on for the given side.
// getSides()
// Source
// Returns a table containing the six sides of the computer. Namely, "top", "bottom", "left", "right", "front" and "back".

// Returns
// { string... } A table of valid sides.
// Changes
// New in version 1.2
// setOutput(side, on)
// Source
// Turn the redstone signal of a specific side on or off.

// Parameters
// side string The side to set.
// on boolean Whether the redstone signal should be on or off. When on, a signal strength of 15 is emitted.
// getOutput(side)
// Source
// Get the current redstone output of a specific side.

// Parameters
// side string The side to get.
// Returns
// boolean Whether the redstone output is on or off.
// See also
// setOutput
// getInput(side)
// Source
// Get the current redstone input of a specific side.

// Parameters
// side string The side to get.
// Returns
// boolean Whether the redstone input is on or off.
// setAnalogOutput(side, value)
// Source
// Set the redstone signal strength for a specific side.

// Parameters
// side string The side to set.
// value number The signal strength between 0 and 15.
// Throws
// If value is not between 0 and 15.

// Changes
// New in version 1.51
// setAnalogueOutput(side, value)
// Source
// Set the redstone signal strength for a specific side.

// Parameters
// side string The side to set.
// value number The signal strength between 0 and 15.
// Throws
// If value is not between 0 and 15.

// Changes
// New in version 1.51
// getAnalogOutput(side)
// Source
// Get the redstone output signal strength for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The output signal strength, between 0 and 15.
// See also
// setAnalogOutput
// Changes
// New in version 1.51
// getAnalogueOutput(side)
// Source
// Get the redstone output signal strength for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The output signal strength, between 0 and 15.
// See also
// setAnalogOutput
// Changes
// New in version 1.51
// getAnalogInput(side)
// Source
// Get the redstone input signal strength for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The input signal strength, between 0 and 15.
// Changes
// New in version 1.51
// getAnalogueInput(side)
// Source
// Get the redstone input signal strength for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The input signal strength, between 0 and 15.
// Changes
// New in version 1.51
// setBundledOutput(side, output)
// Source
// Set the bundled cable output for a specific side.

// Parameters
// side string The side to set.
// output number The colour bitmask to set.
// See also
// colors.subtract For removing a colour from the bitmask.
// colors.combine For adding a color to the bitmask.
// getBundledOutput(side)
// Source
// Get the bundled cable output for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The bundle cable's output.
// getBundledInput(side)
// Source
// Get the bundled cable input for a specific side.

// Parameters
// side string The side to get.
// Returns
// number The bundle cable's input.
// See also
// testBundledInput To determine if a specific colour is set.
// testBundledInput(side, mask)
// Source
// Determine if a specific combination of colours are on for the given side.

// Parameters
// side string The side to test.
// mask number The mask to test.
// Returns
// boolean If the colours are on.
// Usage
// Check if colors.white and colors.black are on above the computer.

// Run ᐅ
// print(redstone.testBundledInput("top", colors.combine(colors.white, colors.black)))

declare namespace redstone {
    /**
     * Returns a table containing the six sides of the computer. Namely, "top", "bottom", "left", "right", "front" and "back".
     * @returns A table of valid sides.
     */
    function getSides(): string[];

    /**
     * Turn the redstone signal of a specific side on or off.
     * @param side The side to set.
     * @param on Whether the redstone signal should be on or off. When on, a signal strength of 15 is emitted.
     */
    function setOutput(side: string, on: boolean): void;

    /**
     * Get the current redstone output of a specific side.
     * @param side The side to get.
     * @returns Whether the redstone output is on or off.
     */
    function getOutput(side: string): boolean;

    /**
     * Get the current redstone input of a specific side.
     * @param side The side to get.
     * @returns Whether the redstone input is on or off.
     */
    function getInput(side: string): boolean;

    /**
     * Set the redstone signal strength for a specific side.
     * @param side The side to set.
     * @param value The signal strength between 0 and 15.
     * @throws If value is not between 0 and 15.
     */
    function setAnalogOutput(side: string, value: number): void;

    /**
     * Set the redstone signal strength for a specific side.
     * @param side The side to set.
     * @param value The signal strength between 0 and 15.
     * @throws If value is not between 0 and 15.
     */
    function setAnalogueOutput(side: string, value: number): void;

    /**
     * Get the redstone output signal strength for a specific side.
     * @param side The side to get.
     * @returns The output signal strength, between 0 and 15.
     */
    function getAnalogOutput(side: string): number;

    /**
     * Get the redstone output signal strength for a specific side.
     * @param side The side to get.
     * @returns The output signal strength, between 0 and 15.
     */
    function getAnalogueOutput(side: string): number;

    /**
     * Get the redstone input signal strength for a specific side.
     * @param side The side to get.
     * @returns The input signal strength, between 0 and 15.
     */
    function getAnalogInput(side: string): number;

    /**
     * Get the redstone input signal strength for a specific side.
     * @param side The side to get.
     * @returns The input signal strength, between 0 and 15.
     */
    function getAnalogueInput(side: string): number;

    /**
     * Set the bundled cable output for a specific side.
     * @param side The side to set.
     * @param output The colour bitmask to set.
     */
    function setBundledOutput(side: string, output: number): void;

    /**
     * Get the bundled cable output for a specific side.
     * @param side The side to get.
     * @returns The bundle cable's output.
     */
    function getBundledOutput(side: string): number;

    /**
     * Get the bundled cable input for a specific side.
     * @param side The side to get.
     * @returns The bundle cable's input.
     */
    function getBundledInput(side: string): number;

    /**
     * Determine if a specific combination of colours are on for the given side.
     * @param side The side to test.
     * @param mask The mask to test.
     * @returns If the colours are on.
     */
    function testBundledInput(side: string, mask: number): boolean;
}
