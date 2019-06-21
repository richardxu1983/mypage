
var playerData = {};

function createShip(data)
{
    var ship = new Object;
    ship.name = data.name;
    ship.structure = data.structure;
    ship.shield = data.shield;
    ship.changeName = function(str)
    {
        this.name = str;
    }
    return ship;
}

playerData.mainShip = createShip({
    name:"firstShip",
    structure:100,
    shield:100,
});