
var playerData = {};

function createShip(data)
{
    var ship = new Object;
    ship.name = data.name;
    ship.structure = data.maxStructure;
    ship.maxStructure = data.maxStructure;
    ship.shield = data.maxShield;
    ship.maxShield = data.maxShield;
    ship.weaponNum = data.weaponNum;
    ship.moduleNum = data.moduleNum;
    ship.module = new Array(ship.moduleNum);
    ship.weapon = new Array(ship.weaponNum);
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

playerData.mainShip = createShip({
    name:"佛尔斯特号",
    maxStructure:100,
    maxShield:100,
    weaponNum:1,
    moduleNum:2,
});