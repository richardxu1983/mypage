
function testFight()
{
    let test = createShip({
        name:"海盗号",
        maxStructure:20,
        maxShield:20,
        weaponNum:1,
        moduleNum:0,
        roomSize:0,
        maxStaff:1,
    },-1);
    
    test.loadWp(0);

    playerShipFightWith(test);

    addHour();
}

function gameInit()
{

    playerData = createCapWithShip(
        {
            name:"佛尔斯特号",
            maxStructure:100,
            maxShield:20,
            weaponNum:2,
            moduleNum:2,
            roomSize:50,
            maxStaff:10,
            wp:[0,2],
        },
        {
            type:1,
            name:"Jacky Chen",
            money:100,
            side:1,
            stuffNum:MAX_STAFF,
        });

    playerData.ship.addItem(1,100);
}

gameInit();