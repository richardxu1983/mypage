import SK from '../../mlGame/data/skill.js'
import WPD from '../../mlGame/data/wpData.js'
var $wp = WPD.wp;
var skl = SK.SKL;
var $ac = SK.AC;


var ply=0;

//最大回合数
var MAX_ROUND = 10;

var Side1 = 
[
{unit:0,pos:0,done:false},{unit:0,pos:1,done:false},{unit:0,pos:2,done:false},
];

var Side2 = 
[
{unit:0,pos:3,done:false},{unit:0,pos:4,done:false},{unit:0,pos:5,done:false},
];

var currentTargetSide = 0;

var targetList = [];

function unpdateFMsg()
{
    var el = document.getElementById('ftMsg');
    if(el)
    {
        el.scrollTop = el.scrollHeight;
    }
}

function addMsg(v)
{
	if(v!="")
	{
        Fight.info.v = Fight.info.v + v + "\n";
	    //unpdateFMsg();
	    if(Fight.info.length>1000)
	    {
	        Fight.info.slice(-500);
	    }
	}
}

function getDis(u1,u2)
{
    var p1;
    var p2;

    if(u1.side==1)
    {
        p1 = Side1[u1.fid].pos;
        p2 = Side2[u2.fid].pos;
    }
    else
    {
        p1 = Side2[u1.fid].pos;
        p2 = Side1[u2.fid].pos;
    }
    return Math.abs(p1-p2);
}

var Fight = {

    showPnl:{v:false},
    info:{v:""},
    showClose:{v:false},
    over:true,
    init:function(left,right,callback)
    {
        Fight.info.v = "";

        Fight.showClose.v = false;
        Fight.showPnl.v=true;

        Fight.callback = callback==undefined?undefined:callback;
        Fight.callBackParam=0;
        Fight.playerWin = false;
        Fight.over = false;
        Fight.side1 = 0;
        Fight.side2 = 0;
        ply=0;

        var i=0

        //list init
        for(i=0;i<3;i++)
        {
            Side1[i].unit = 0;
            Side1[i].pos = i;
            Side1[i].done = false;
            Side2[i].unit = 0;
            Side2[i].pos = i+3;
            Side2[i].done = false;
        }

        //回合数
        Fight.round=1;
        var fid;

        //left init
        for(i=0;i<3;i++)
        {
            if(left[i]!=0)
            {
                if(left[i].hp()>0)
                {
                    fid = 2-i;
                    Side1[fid].unit = left[i];
                    Side1[fid].unit.initSk();
                    Side1[fid].unit.fid = fid;
                    Side1[fid].unit.side =1;
                    Fight.side1++;
                    if(Side1[fid].unit.Type==99)
                        ply = Side1[fid].unit;
                }
            }
            if(right[i]!=0)
            {
                if(right[i].hp()>0)
                {
                    Side2[i].unit = right[i];
                    Side2[i].unit.initSk();
                    Side2[i].unit.fid = i;
                    Side2[i].unit.side = 2;
                    Fight.side2++;
                    if(Side2[i].unit.Type==99)
                        ply = Side2[i].unit;
                }
            }
        }
    },

    start:function(left,right,callback)
    {
        Fight.init(left,right,callback);
        if(Fight.side1<=0||Fight.side2<=0)
        {
            addMsg("战斗人数不足，战斗结束");
            //unpdateFMsg();
            Fight.showClose.v = true;
            ply = 0;
            return;
        }

        addMsg(">>>> 战斗即将开始 <<<<");
        //准备环节
        Fight.beforeRound();
        //回合开始
        Fight.roundStart();
    },

    beforeRound:function()
    {
        //准备环节
    },

    roundStart:function()
    {
        while(Fight.round<=MAX_ROUND) 
        {
            addMsg("\n---- 第 "+Fight.round+" 回合开始 ----");
            Fight.over = Fight.roundStep();
            if(Fight.over)
                break;
            addMsg("---- 第 "+Fight.round+" 回合结束 ----");
            Fight.round++;
        }

        addMsg("\n---- 战斗结束 ----");
        if(Fight.playerWin)
        {
            addMsg("\n你胜利了");
        }
        else
        {
            addMsg("\n你被击败了");
        }

        Fight.fightOver();
    },

    fightOver:function()
    {
        //unpdateFMsg();
        setTimeout(unpdateFMsg,200);
        Fight.showClose.v = true;
        targetList = [];
        ply = 0;
        var i=0;
        //list init
        for(i=0;i<3;i++)
        {
            Side1[i].unit = 0;
            Side1[i].pos = i;
            Side1[i].done = false;
            Side2[i].unit = 0;
            Side2[i].pos = i+3;
            Side2[i].done = false;
        }
        if(Fight.callback!=undefined)
        {
            Fight.callback(Fight.callBackParam);
        }
    },

    roundStep:function()
    {
        
        var i=0;
        for(i=0;i<3;i++)
        {
            Side1[i].done = false;
            Side2[i].done = false;
        }
        //寻找谁先出手
        var u;
        var t;
        while(true)
        {
            u = findHero();

            if(u!=0)
            {
                //寻找目标
                findTarget(u);

                if(targetList.length<=0)
                {
                    //攻击距离内没有目标，尝试移动
                    if(u.side==1)
                    {
                        Side1[u.fid].pos++;
                    }
                    else
                    {
                        Side2[u.fid].pos--;
                    }
                    addMsg(u.fightName()+"向前移动");
                }
                else
                {
                    //有目标，尝试攻击
                    var t = targetList[Math.floor(Math.random()*targetList.length)];
                    Attack(u,t);
                }
            }
            
            if(liveCheck())
            {
                console.log("退出");
                return true;
            }

            if(u==0)
                break;
        }

        return false;
    },

    close:function()
    {
        Fight.showPnl.v=false;
    },
};

