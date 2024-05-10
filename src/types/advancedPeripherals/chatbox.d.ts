// sendMessage¶

// sendMessage(message: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// Broadcasts a message to the global chat or if range is specified it is sent to all players in the range.
// The prefix will change the text that appears inside the brackets at the start of a message. Defaults to "AP".
// To change the brackets used around the prefix you must specify a string like so:
// "[]", "()", "<>", ...
// bracketColor specifies the color to use for the brackets, this must be in the MOTD code format.
// Returns true if the message is successfully sent, or nil and an error message if it fails.


// local chatBox = peripheral.find("chatBox")

// chatBox.sendMessage("Hello world!") -- Sends "[AP] Hello world!" in chat
// os.sleep(1) -- We must account for the cooldown between messages, this is to prevent spam
// chatBox.sendMessage("I am dave", "Dave") -- Sends "[Dave] I am dave"
// os.sleep(1)

// -- Sends message "Welcome!" with cyan <> brackets around "<Box>"
// -- to players within 30 blocks of the chat box
// chatBox.sendMessage("Welcome!", "Box", "<>", "&b", 30)
// Tip

// Just like the bracketColor argument you can add colors to the message and prefix arguments using the same MOTD color code format.
// Since CC doesn't accept non-ascii charactor §, you should replace it with &.
// If you want to send colored message but not only colored brackets, please use sendFormattedMessage() instead.

// sendMessageToPlayer¶

// sendMessageToPlayer(message: string, username: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// Similar to sendMessage() this sends a message to one specific player. Specify the player to send the message to with the username parameter.

// local chatBox = peripheral.find("chatBox")

// chatBox.sendMessageToPlayer("Hello there.", "Player123") -- Sends "[AP] Hello there." to Player123 in chat
// sendToastToPlayer¶

// sendToastToPlayer(message: string, title: string, username: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// Sends a toast to the specified player. The design of the toast is the classic notification design. It's planned to add a custom rendered design in the future.
// !Image of the toast


// local chatBox = peripheral.find("chatBox")

// chatBox.sendToastToPlayer("I will chat box you", "Hello", "Dev", "&4&lBoxi", "()", "&c&l")
// sendFormattedMessage¶

// sendFormattedMessage(json: string, username: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// This function is fundamentally the same as sendMessage() except it takes a json text component as the first parameter.
// Find out more information on how the text component format works on the minecraft fandom wiki. You can generate the json at minecraft.tools.

// local chatBox = peripheral.find("chatBox")

// local message = {
//     {text = "Click "}, 
//     {
//         text = "here",
//         underlined = true,
//         color = "aqua",
//         clickEvent = {
//             action = "open_url",
//             value = "https://advancedperipherals.madefor.cc/"
//         }
//     },
//     {text = " for the AP "},
//     {text = "documentation", color = "red"},
//     {text = "!"}
// }

// local json = textutils.serialiseJSON(message)

// chatBox.sendFormattedMessage(json)
// sendFormattedMessageToPlayer¶

// sendFormattedMessageToPlayer(json: string, username: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// Similar to sendFormattedMessage() this sends a formatted message to one specific player. Specify the player to send the message to with the username parameter.
// sendFormattedToastToPlayer¶

// sendFormattedToastToPlayer(messageJson: string, titleJson: string, username: string[, prefix: string, brackets: string, bracketColor: string, range: number]) -> true | nil, string
// This function is fundamentally the same as sendToast() except it takes a json text component as the first and second parameter.
// Find out more information on how the text component format works on the minecraft fandom wiki. You can generate the json at minecraft.tools.
// !Image of the formatted toast


// local chatBox = peripheral.find("chatBox")


// local title = {
//     { text = "Hello", color = "dark_purple"}
// }

// local message = {
//     { text = "I will chat "},
//     { text = "box ", color = "red"},
//     { text = "you"}
// }

// local titleJson = textutils.serializeJSON(title)
// local messageJson = textutils.serialiseJSON(message)

// successful, error = chatBox.sendFormattedToastToPlayer(messageJson, titleJson, "Dev", "&4&lBoxi", "()", "&c&l")

/** @noSelf **/
export interface ChatBox {
    /**
     * Broadcasts a message to the global chat or if range is specified it is sent to all players in the range.
     * The prefix will change the text that appears inside the brackets at the start of a message. Defaults to "AP".
     * To change the brackets used around the prefix you must specify a string like so:
     * "[]", "()", "<>", ...
     * bracketColor specifies the color to use for the brackets, this must be in the MOTD code format.
     * @param message The message to send
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendMessage(message: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>

    /**
     * Sends a message to one specific player. Specify the player to send the message to with the username parameter.
     * @param message The message to send
     * @param username The username of the player to send the message to
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendMessageToPlayer(message: string, username: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>

    /**
     * Sends a toast to the specified player. The design of the toast is the classic notification design. It's planned to add a custom rendered design in the future.
     * @param message The message to send
     * @param title The title of the toast
     * @param username The username of the player to send the message to
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendToastToPlayer(message: string, title: string, username: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>

    /**
     * This function is fundamentally the same as sendMessage() except it takes a json text component as the first parameter.
     * Find out more information on how the text component format works on the minecraft fandom wiki. You can generate the json at minecraft.tools.
     * @param json The json to send
     * @param username The username of the player to send the message to
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendFormattedMessage(json: string, username: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>

    /**
     * Similar to sendFormattedMessage() this sends a formatted message to one specific player. Specify the player to send the message to with the username parameter.
     * @param json The json to send
     * @param username The username of the player to send the message to
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendFormattedMessageToPlayer(json: string, username: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>

    /**
     * This function is fundamentally the same as sendToast() except it takes a json text component as the first and second parameter.
     * Find out more information on how the text component format works on the minecraft fandom wiki. You can generate the json at minecraft.tools.
     * @param messageJson The message to send
     * @param titleJson The title of the toast
     * @param username The username of the player to send the message to
     * @param prefix The prefix to use
     * @param brackets The brackets to use
     * @param bracketColor The color of the brackets
     * @param range The range to send the message to
     */
    sendFormattedToastToPlayer(messageJson: string, titleJson: string, username: string, prefix?: string, brackets?: string, bracketColor?: string, range?: number): LuaMultiReturn<[true | undefined, string]>
}