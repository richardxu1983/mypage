

function initPlayerData(player,shipdata,capdata)
{
    player.ship = createShip(shipdata,0,player);
    initCaptainData(playerData,capdata);
    playerData.ship.loadWpByIdIdx(0,1);
    playerData.ship.loadWpByIdIdx(0,2);
    playerData.ship.addItem(1,100);
}

function gameInit()
{

    initPlayerData(playerData,
        {
            name:"佛尔斯特号",
            maxStructure:1000,
            maxShield:1,
            weaponNum:2,
            moduleNum:2,
            roomSize:50,
            maxStaff:10,
        },
        {
            type:1,
            name:"player"
        });
}

gameInit();