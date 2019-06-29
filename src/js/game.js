
function testFight()
{
    let test = createShip({
        name:"海盗号",
        maxStructure:50,
        maxShield:50,
        weaponNum:1,
        moduleNum:0,
        roomSize:0,
        maxStaff:1,
    },999,-1);
    
    test.loadWp(0);

    playerShipFightWith(test);

    addHour();
}

function gameInit()
{

    playerData = createCapWithShip(
        {
            name:"佛尔斯特号",
            maxStructure:1000,
            maxShield:1,
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
            stuffNum:MAX_STAFF,
        });

    playerData.ship.addItem(1,100);
}

gameInit();