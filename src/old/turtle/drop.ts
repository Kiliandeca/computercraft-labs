const itemsToDrop = [
    'minecraft:cobblestone',
    'minecraft:diorite',
    'minecraft:dirt',
    'minecraft:andesite',
    'minecraft:granite',
    'minecraft:gravel',
    'minecraft:netherrack',
]

export function drop(){
    console.log("Droping");

    turtle.digDown()
    turtle.down()
    turtle.digDown()
    
    for (const i of $range(1, 16)) {
        const result = turtle.getItemDetail(i as turtle.TurtleSlot)
        
        if (result && itemsToDrop.includes(result.name)) {
            turtle.select(i as turtle.TurtleSlot)
            turtle.dropDown()
        }
    }

    turtle.select(1)

    turtle.up()
}