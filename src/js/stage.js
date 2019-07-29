var stage = {
    idx:0,
    lv:-1,
    left:-1,
    dayLeft:-1,
    name:"第三殖民星球",
    task:1,
    taskNum:0,
    card:new Array(6),
};

for(let i=0;i<stage.card.length;i++)
{
    stage.card[i] = 
    {
        idx:i,
        type:-1,
        cap:-1,
        mine:-1,
        unit:-1,
        choice:[],
    }
}

const STAGE_CNT = [20,20,20,20];

function stageInit(lv,taskId)
{
    stage.lv = lv;
    stage.left = STAGE_CNT[stage.lv];
    stage.on = 0;
    stage.dayLeft = TASK_DATA[taskId].tLimit;
    stage.task = taskId;
    stgGenAll();
}

function stgGenAll()
{
    for(let i=0;i<stage.card.length;i++)
    {
        stgGen(i);
    }
}

function stgGen(idx)
{
    if(stage.left<=0) return;
    stage.on++;
    stage.left--;
    let ran = Math.random()*100;

    if(ran>=0&&ran<50)
    {
        let cap = ranCptWithShip({side:999},2);
        stage.card[idx].type=1;
        stage.card[idx].cap=cap;
        stage.card[idx].name=cap.ship.name;
        stage.card[idx].choice=["战斗","逃跑"];
        stage.card[idx].src="c002";
    }
    else if(ran>=50&&ran<80)
    {
        stage.card[idx].type=2;
        stage.card[idx].name="矿石带";
        stage.card[idx].mine=100;
        stage.card[idx].choice=["采矿"];
        stage.card[idx].src="c001";

    }
    else
    {
        stage.card[idx].type=99;
        stage.card[idx].name="虚空";
        stage.card[idx].choice=["探索"];
        stage.card[idx].src="c003";
    }
    //postData(app.stg,idx,stage.card[idx]);
}

function stgStep()
{
    stage.dayLeft--;
    if(stage.dayLeft<=0)
    {
        //任务失败
        stage.dayLeft=0;
    }
}

function taskChkKill(cap)
{
    let ship = cap.ship;
    let ship_id = ship.id;
    if(TASK_DATA[stage.task].type==1)
    {
        if(TASK_DATA[stage.task].tParam==ship_id)
        {
            stage.taskNum++;
            if(stage.taskNum>=TASK_DATA[stage.task].nParam)
            {
                //任务完成
                return 1;
            }
        }
    }
    return 0;
}

function stgClear(idx)
{
    
    stage.card[idx].type = -1;
    stage.card[idx].cap = -1;
    postData(app.stg,idx,stage.card[idx]);
}

function onStgCard(idx,choice)
{
    let res;
    let chk;
    if(stage.card[idx]==-1) return -1;
    
    if(stage.card[idx].type==1)
    {
        addHour(MAX_HOUR/4);
        res = plyFtWith(stage.card[idx].cap);
        if(res==1)
        {
            chk = taskChkKill(stage.card[idx].cap);
            stage.on--;
            stgClear(idx);
            if(chk==0)
            {
                stgGen(idx);
            }
            return res;
        }
    }
    else if(stage.card[idx].type==2)
    {
        addHour(MAX_HOUR/3);
        let m = playerData.ship.mine();
        printMsg(printTimeC()+"你开始采矿");
        if(m<stage.card[idx].mine)
        {
            stage.card[idx].mine-=m;
            playerData.ship.addItem(1,m,1);
            postData(app.stg,idx,stage.card[idx]);
        }
        else
        {
            playerData.ship.addItem(1,stage.card[idx].mine,1);
            stgClear(idx);
            stgGen(idx);
        }
    }
    else if(stage.card[idx].type==99)
    {
        addHour(MAX_HOUR/2);
        printMsg(printTimeC()+"你进行了探索");
        stgClear(idx);
        stgGen(idx);
    }
    return res;
}