
const TEST_WP = [0,2];
const TEST_MD = [100,101];

function testFight()
{
    let cap = ranCaptain({side:999});
    let shipData = {
        name:randomName()+"号",
        bMaxStrc:10+Math.floor(Math.random()*50),
        bMaxShld:10+Math.floor(Math.random()*50),
        wpNum:5,
        wpOpen:2,
        mdOpen:3,
        mdNum:7,
        roomSize:50,
        shieldRec:20,
        initCost:50,
        maxLvl:1,
        lvl:1,
    };

    let wpOpen = 1 + Math.floor(Math.random()*3);
    shipData.wp = new Array(wpOpen);
    shipData.wpOpen = wpOpen;
    for(let i=0;i<wpOpen;i++)
    {
        shipData.wp[i] = TEST_WP[Math.floor((Math.random()*TEST_WP.length))];
    }

    let mdOpen = 1 + Math.floor(Math.random()*3);

    shipData.md = new Array(wpOpen);
    shipData.mdOpen = mdOpen;
    for(let i=0;i<mdOpen;i++)
    {
        shipData.md[i] = TEST_MD[Math.floor((Math.random()*TEST_MD.length))];
    }

    createShipForCap(cap,shipData);

    let staff = Math.floor(Math.random()*3);
    if(staff>0)
    {
        for(let i=0;i<staff;i++)
        {
            let p = RanPerson();
            addStaff(cap,p);
        }
    }

    for(let i=0;i<cap.ship.wp.length;i++)
    {
        if(cap.ship.wp[i].open==true&&cap.ship.wp[i].staff==-1&&cap.validStaff>0)
        {
            let staffIdx=findValidStaff(cap);
            if(staffIdx!=-1)
            {
                AssignJob(cap,'wp',cap.ship.wp[i].idx-1,staffIdx);
            }
        }
    }
    playerShipFightWith(cap.ship);
    addHour(2);
}

function createPlayer()
{
    playerData = createCap({
        type:1,
        name:"Jacky Chen",
        gold:100,
        side:0,
        maxStaff:MAX_STAFF,
    });

    createShipForCap(playerData,{
        name:"佛尔斯特号",
        bMaxStrc:100,
        bMaxShld:20,
        wpNum:5,
        wpOpen:2,
        mdOpen:3,
        mdNum:7,
        roomSize:50,
        shieldRec:20,
        initCost:20,
        maxLvl:10,
        lvl:1,
        wp:[0,2],
    });

    playerData.ship.addItem(1,100);
    playerData.ship.addItem(100,1);
    playerData.ship.addItem(101,1);
    playerData.ship.addItem(0,3);
}

function gameInit()
{
    createPlayer()
}

gameInit();