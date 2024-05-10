/** @noSelf **/
export interface PlayerDetector {
    /*
        Returns the position of the player with the username passed.
        @param username The username of the player
    */
    getPlayerPos(username: string): { dimension: string, eyeHeight: number, pitch: number, yaw: number, x: number, y: number, z: number } | undefined;

    /*
        Returns a list of all online players.
    */
    getOnlinePlayers(): string[];

    /*
        Returns a list of players within the given range of the peripheral.
        @param range The range to search for players
    */
    getPlayersInRange(range: number): string[];

    /*
        Returns a list of players within the 2 positions posOne and posTwo.
        @param posOne The first position
        @param posTwo The second position
    */
    getPlayersInCoords(posOne: { x: number, y: number, z: number }, posTwo: { x: number, y: number, z: number }): string[];

    /*
        Returns a list of players within a cuboid centered at the peripheral.
        @param w The width of the cuboid
        @param h The height of the cuboid
        @param d The depth of the cuboid
    */
    getPlayersInCubic(w: number, h: number, d: number): string[];

    /*
        Returns true if the player whose username matches the provided username is within the given range of the peripheral.
        @param range The range to search for players
        @param username The username of the player
    */
    isPlayerInRange(range: number, username: string): boolean;

    /*
        Returns true if the player is within the 2 positions.
        @param posOne The first position
        @param posTwo The second position
        @param username The username of the player
    */
    isPlayerInCoords(posOne: { x: number, y: number, z: number }, posTwo: { x: number, y: number, z: number }, username: string): boolean;

    /*
        Returns true if the player is within the cuboid centered at the peripheral.
        @param w The width of the cuboid
        @param h The height of the cuboid
        @param d The depth of the cuboid
        @param username The username of the player
    */
    isPlayerInCubic(w: number, h: number, d: number, username: string): boolean;

    /*
        Returns true if there is any player in the given range.
        @param range The range to search for players
    */
    isPlayersInRange(range: number): boolean;

    /*
        Returns true if any player is within the 2 positions.
        @param posOne The first position
        @param posTwo The second position
    */
    isPlayersInCoords(posOne: { x: number, y: number, z: number }, posTwo: { x: number, y: number, z: number }): boolean;

    /*
        Returns true if any player is within the cuboid centered at the peripheral.
        @param w The width of the cuboid
        @param h The height of the cuboid
        @param d The depth of the cuboid
    */
    isPlayersInCubic(w: number, h: number, d: number): boolean;
}