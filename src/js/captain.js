
//初始化舰长数据
function initCaptain(cap,data)
{
    cap.name = data.name;
    cap.gold = data.gold||0;
    cap.side = data.side;
    cap.addGold = (g)=>{
        cap.gold+=g;
        cap.gold = cap.gold<0?0:Math.floor(cap.gold);
    }
    cap.money = data.money||0;
    cap.ship=-1;
    cap.maxStaff = data.maxStaff||0;
    cap.staffNum = 0;
    cap.validStaff = 0;
    initStaff(cap);
}

function createCap(data)
{
    let cap = {};
    initCaptain(cap,data);
    return cap;
}

function ranCaptain(data)
{
    let d = {
        name:ranFullName(),
        side:data.side,
        maxStaff:5 + Math.floor(Math.random()*(MAX_STAFF - 10)),
    };
    let cap = createCap(d);
    return cap;
}

function createShipForCap(cap,shipdata)
{
    cap.ship = createShip(shipdata,cap);
    if(shipdata.wp)
    {
        for(const wpId of shipdata.wp)
        {
            cap.ship.loadWp(wpId);
        }
    }
    
    if(shipdata.md)
    {
        for(const mdId of shipdata.md)
        {
            cap.ship.loadMd(mdId);
        }
    }
    
}
