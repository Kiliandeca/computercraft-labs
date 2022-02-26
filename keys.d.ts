/** @noSelfInFile */
declare namespace keys {
    /**
     * Translates a numerical key code to a human-readable name. The human-readable name is one of the constants in the keys API.
     * @param code number The key code to look up.
     * @return string The name of the key.
     * or 
     * @return nil if not a valid key code
     * 
     * @example keys.getName(keys.enter)
     * 
     * @see [CC: Tweaked Docs](https://tweaked.cc/module/keys.html#v:getName)
     * @see [[Out of Date] ComputerCraft Wiki](https://wiki.computercraft.cc/Keys.getName)
     */
     function getName(code: number): string | null;
}