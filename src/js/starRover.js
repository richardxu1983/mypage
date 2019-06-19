
var playerData = {};

function createShip(data)
{
    var ship = new Object;
    ship.name = data.name;
    ship.changeName = function(str)
    {
        this.name = str;
    }
    return ship;
}

playerData.mainShip = createShip({
    name:"firstShip"
});