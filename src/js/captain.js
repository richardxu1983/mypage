
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
    cap.species = data.species;
    cap.career = data.career;
    cap.gender = data.gender;
    initStaff(cap);
    cap.validStaff = (p)=>
    {
        let idx = -1;
        for(let i=0;i<cap.maxStaff;i++)
        {
            if(cap.staff[i].species!=-1&&cap.staff[i].jobIdx==-1&&cap.staff[i].career==p)
            {
                return cap.staff[i].idx;
            }
        }
        return idx;
    };

    cap.ctVldStf = (p)=>
    {
        let n = 0;
        for(let i=0;i<cap.maxStaff;i++)
        {
            if(cap.staff[i].species!=-1&&cap.staff[i].jobIdx==-1&&cap.staff[i].career==p)
            {
                n++;
            }
        }
        return n;
    }
}

function createCap(data)
{
    let cap = {};
    initCaptain(cap,data);
    return cap;
}

function ranCaptain(data)
{
    let d = RanPerson({side:data.side});
    d.maxStaff = 5 + Math.floor(Math.random()*(MAX_STAFF - 10));
    d.gold = data.gold||0;
    let cap = createCap(d);
    return cap;
}

function ranCptWithShip(data,id)
{
    let d = RanPerson({side:data.side});
    d.maxStaff = 5 + Math.floor(Math.random()*(MAX_STAFF - 10));
    d.gold = data.gold||0;
    let cap = createCap(d);
    cap.ship = createShip(cap,id);
    return cap;
}

function createShipForCap(cap,id)
{
    cap.ship = createShip(cap,id);
}