//普通攻击
function Attack(u,t)
{
    var dmg = u.getAtk();
    t.damage(dmg);
    addMsg(u.fightName()+"对"+t.fightName()+"进行了普通攻击，造成了"+dmg+"的伤害");
    if(t.hp()<=0)
    {
        addMsg(t.fightName()+"被击倒了");
    }
}

function liveCheck()
{
    if(ply.hp()<=0)
    {
        Fight.playerWin = false;
        return true;
    }
    var another=Side1;
    if(ply.side==1)
        another=Side2;

    var n=0;
    var t;
    for(var i=0;i<3;i++)
    {
        t = another[i].unit;
        if(t!=0)
        {
            if(t.hp()>0)
            {
                n++;
            }
        }
    }
    if(n<=0)
    {
        Fight.playerWin = true;
        return true;
    }
    return false;
}

function findHero()
{
    var u=0;
    var spd = -1;
    var i=0;
    var side = 0;
    var tmpU;

    currentTargetSide = 0

    for(i=0;i<3;i++)
    {
        tmpU = Side1[i].unit;
        if(tmpU!=0)
        {
            if(tmpU.hp()>0&&Side1[i].done==false)
            {
                if(tmpU.getAttr('spd')>spd)
                {
                    u=tmpU;
                    spd = tmpU.getAttr('spd');
                    side = 1;
                }
            }
        }
    }
    for(i=0;i<3;i++)
    {
        tmpU = Side2[i].unit;
        if(tmpU!=0)
        {
            if(tmpU.hp()>0&&Side2[i].done==false)
            {
                if(tmpU.getAttr('spd')>spd)
                {
                    u=tmpU;
                    spd = tmpU.getAttr('spd');
                    side = 2;
                }
            }
        }
    }
    if(u!=0)
    {
        if(side==1)
        {
            Side1[u.fid].done = true;
            currentTargetSide = Side2;
        }
        else
        {
            Side2[u.fid].done = true;
            currentTargetSide = Side1;
        }
    }
    return u;
}

function findTarget(u)
{
    console.log(u);
    var dis = u.atkDis();
    targetList = [];
    var t = 0;
    for(var i=0;i<3;i++)
    {
        t = currentTargetSide[i].unit;
        if(t!=0)
        {
            if(t.hp()>0&&getDis(u,t)<=dis)
            {
                targetList.push(t);
            }
        }
    }
}

export default {Fight};