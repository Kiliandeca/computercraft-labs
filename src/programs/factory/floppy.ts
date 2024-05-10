export const getFloppy = (minFuelLevel: number) => `
-- The factory computer need to run it's own startup
if not turtle then
    print("Not a turtle")
    shell.run("startup")
end

-- Get startup from floppy
if fs.exists("disk/startup") then
    fs.delete('startup')
    fs.copy('disk/output', 'startup')
end

-- Set the to program to resume
resume = fs.open('resume', 'w')
resume.write('factoryTurtle')
resume.close()


io.output("startup")
io.write(http.get("http://90.5.172.140:8080/output.lua").readAll())

shell.run("startup")
`