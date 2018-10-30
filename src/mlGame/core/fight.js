import SK from '../../mlGame/data/skill.js'
import FTD from '../../mlGame/data/fightData.js'
var skl = SK.FSKL;
var $fsc = SK.FSC;
var $record = FTD.fightRecord;
var effT = SK.EFF;

var SIDE = [];
var MAX_ROUND=10;
SIDE[1]=[];
SIDE[2]=[];
var info = 
{
    log:"",
};


var Fight = {

    showPnl:{v:false},
    showClose:{v:false},
    over:true,

    start:function(data,callback)
    {
        if(!Fight.over)
            return;

        Fight.init(data,callback);

        Fight.beforeRound();

        Fight.roundStart();

        Fight.roundOver();
    },

    //初始化
    init:function(data,callback)
    {
        info = {log:"",};
        Fight.callback = callback==undefined?undefined:callback;
        Fight.callBackParam=0;
        Fight.round = 1;
        Fight.over = false;
        Fight.plySide = data.plySide;
        Fight.winSide=1;
        sideInit(1,data.left);
        sideInit(2,data.right);
    },

    //准备阶段
    beforeRound:function()
    {
        //重置行动
        sideReset();

        var u;//当前行动单位

        //不断寻找速度最快的单位
        while(true)
        {
            u = findHero();

            if(u==0)
                break;//找不到了
            else
                castZhiHui(u);  //找到了，释放指挥技能
        }
    },

    //战斗阶段
    roundStart:function()
    {
        while(Fight.round<=MAX_ROUND) 
        {
            addMsg("\n---- 第 "+Fight.round+" 回合开始 ----\n");
            Fight.round++;
            sideReset();
            Fight.over = Fight.ARound();
            if(Fight.over)
                break;
        }
    },

    //战斗结束
    roundOver:function()
    {
        addMsg("\n---- 战斗结束 ----");
        var u;
        for(var i=1;i<=2;i++)
        {
            for(var j=0;j<3;j++)
            {
                u = SIDE[i][j].u;
                if(u!=0)
                {
                    u.ftInit();
                }
            }
        }
        $record.log = info.log;

        if(Fight.callback)
        {
            Fight.callback();
        }
    },

    //一轮
    ARound:function()
    {
        var u;

        //不断寻找速度最快的单位
        while(true)
        {
            u = findHero();

            if(u==0)
                return false;  //找不到了
            else
            {
                if(Act(u)==1)  //找到了，单位行动，如果结束判断成立则结束
                    return true;
            }
        }
        return false;
    },

    closeUI:function()
    {
        Fight.showPnl.v=false;
    },

    showRecord:function()
    {
        Fight.showPnl.v=true;
        Fight.showClose.v = true;
    }
};

function addMsg(v)
{
    if(v!="")
    {
        info.log = info.log + v + "\n";
    }
}

function insertMsg(v)
{
    if(v!="")
    {
        info.log = v + "\n" + info.log;
    }
}

function sideInit(s,v)
{
    var pos;
    var t;

    for(var i=0;i<3;i++)
    {
        SIDE[s][i]={};
        SIDE[s][i].u = v[i];
        if(s==1)
        {
            pos=-1*i+3;
            t=2;
        }
        else
        {
            pos=i+4;
            t=1;
        }
        SIDE[s][i].pos = pos;
        SIDE[s][i].done = false;   //本轮是否已经行动
        if(SIDE[s][i].u!=0)
        {
            SIDE[s][i].u.side = s;
            SIDE[s][i].u.t = t;
            SIDE[s][i].u.idx = i;
            SIDE[s][i].u.ftOn = true;
            SIDE[s][i].u.ftInit();
        }
    }
}

function sideReset()
{
    var u;
    for(var i=1;i<=2;i++)
    {
        for(var j=0;j<3;j++)
        {
            u = SIDE[i][j].u;
            SIDE[i][j].done = false;
            if(u!=0)
            {
                if(u.hp()>0)
                    effCheck(u);
            }
        }
    }
}

function overCheck()
{
    if(sdOverChk(1)==0)
    {
        Fight.winSide = 2;
        return 1;
    }
    if(sdOverChk(2)==0)
    {
        Fight.winSide = 1;
        return 1;
    }
    return 0;
}

