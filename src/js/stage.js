var stage = {
    idx:0,
    left:-1,
    card:new Array(6),
};

const STAGE_CNT = [20,20,20,20];

function stageInit(lv)
{
    stage.lv = lv;
    stage.left = STAGE_CNT[stage.lv];
    stage.on = 0;
    for(let i=0;i<stage.card.length;i++)
    {
        stage.card[i] = 
        {
            type:-1,
            cap:-1,
            mine:-1,
            unit:-1,
            choice:[],
        }
    }
}
stageInit();

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
        stage.card[idx] = 
        {
            type:1,
            cap:cap,
            name:cap.ship.name,
            choice:["战斗","逃跑"],
        }
    }
    else if(ran>=50&&ran<80)
    {
        stage.card[idx] = 
        {
            type:2,
            name:"矿石带",
            mine:30,
            choice:["采矿"],
        }
    }
    else
    {
        stage.card[idx] = 
        {
            type:99,
            name:"虚空",
            choice:["探索"],
        }
    }
}

function stgClear(idx)
{
    stage.card[idx].type = -1;
    stage.card[idx].cap = -1;
}

function onStgCard(idx)
{
    let res;
    if(stage.card[idx]==-1) return -1;
    if(stage.card[idx].type==1)
    {
        res = plyFtWith(stage.card[idx].cap);
        if(res==1)
        {
            stage.on--;
            stgClear(idx);
            stgGen(idx);
            return res;
        }
    }
    else if(stage.card[idx].type==2)
    {
        playerData.ship.addItem(1,10);
        stgClear(idx);
        stgGen(idx);
    }
    return res;
}