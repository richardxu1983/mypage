
const TEST_WP = [0,2];
const TEST_MD = [100,101];

function testFight()
{
    let cap = ranCaptain({side:999});
    createShipForCap(cap,2,[0,2],[]);
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
        name:ranFullName(),
        gold:100,
        side:0,
        maxStaff:MAX_STAFF,
    });

    createShipForCap(playerData,1,[0,2],[]);
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