
var playerData = {};

var wpData = [];
wpData[0] = {
    id:0,
    name:"弹射炮",
    desc:"一种基本的炮类武器，宇宙中大多数的军火设施都可以造这种炮。",
    type:1,
    atk:15,
    speed:2,
    start:1,
};

function createShip(data)
{
    var ship = new Object;
    ship.name = data.name;
    ship.owner = 0;
    ship.structure = data.maxStructure;
    ship.maxStructure = data.maxStructure;
    ship.shield = data.maxShield;
    ship.maxShield = data.maxShield;
    ship.weaponNum = data.weaponNum;
    ship.moduleNum = data.moduleNum;
    ship.roomSize = data.roomSize;
    ship.roomOccupy = 0;
    ship.module = new Array(ship.moduleNum);
    ship.weapon = new Array(ship.weaponNum);
    ship.room = new Array(ship.roomSize);
    for(let i=0; i<ship.weapon.length;i++)
    {
        ship.weapon[i] = {
            idx:i+1,
            id:-1,
            name:"空",
        };
    }
    for(let i=0; i<ship.module.length;i++)
    {
        ship.module[i] = {
            idx:i+1,
            id:-1,
            name:"空",
        };
    }
    ship.changeName = function(str)
    {
        this.name = str;
    }
    return ship;
}

function loadWpByIdIdx(id,ship,idx)
{
    var pos = idx-1;
    if(ship.weapon[pos].id!=-1)
    {
        return;
    }
    ship.weapon[pos].id = id;
    ship.weapon[pos].name = wpData[id].name;
}

function unLoadWpByIdx(ship,idx)
{
    var pos = idx-1;
    ship.weapon[pos].id = -1;
    ship.weapon[pos].name = "空";
}

playerData.mainShip = createShip({
    name:"佛尔斯特号",
    maxStructure:100,
    maxShield:100,
    weaponNum:1,
    moduleNum:2,
    roomSize:50,
});

loadWpByIdIdx(0,playerData.mainShip,1);