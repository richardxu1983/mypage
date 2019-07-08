
//初始化舰长数据
function initCaptain(cap,data)
{
    cap.name = data.name;
    cap.gold = data.gold||0;
    cap.type = data.type;
    cap.side = 0;
    cap.addGold = (g)=>{
        cap.gold+=g;
        cap.gold = cap.gold<0?0:Math.floor(cap.gold);
    }
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