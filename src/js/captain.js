
//初始化舰长数据
function initCaptain(cap,data)
{
    cap.name = data.name;
    cap.type = data.type;
    cap.side = 0;
}

function createCapWithShip(shipdata,capdata)
{
    var cap = {};
    initCaptain(cap,capdata);
    cap.ship = createShip(shipdata,cap);
    initStaff(cap,capdata.stuffNum);
    for(const wpId of shipdata.wp)
    {
        cap.ship.loadWp(wpId);
    }
    cap.money = capdata.money;
    return cap;
}