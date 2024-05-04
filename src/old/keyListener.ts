import { Commands, UpdateOverRednetCommand, Command, isCommand } from './commands';
import { factoryMain } from './factory/installer';
import { drop } from './turtle/drop';
import { looting } from './turtle/looting';
import { mine } from './turtle/mine'
import { keyToMovementMap, movementMap } from './turtle/movement';
import { filesToInstall, getRemoteFileContent, installAllFiles, saveFile, updateStartup } from './utils/files';
import { runUntileBackspace, waitForBackspace } from './utils/keys';

export function listenKeys() {

    while (true) {
        const [event, keycode] = os.pullEvent('key')

        const key = keys.getName(keycode)       
        if (key) {
            const command = getCommand(key)

            if (command) {
                // Pocket
                if (pocket) {

                    switch (command.commandName) {
                        case Commands.BROADCAST_UPDATE:
                            // Get the files, update itself, broadcast the files to others over Rednet and reboot
                            console.log("[I] Updating itself and broadcast update");
                            
                            const filesAndContent = filesToInstall.map(file => {
                                return { 
                                    name: 'startup',
                                    content: getRemoteFileContent(`output.lua`),
                                }
                            })

                            filesAndContent.forEach(file => saveFile(file.name, file.content))
                            const updateCommand: UpdateOverRednetCommand = {
                                commandName: Commands.UPDATE_OVER_REDNET,
                                params: {
                                    files: filesAndContent
                                }
                            }

                            rednet.broadcast(updateCommand)
                            break;
                        case Commands.TURN_NEIGHBOUR_ON:
                            console.log("[I] Press backspace to stop Broadcasting");
                            runUntileBackspace(() => {
                                while (true) {
                                    rednet.broadcast(command)
                                    sleep(0.2)
                                }
                            })
                            rednet.broadcast("", "stop_turn_on")
                            break;
                        case Commands.REBOOT:
                            rednet.broadcast(command)
                            os.reboot()
                        default:
                            console.log(`Broadcasting: ${command.commandName}`);
                            rednet.broadcast(command)
                            break;
                    }
                // Turtle
                } else if (turtle) {
                    handleCommand(command)
                
                // Computer
                } else {
                    switch (command.commandName) {
                        case Commands.FACTORY:
                            factoryMain()
                            break;
                    
                        default:
                            handleCommand(command)
                            break;
                    }
                }

                
            }
            

        }

    }
}

function getCommand(key: string): Command | void {
    switch (key) {
        case 'r':
            return { commandName: Commands.REBOOT }
        case 'm':
            console.log("Please enter distance: ");
            const input = io.read()
            if (!input){
                console.log('Bad input canceling');
                return;
            }

            const distance = Number(input)
            return {
                commandName: Commands.MINE,
                params: {
                    distance
                }
            }
        case 'g':
            return {
                commandName: Commands.MINE,
                params: {
                    distance: 50
                }
            }
        case 'd':
            return { commandName: Commands.DROP }
        case 'y':
            return { commandName: Commands.UPDATE_OVER_HTTP }
        case 'u':
            return { commandName: Commands.BROADCAST_UPDATE }
        case 'i':
            return { commandName: Commands.FACTORY }
        case 'o':
            return { commandName: Commands.TURN_NEIGHBOUR_ON }
        case 'l':
            return { commandName: Commands.LOOTING }
        }

    const movement = keyToMovementMap.get(key);
    if (movement) {
        return {
            commandName: Commands.MOVE,
            params: {
                movement
            }
        }
    }

    console.log('No command for key: '+key);
    
    return

}

export function listenModem() {
    console.log('Listening rednet..');

    while (true) {
        const [computerID, message] = rednet.receive()
        
        switch (message) {
            case 'ping':
                console.log("received ping");
                break;
            default:
                break;
        }

        if (isCommand(message)) {
            console.log(`Received command: ${message.commandName} over rednet`);
            handleCommand(message)
            
        }
    }
}

function handleCommand(command: Command) {
    switch (command.commandName) {
        case Commands.MINE:
            mine(command.params.distance)
            break;
        case Commands.DROP:
            drop()
            break;
        case Commands.REBOOT:
            os.reboot()
            break;
        case Commands.MOVE:
            const movementFunction = movementMap.get(command.params.movement)
            if(movementFunction){
                movementFunction()
            }
            break;
        case Commands.UPDATE_OVER_HTTP:
            updateStartup();
            os.reboot()
            break;
        case Commands.UPDATE_OVER_REDNET:
            command.params.files.forEach(file => {
                saveFile(file.name, file.content)
            })
            os.reboot()
            break;
        case Commands.FACTORY:
            runUntileBackspace(factoryMain)
            break;
        case Commands.TURN_NEIGHBOUR_ON:
                turtle.turnRight()
                const periph = peripheral.wrap("front")
                if (periph){
                    (periph as peripheral.Computer).turnOn()
                }
                turtle.turnLeft()
                rednet.receive('stop_turn_on')
            break;
        case Commands.LOOTING:
            looting()
            break;
        default:
            console.log(`[W] Don't know what to do with command ${command.commandName}`);
            break;
    }
}


