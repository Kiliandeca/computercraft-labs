declare namespace turtle {

    /*
        Craft a recipe based on the turtle's inventory. The turtle's inventory should set up like a crafting grid. For instance, to craft sticks, slots 1 and 5 should contain planks. All other slots should be empty, including those outside the crafting "grid".
    */
    export function craft(limit?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Move the turtle forward one block.
    */
    export function forward(): LuaMultiReturn<[boolean, string?]>;

    /*
        Move the turtle backwards one block.
    */
    export function back(): LuaMultiReturn<[boolean, string?]>;

    /*
        Move the turtle up one block.
    */
    export function up(): LuaMultiReturn<[boolean, string?]>;

    /*
        Move the turtle down one block.
    */
    export function down(): LuaMultiReturn<[boolean, string?]>;

    /*
        Rotate the turtle 90 degrees to the left.
    */
    export function turnLeft(): LuaMultiReturn<[boolean, string?]>;

    /*
        Rotate the turtle 90 degrees to the right.
    */
    export function turnRight(): LuaMultiReturn<[boolean, string?]>;

    /*
        Attempt to break the block in front of the turtle.
    */
    export function dig(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Attempt to break the block above the turtle. See dig for full details.
    */
    export function digUp(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Attempt to break the block below the turtle. See dig for full details.
    */
    export function digDown(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Place a block or item into the world in front of the turtle.
    */
    export function place(text?: string): LuaMultiReturn<[boolean, string?]>;

    /*
        Place a block or item into the world above the turtle.
    */
    export function placeUp(text?: string): LuaMultiReturn<[boolean, string?]>;

    /*
        Place a block or item into the world below the turtle.
    */
    export function placeDown(text?: string): LuaMultiReturn<[boolean, string?]>;

    /*
        Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory.
    */
    export function drop(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Drop the currently selected stack into the inventory above the turtle, or as an item into the world if there is no inventory.
    */
    export function dropUp(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Drop the currently selected stack into the inventory below the turtle, or as an item into the world if there is no inventory.
    */
    export function dropDown(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Change the currently selected slot.
    */
    export function select(slot: number): boolean;

    /*
        Get the number of items in the given slot.
    */
    export function getItemCount(slot?: number): number;

    /*
        Get the remaining number of items which may be stored in this stack.
    */
    export function getItemSpace(slot?: number): number;

    /*
        Check if there is a solid block in front of the turtle. In this case, solid refers to any non-air or liquid block.
    */
    export function detect(): boolean;

    /*
        Check if there is a solid block above the turtle. In this case, solid refers to any non-air or liquid block.
    */
    export function detectUp(): boolean;

    /*
        Check if there is a solid block below the turtle. In this case, solid refers to any non-air or liquid block.
    */
    export function detectDown(): boolean;

    /*
        Check if the block in front of the turtle is equal to the item in the currently selected slot.
    */
    export function compare(): boolean;

    /*
        Check if the block above the turtle is equal to the item in the currently selected slot.
    */
    export function compareUp(): boolean;

    /*
        Check if the block below the turtle is equal to the item in the currently selected slot.
    */
    export function compareDown(): boolean;

    /*
        Attack the entity in front of the turtle.
    */
    export function attack(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Attack the entity above the turtle.
    */

    export function attackUp(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Attack the entity below the turtle.
    */
    export function attackDown(side?: Side): LuaMultiReturn<[boolean, string?]>;

    /*
        Suck an item from the inventory in front of the turtle, or from an item floating in the world.
    */
    export function suck(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Suck an item from the inventory above the turtle, or from an item floating in the world.
    */
    export function suckUp(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Suck an item from the inventory below the turtle, or from an item floating in the world.
    */
    export function suckDown(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Get the maximum amount of fuel this turtle currently holds.
    */
    export function getFuelLevel(): number | "unlimited";

    /*
        Refuel this turtle.
    */
    export function refuel(count?: number): LuaMultiReturn<[boolean, string?]>;

    /*
        Compare the item in the currently selected slot to the item in another slot.
    */
    export function compareTo(slot: number): boolean;

    /*
        Move an item from the selected slot to another one.
    */
    export function transferTo(slot: number, count?: number): boolean;

    /*
        Get the currently selected slot.
    */
    export function getSelectedSlot(): number;

    /*
        Get the maximum amount of fuel this turtle can hold.
    */
    export function getFuelLimit(): number | "unlimited";

    /*
        Equip (or unequip) an item on the left side of this turtle.
    */
    export function equipLeft(): LuaMultiReturn<[boolean, string?]>;

    /*
        Equip (or unequip) an item on the right side of this turtle.
    */
    export function equipRight(): LuaMultiReturn<[boolean, string?]>;

    /*
        Get information about the block in front of the turtle.
    */
    export function inspect(): LuaMultiReturn<[boolean, InspectResult?]>;

    /*
        Get information about the block above the turtle.
    */
    export function inspectUp(): LuaMultiReturn<[boolean, InspectResult?]>;

    /*
        Get information about the block below the turtle.
    */
    export function inspectDown(): LuaMultiReturn<[boolean, InspectResult?]>;

    /*
        Get detailed information about the items in the given slot.
    */
    export function getItemDetail(slot?: number, detailed?: boolean): ItemDetail | undefined;


    export enum Side {
        left = "left",
        right = "right",
    }

    export interface InspectResult {
        name: string;
        state: LuaTable;
        tags: LuaTable;
    }

    export interface ItemDetail {
        name: string;
        count: number;
    }

}


/*
craft([limit=64])
Source
Craft a recipe based on the turtle's inventory. The turtle's inventory should set up like a crafting grid. For instance, to craft sticks, slots 1 and 5 should contain planks. All other slots should be empty, including those outside the crafting "grid".

Parameters
limit? number = 64 The maximum number of crafting steps to run.
Returns
true If crafting succeeds.
Or
false If crafting fails.
string A string describing why crafting failed.
Throws
When limit is less than 1 or greater than 64.

Changes
New in version 1.4
native
Source
🛈 DEPRECATED
Historically this table behaved differently to the main turtle API, but this is no longer the case. You should not need to use it.

The builtin turtle API, without any generated helper functions.

forward()
Source
Move the turtle forward one block.

Returns
boolean Whether the turtle could successfully move.
string | nil The reason the turtle could not move.
back()
Source
Move the turtle backwards one block.

Returns
boolean Whether the turtle could successfully move.
string | nil The reason the turtle could not move.
up()
Source
Move the turtle up one block.

Returns
boolean Whether the turtle could successfully move.
string | nil The reason the turtle could not move.
down()
Source
Move the turtle down one block.

Returns
boolean Whether the turtle could successfully move.
string | nil The reason the turtle could not move.
turnLeft()
Source
Rotate the turtle 90 degrees to the left.

Returns
boolean Whether the turtle could successfully turn.
string | nil The reason the turtle could not turn.
turnRight()
Source
Rotate the turtle 90 degrees to the right.

Returns
boolean Whether the turtle could successfully turn.
string | nil The reason the turtle could not turn.
dig([side])
Source
Attempt to break the block in front of the turtle.

This requires a turtle tool capable of breaking the block. Diamond pickaxes (mining turtles) can break any vanilla block, but other tools (such as axes) are more limited.

Parameters
side? string The specific tool to use. Should be "left" or "right".
Returns
boolean Whether a block was broken.
string | nil The reason no block was broken.
Changes
Changed in version 1.6: Added optional side argument.
digUp([side])
Source
Attempt to break the block above the turtle. See dig for full details.

Parameters
side? string The specific tool to use.
Returns
boolean Whether a block was broken.
string | nil The reason no block was broken.
Changes
Changed in version 1.6: Added optional side argument.
digDown([side])
Source
Attempt to break the block below the turtle. See dig for full details.

Parameters
side? string The specific tool to use.
Returns
boolean Whether a block was broken.
string | nil The reason no block was broken.
Changes
Changed in version 1.6: Added optional side argument.
place([text])
Source
Place a block or item into the world in front of the turtle.

"Placing" an item allows it to interact with blocks and entities in front of the turtle. For instance, buckets can pick up and place down fluids, and wheat can be used to breed cows. However, you cannot use place to perform arbitrary block interactions, such as clicking buttons or flipping levers.

Parameters
text? string When placing a sign, set its contents to this text.
Returns
boolean Whether the block could be placed.
string | nil The reason the block was not placed.
Changes
New in version 1.4
placeUp([text])
Source
Place a block or item into the world above the turtle.

Parameters
text? string When placing a sign, set its contents to this text.
Returns
boolean Whether the block could be placed.
string | nil The reason the block was not placed.
See also
place For more information about placing items.
Changes
New in version 1.4
placeDown([text])
Source
Place a block or item into the world below the turtle.

Parameters
text? string When placing a sign, set its contents to this text.
Returns
boolean Whether the block could be placed.
string | nil The reason the block was not placed.
See also
place For more information about placing items.
Changes
New in version 1.4
drop([count])
Source
Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory.

Parameters
count? number The number of items to drop. If not given, the entire stack will be dropped.
Returns
boolean Whether items were dropped.
string | nil The reason the no items were dropped.
Throws
If dropping an invalid number of items.

See also
select
Changes
New in version 1.31
dropUp([count])
Source
Drop the currently selected stack into the inventory above the turtle, or as an item into the world if there is no inventory.

Parameters
count? number The number of items to drop. If not given, the entire stack will be dropped.
Returns
boolean Whether items were dropped.
string | nil The reason the no items were dropped.
Throws
If dropping an invalid number of items.

See also
select
Changes
New in version 1.4
dropDown([count])
Source
Drop the currently selected stack into the inventory below the turtle, or as an item into the world if there is no inventory.

Parameters
count? number The number of items to drop. If not given, the entire stack will be dropped.
Returns
boolean Whether items were dropped.
string | nil The reason the no items were dropped.
Throws
If dropping an invalid number of items.

See also
select
Changes
New in version 1.4
select(slot)
Source
Change the currently selected slot.

The selected slot is determines what slot actions like drop or getItemCount act on.

Parameters
slot number The slot to select.
Returns
true When the slot has been selected.
Throws
If the slot is out of range.

See also
getSelectedSlot
getItemCount([slot])
Source
Get the number of items in the given slot.

Parameters
slot? number The slot we wish to check. Defaults to the selected slot.
Returns
number The number of items in this slot.
Throws
If the slot is out of range.

getItemSpace([slot])
Source
Get the remaining number of items which may be stored in this stack.

For instance, if a slot contains 13 blocks of dirt, it has room for another 51.

Parameters
slot? number The slot we wish to check. Defaults to the selected slot.
Returns
number The space left in in this slot.
Throws
If the slot is out of range.

detect()
Source
Check if there is a solid block in front of the turtle. In this case, solid refers to any non-air or liquid block.

Returns
boolean If there is a solid block in front.
detectUp()
Source
Check if there is a solid block above the turtle. In this case, solid refers to any non-air or liquid block.

Returns
boolean If there is a solid block above.
detectDown()
Source
Check if there is a solid block below the turtle. In this case, solid refers to any non-air or liquid block.

Returns
boolean If there is a solid block below.
compare()
Source
Check if the block in front of the turtle is equal to the item in the currently selected slot.

Returns
boolean If the block and item are equal.
Changes
New in version 1.31
compareUp()
Source
Check if the block above the turtle is equal to the item in the currently selected slot.

Returns
boolean If the block and item are equal.
Changes
New in version 1.31
compareDown()
Source
Check if the block below the turtle is equal to the item in the currently selected slot.

Returns
boolean If the block and item are equal.
Changes
New in version 1.31
attack([side])
Source
Attack the entity in front of the turtle.

Parameters
side? string The specific tool to use.
Returns
boolean Whether an entity was attacked.
string | nil The reason nothing was attacked.
Changes
New in version 1.4
Changed in version 1.6: Added optional side argument.
attackUp([side])
Source
Attack the entity above the turtle.

Parameters
side? string The specific tool to use.
Returns
boolean Whether an entity was attacked.
string | nil The reason nothing was attacked.
Changes
New in version 1.4
Changed in version 1.6: Added optional side argument.
attackDown([side])
Source
Attack the entity below the turtle.

Parameters
side? string The specific tool to use.
Returns
boolean Whether an entity was attacked.
string | nil The reason nothing was attacked.
Changes
New in version 1.4
Changed in version 1.6: Added optional side argument.
suck([count])
Source
Suck an item from the inventory in front of the turtle, or from an item floating in the world.

This will pull items into the first acceptable slot, starting at the currently selected one.

Parameters
count? number The number of items to suck. If not given, up to a stack of items will be picked up.
Returns
boolean Whether items were picked up.
string | nil The reason the no items were picked up.
Throws
If given an invalid number of items.

Changes
New in version 1.4
Changed in version 1.6: Added an optional limit argument.
suckUp([count])
Source
Suck an item from the inventory above the turtle, or from an item floating in the world.

Parameters
count? number The number of items to suck. If not given, up to a stack of items will be picked up.
Returns
boolean Whether items were picked up.
string | nil The reason the no items were picked up.
Throws
If given an invalid number of items.

Changes
New in version 1.4
Changed in version 1.6: Added an optional limit argument.
suckDown([count])
Source
Suck an item from the inventory below the turtle, or from an item floating in the world.

Parameters
count? number The number of items to suck. If not given, up to a stack of items will be picked up.
Returns
boolean Whether items were picked up.
string | nil The reason the no items were picked up.
Throws
If given an invalid number of items.

Changes
New in version 1.4
Changed in version 1.6: Added an optional limit argument.
getFuelLevel()
Source
Get the maximum amount of fuel this turtle currently holds.

Returns
number The current amount of fuel a turtle this turtle has.
Or
"unlimited" If turtles do not consume fuel when moving.
See also
getFuelLimit
refuel
Changes
New in version 1.4
refuel([count])
Source
Refuel this turtle.

While most actions a turtle can perform (such as digging or placing blocks) are free, moving consumes fuel from the turtle's internal buffer. If a turtle has no fuel, it will not move.

refuel refuels the turtle, consuming fuel items (such as coal or lava buckets) from the currently selected slot and converting them into energy. This finishes once the turtle is fully refuelled or all items have been consumed.

Parameters
count? number The maximum number of items to consume. One can pass 0 to check if an item is combustable or not.
Returns
true If the turtle was refuelled.
Or
false If the turtle was not refuelled.
string The reason the turtle was not refuelled.
Throws
If the refuel count is out of range.

Usage
Refuel a turtle from the currently selected slot.

Run ᐅ
local level = turtle.getFuelLevel()
if level == "unlimited" then error("Turtle does not need fuel", 0) end

local ok, err = turtle.refuel()
if ok then
  local new_level = turtle.getFuelLevel()
  print(("Refuelled %d, current level is %d"):format(new_level - level, new_level))
else
  printError(err)
end
Check if the current item is a valid fuel source.

Run ᐅ
local is_fuel, reason = turtle.refuel(0)
if not is_fuel then printError(reason) end
See also
getFuelLevel
getFuelLimit
Changes
New in version 1.4
compareTo(slot)
Source
Compare the item in the currently selected slot to the item in another slot.

Parameters
slot number The slot to compare to.
Returns
boolean If the two items are equal.
Throws
If the slot is out of range.

Changes
New in version 1.4
transferTo(slot [, count])
Source
Move an item from the selected slot to another one.

Parameters
slot number The slot to move this item to.
count? number The maximum number of items to move.
Returns
boolean If some items were successfully moved.
Throws
If the slot is out of range.

If the number of items is out of range.

Changes
New in version 1.45
getSelectedSlot()
Source
Get the currently selected slot.

Returns
number The current slot.
See also
select
Changes
New in version 1.6
getFuelLimit()
Source
Get the maximum amount of fuel this turtle can hold.

By default, normal turtles have a limit of 20,000 and advanced turtles of 100,000.

Returns
number The maximum amount of fuel a turtle can hold.
Or
"unlimited" If turtles do not consume fuel when moving.
See also
getFuelLevel
refuel
Changes
New in version 1.6
equipLeft()
Source
Equip (or unequip) an item on the left side of this turtle.

This finds the item in the currently selected slot and attempts to equip it to the left side of the turtle. The previous upgrade is removed and placed into the turtle's inventory. If there is no item in the slot, the previous upgrade is removed, but no new one is equipped.

Returns
true If the item was equipped.
Or
false If we could not equip the item.
string The reason equipping this item failed.
See also
equipRight
Changes
New in version 1.6
equipRight()
Source
Equip (or unequip) an item on the right side of this turtle.

This finds the item in the currently selected slot and attempts to equip it to the right side of the turtle. The previous upgrade is removed and placed into the turtle's inventory. If there is no item in the slot, the previous upgrade is removed, but no new one is equipped.

Returns
true If the item was equipped.
Or
false If we could not equip the item.
string The reason equipping this item failed.
See also
equipLeft
Changes
New in version 1.6
inspect()
Source
Get information about the block in front of the turtle.

Returns
boolean Whether there is a block in front of the turtle.
table | string Information about the block in front, or a message explaining that there is no block.
Usage
Run ᐅ
local has_block, data = turtle.inspect()
if has_block then
  print(textutils.serialise(data))
  -- {
  --   name = "minecraft:oak_log",
  --   state = { axis = "x" },
  --   tags = { ["minecraft:logs"] = true, ... },
  -- }
else
  print("No block in front of the turtle")
end
Changes
New in version 1.64
Changed in version 1.76: Added block state to return value.
inspectUp()
Source
Get information about the block above the turtle.

Returns
boolean Whether there is a block above the turtle.
table | string Information about the above below, or a message explaining that there is no block.
Changes
New in version 1.64
inspectDown()
Source
Get information about the block below the turtle.

Returns
boolean Whether there is a block below the turtle.
table | string Information about the block below, or a message explaining that there is no block.
Changes
New in version 1.64
getItemDetail([slot [, detailed]])
Source
Get detailed information about the items in the given slot.

Parameters
slot? number The slot to get information about. Defaults to the selected slot.
detailed? boolean Whether to include "detailed" information. When true the method will contain much more information about the item at the cost of taking longer to run.
Returns
nil | table Information about the given slot, or nil if it is empty.
Throws
If the slot is out of range.

Usage
Print the current slot, assuming it contains 13 dirt.

Run ᐅ
print(textutils.serialise(turtle.getItemDetail()))
-- => {
--  name = "minecraft:dirt",
--  count = 13,
-- }
See also
inventory.getItemDetail Describes the information returned by a detailed query.
*/