function sdOverChk(side)
{
    var i=0;
    var live = 0;
    var u;
    for(var i=0;i<3;i++)
    {
        u = SIDE[side][i].u;
        if(u!=0)
        {
            if(u.hp()>0)
            {
                live++;
                break;
            }
        }
    }
    return live;
}

//角色行动
function Act(u)
{
    var t;

    //主动技能释放
    if(castZhudong(u)==1)
        return true;

    //寻找目标
    t = findTarget_1(u);
    if(t!=0)
    {
        if(nmlAtk(u,t)==1)  //找到目标，普通攻击
            return true;
    }
    else
    {
        addMsg("【"+u.name()+"】攻击距离内没有目标");
        move(u);    //向前移动
    }

    return false;
}

function move(u)
{
    addMsg("  【"+u.name()+"】移动");
    var side = u.side;
    var index = u.idx;
    var pos = SIDE[side][index].pos;
    if(side==1)
        pos++;
    else
        pos--;
    SIDE[side][index].pos = pos;
}

function nmlAtk(u,t)
{
    addMsg("【"+u.name()+"】普通攻击");

    if(nmlAtkChk(t))    //检测是否命中、规避等
    {
        var dmg = u.atk();
        dmg = dmgChk(t,dmg);    //是否有吸收等
        var def = t.def();
        dmg = Math.ceil(dmg*(150/(150+def)));   //攻防计算
        if(dmg>0)
        {
            t.ft.t = t;
            t.damage(dmg);          //造成伤害
        }
        addMsg("  【"+t.name()+"】受到"+dmg+"伤害("+t.hp()+")");
        if(t.hp()<=0)
            addMsg("  【"+t.name()+"】被击倒");
        Zhuiji(u,t);    //追击技能
    }

    return overCheck();
}

function castZhudong(u)
{
    //遍历技能
    var fskl = u.fskl();
    var len = fskl.length;
    var id,lvl;

    if(len>0)
    {
        for(var i=0;i<len;i++)
        {
            id = fskl[i].id;
            if(skl[id].type==1) //类型为主动技能
            {
                lvl = fskl[i].lvl;
                if(zhudong(u,id,lvl)==1)
                    return 1;
            }
        }
    }
    else
    {
        return 0;
    }
}

function zhudong(u,id,lvl)
{
    //概率判断
    var probAdd = skl[id].probAdd;
    var prob = skl[id].prob+(lvl-1)*probAdd;
    var p = Math.random();

    if(p>prob)
        return;

    //概率通过了
    //遍历效果
    var list = JSON.parse(skl[id].eff);
    var len=list.length;
    var id;
    var t;
    for(var i=0;i<len;i++)
    {
        id = list[i];
        t = $fsc[id].target;
        if(t==0)
        {
            zd_0(u,id,lvl);
        }
        if(t==1)
        {
            zd_1(u,id,lvl);
        }
        if(t==2)
        {
            if(zd_2(u,id,lvl)==1)
                return 1;
        }
    }

    return 0;
}


function zd_0(u,id,lvl)
{

}

function zd_1(u,id,lvl)
{
    
}

function zd_2(u,id,lvl)
{
    var r = $fsc[id].range;
    var n = $fsc[id].targetNum;
    var src = $fsc[id].src;
    var base = $fsc[id].base;
    var add = $fsc[id].add;
    var Num = Math.ceil(u.getCal(src)*(base+(lvl-1)*add));
    var NumType = skl[id].numType;

    var tArray = fSearch(u,r,n,2);
    var t;
    var len = tArray.length;
    var def;
    var dmg;
    var list;

    if(len>0)
    {
        addMsg("【"+u.name()+"】 发动 ["+skl[id].name+"] !!");

        for(var i=0;i<len;i++)
        {
            t = tArray[i];
            
            //先处理伤害
            if(Num!=0)
            {
                d = NumType==0?t.def():t.mkt();
                dmg = Num;
                dmg = Math.ceil(dmg*(150/(150+d)));
                t.damage(dmg);
                addMsg("  【"+t.name()+"】受到"+dmg+"伤害("+t.hp()+")");
                if(t.hp()<=0)
                    addMsg("  【"+t.name()+"】被击倒");
            }

            //处理状态
            list = JSON.parse(skl[id].eff);
            for(var j=0;j<list.length;j++)
            {
                addEff(t,list[j],lvl);
            }

            if(overCheck()==1)
                return 1;
        }
    }
    else
        return 0;
}


