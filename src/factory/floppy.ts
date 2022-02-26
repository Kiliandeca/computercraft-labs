import { saveFile, updateStartup } from "../utils/files";

const minFuelLevel = 800i

const floppy = `
if not turtle then
    shell.run("startup")
end

-- Get startup from http
--[[
if not fs.exists("startup") then
    io.output("startup")
    io.write(http.get("http://90.65.50.45:8080/dist/output.lua").readAll())
end
--]]

-- Get startup from floppy
if fs.exists("disk/startup") then
    fs.delete('startup')
    fs.copy('disk/output', 'startup')
end

local fuelLevel = turtle.getFuelLevel()
if  fuelLevel < ${minFuelLevel} then
    turtle.suckDown(10)
    if turtle.getItemCount() < 10 then
        turtle.dropDown()
        error("Not enough items")
    end

    if not turtle.refuel() then
        error("Invalid item")
    end
end
redstone.setOutput("front", true)
print("Ready")
`

export function updateFloppy(){
    for (const side of peripheral.getNames()) {    
        if (peripheral.isPresent(side)) {
            if (peripheral.getType(side) === 'drive') {
                const diskDrive = peripheral.wrap(side) as peripheral.Drive
                if (diskDrive.isDiskPresent()){
                    console.log(`[I] Updating "disk/startup"`);
                    saveFile('disk/startup', floppy)

                    // Update itself before copying program to disk
                    console.log(`[I] Updating Itself and "disk/output"`);
                    updateStartup()
                    shell.run('delete disk/output')
                    fs.copy('startup', 'disk/output')
                }
            }
        }
    }
}