import { TurtleMovement } from './turtle/movement';

export type Command =
    MineCommand 
    | DropCommand 
    | RebootCommand
    | MoveCommand 
    | UpdateOverHTTPCommand
    | UpdateOverRednetCommand
    | BroadCastUpdateCommand 
    | FactoryCommand
    | TurnNeighbourOnCommand
    | LootingCommand

export function isCommand(command: any): command is Command {
    return 'commandName' in command;
}

export enum Commands {
    MINE = 'mine',
    DROP = 'drop',
    REBOOT = 'reboot',
    MOVE = 'move',
    UPDATE_OVER_HTTP = 'update_over_http',
    BROADCAST_UPDATE = 'broadcast_update',
    UPDATE_OVER_REDNET = 'update_over_rednet',
    FACTORY = 'factory',
    TURN_NEIGHBOUR_ON = 'turn_neighbour_on',
    LOOTING = 'looting',
}

interface MineCommand {
    commandName: Commands.MINE;
    params: {
        distance: number;
    };
}
interface DropCommand {
    commandName: Commands.DROP;
}
interface RebootCommand {
    commandName: Commands.REBOOT;
}
interface MoveCommand {
    commandName: Commands.MOVE;
    params: {
        movement: TurtleMovement;
    };
}
interface UpdateOverHTTPCommand {
    commandName: Commands.UPDATE_OVER_HTTP;
}
interface BroadCastUpdateCommand {
    commandName: Commands.BROADCAST_UPDATE;
}
export interface UpdateOverRednetCommand {
    commandName: Commands.UPDATE_OVER_REDNET;
    params: {
        files: Array<{
            name: string;
            content: string;
        }>;
    };
}

interface FactoryCommand {
    commandName: Commands.FACTORY
}

interface TurnNeighbourOnCommand {
    commandName: Commands.TURN_NEIGHBOUR_ON
    params?: {
        side: 'right' | 'left'
    }
}

interface LootingCommand {
    commandName: Commands.LOOTING
}