function zd_3(u,id,lvl)
{
    
}


function castZhiHui(u)
{
    //遍历技能
    var fskl = u.fskl();
    var len = fskl.length;
    var id,lvl;
    var tArray;
    var t;

    if(len>0)
    {
        for(var i=0;i<len;i++)
        {
            id = fskl[i].id;
            if(skl[id].type==0) //类型为主动技能
            {
                
            }
        }
    }
}


function addEff(t,eff,lvl)
{
    t.ft.eff.push({id:eff,lv:(lvl-1),t:Fight.round});
    t.attrCheck();
}

function effCheck(u)
{
    var len = u.ft.eff.length;
    var id;
    var v;
    var t;
    var i=0;

    if(len>0)
    {
        while(true)
        {
            if(i>=u.ft.eff.length)
                break;

            v = u.ft.eff[i];

            id=v.id;
            t = v.t;
            if(Fight.round-t>effT[id].time)
            {
                removeEff(u,id,i);
            }
            i++;
        }
    }
}

function removeEff(t,id,index)
{
    var v = effT[id];
    var add = v.add*t.ft.eff[eff].lv;
    var p = v.per;

    t.ft.eff.splice(index,1);

    addMsg("【"+t.name()+"】 的"+ v.name+"效果消失了");

    t.attrCheck();
}

function fSearch(u,r,n,tType)
{
    var tArray=[];

    if(tType==0)
    {
        tArray.push(u);
        return tArray;
    }
    else if(tType==1||tType==2)
    {
        var index = u.idx;
        var uPos = SIDE[u.side][index].pos;
        var side = tType==2?u.t:u.side;
        var tmpT;
        var tPos;

        for(var i=0;i<3;i++)
        {
            tmpT = SIDE[side][i].u;
            tPos = SIDE[side][i].pos;
            if(tmpT!=0)
            {
                if(tmpT.hp()>0)
                {
                    if(r>=Math.abs(uPos-tPos))
                    {
                        tArray.push(tmpT);
                    }
                }
            }
        }

        while(tArray.length>n)
        {
            index = Math.floor((Math.random()*tArray.length));
            tArray = tArray.splice(index, 1);
        }

        return tArray;
    }
    else
    {
        if(u.ft.t!=0)
        {
            tArray.push(u.ft.t);
            return tArray;
        }
    }
}

function nmlAtkChk(t)
{
    return true;
}

function Zhuiji(u,t)
{

}

function dmgChk(t,dmg)
{
    var d = dmg;
    return d;
}

//寻找速度最快的英雄
function findHero()
{
    var u=0;
    var tmpU;
    var tmpSpd=-1;

    for(var i=1;i<=2;i++)
    {
        for(var j=0;j<3;j++)
        {
            tmpU = SIDE[i][j].u;
            if(tmpU!=0&&SIDE[i][j].done==false)
            {
                if(tmpU.hp()>0&&tmpU.spd()>tmpSpd)
                {
                    u = tmpU;
                    tmpSpd = tmpU.spd();
                }
            }
        }
    }
    if(u!=0)
    {
        SIDE[u.side][u.idx].done = true;
    }
    return u;
}

//寻找普通攻击目标
function findTarget_1(u)
{
    var r = u.atkDis();
    return findTInRange(u,r);
}

//寻找符合距离的目标
function findTInRange(u,r)
{
    var t=0;

    var side = u.side;
    var index = u.idx;
    var uPos = SIDE[side][index].pos;
    var tside = u.t;
    var tArray = [];
    var tmpT;
    var tPos;

    for(var i=0;i<3;i++)
    {
        tmpT = SIDE[tside][i].u;
        tPos = SIDE[tside][i].pos;
        if(tmpT!=0)
        {
            if(tmpT.hp()>0)
            {
                if(r>=Math.abs(uPos-tPos))
                {
                    tArray.push(tmpT);
                }
            }
        }
    }

    if(tArray.length>0)
    {
        var index = Math.floor((Math.random()*tArray.length));
        t = tArray[index];
    }

    return t;
}
export default { Fight}; 