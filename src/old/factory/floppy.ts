import { saveFile, updateStartup } from "../utils/files";

const minFuelLevel = 800

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
