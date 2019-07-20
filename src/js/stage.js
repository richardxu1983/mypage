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
        stage.card[idx] = 
        {
            type:1,
            cap:ranCptWithShip({side:999},2),
        }
    }
    else if(ran>=50&&ran<80)
    {
        stage.card[idx] = 
        {
            type:2,
            mine:30,
        }
    }
    else
    {
        stage.card[idx] = 
        {
            type:99,
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
            return res;
        }
    }
    else if(stage.card[idx].type==2)
    {
        
    }
    return res;
}