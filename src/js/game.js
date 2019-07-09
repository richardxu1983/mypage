
function testFight()
{
    let test = createShip({
        name:"海盗号",
        bMaxStrc:20,
        bMaxShld:20,
        wpNum:1,
        mdNum:0,
        roomSize:0,
        maxStaff:1,
    },-1);
    
    test.loadWp(0);

    playerShipFightWith(test);

    addHour(2);
}

function gameInit()
{

    playerData = createCapWithShip(
        {
            name:"佛尔斯特号",
            bMaxStrc:100,
            bMaxShld:20,
            wpNum:5,
            wpOpen:2,
            mdOpen:3,
            mdNum:7,
            roomSize:50,
            maxStaff:10,
            shieldRec:20,
            wp:[0,2],
        },
        {
            type:1,
            name:"Jacky Chen",
            gold:100,
            side:1,
            stuffNum:MAX_STAFF,
        });

    playerData.ship.addItem(1,100);
    playerData.ship.addItem(100,1);
    playerData.ship.addItem(101,1);
    playerData.ship.addItem(0,3);
}

gameInit();