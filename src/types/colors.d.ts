declare namespace colors {
    export const white = 0x1
    export const orange = 0x2
    export const magenta = 0x4
    export const lightBlue = 0x8
    export const yellow = 0x10
    export const lime = 0x20
    export const pink = 0x40
    export const gray = 0x80
    export const lightGray = 0x100
    export const cyan = 0x200
    export const purple = 0x400
    export const blue = 0x800
    export const brown = 0x1000
    export const green = 0x2000
    export const red = 0x4000
    export const black = 0x8000

    /**
     * Combines a set of colors (or sets of colors) into a larger set.
     * @param colors The colors to combine.
     */
    export function combine(...colors: number[]): number

    /**
     * Removes one or more colors (or sets of colors) from an initial set.
     * @param colors The color from which to subtract.
     */
    export function subtract(colors: number, ...colorsToSubstract: number[]): number

    /**
     * Tests whether color is contained within colors.
     * @param colors A color, or color set
     * @param color A color or set of colors that colors should contain.
     */
    export function test(colors: number, color: number): boolean

    /**
     * Combine a three-colour RGB value into one hexadecimal representation.
     * @param r The red channel, should be between 0 and 1.
     * @param g The green channel, should be between 0 and 1.
     * @param b The blue channel, should be between 0 and 1.
     */
    export function packRGB(r: number, g: number, b: number): number

    /**
     * Separate a hexadecimal RGB colour into its three constituent channels.
     * @param rgb The combined hexadecimal colour.
     */
    export function unpackRGB(rgb: number): [number, number, number]

    /**
     * Converts the given color to a paint/blit hex character (0-9a-f).
     * @param color The color to convert.
     */
    export function toBlit(color: number): string

    /**
     * Converts the given paint/blit hex character (0-9a-f) to a color.
     * @param hex The paint/blit hex character to convert
     */
    export function fromBlit(hex: string): number
}
