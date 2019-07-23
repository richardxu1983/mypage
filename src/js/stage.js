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
            idx:i,
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

function stgClear(idx)
{
    
    stage.card[idx].type = -1;
    stage.card[idx].cap = -1;
    postData(app.stg,idx,stage.card[idx]);
}

function onStgCard(idx,choice)
{
    let res;
    if(stage.card[idx]==-1) return -1;
    addHour(MAX_HOUR/2);
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
        let m = playerData.ship.mine();
        printMsg(printTimeC()+"你开始采矿");
        if(m<stage.card[idx].mine)
        {
            stage.card[idx].mine-=m;
            playerData.ship.addItem(1,m);
            postData(app.stg,idx,stage.card[idx]);
        }
        else
        {
            playerData.ship.addItem(1,stage.card[idx].mine);
            stgClear(idx);
            stgGen(idx);
        }
    }
    else if(stage.card[idx].type==99)
    {
        printMsg(printTimeC()+"你进行了探索");
        stgClear(idx);
        stgGen(idx);
    }
    return res;
}