
import UB from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'

var Player;
var $addinfo = EB.info.addInfo;

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
	    Fight.info.v=Fight.info.v+v+"\n";
	    unpdateFMsg();
	    if(Fight.info.length>1000)
	    {
	        Fight.info.slice(-500);
	    }
	}
}

function HPCheck(u)
{
	if(u.hp()<=0)
    {
		addMsg(u.target.fightName()+"胜利了");
		$addinfo(u.target.fightName()+"胜利了");
		Fight.over = 1;
		return 1;        	
    }
    return 0;
}

function PlyMove()
{
    if(Math.abs(Fight.dis) > Player.atkDis())
    {
        Fight.playerPos = Math.abs(Fight.dis)<=Player.getAttr('spd')?(Fight.targetPos - Player.atkDis()):Fight.playerPos + Player.getAttr('spd');
        if(Fight.plyMCD==0)
        	addMsg(Player.fightName()+"因为太远而无法攻击，于是向"+Fight.target.fightName()+""+"靠近。");
        Fight.plyMCD++;
        if(Fight.plyMCD>=10)
        	Fight.plyMCD = 0;
    }	
}

function EnmMove()
{
    if(Math.abs(Fight.targetPos - Fight.playerPos) >Fight.target.atkDis())
    {
        Fight.targetPos = Math.abs(Fight.dis)<=Fight.target.spd?(Fight.playerPos + Fight.target.atkDis()):Fight.targetPos - Fight.target.getAttr('spd');
        if(Fight.enmMCD==0)
        {
            addMsg(Fight.target.fightName()+"因为太远而无法攻击，于是向"+Player.fightName()+"靠近。");             	
        }
        Fight.enmMCD++;
        if(Fight.enmMCD>=10)
        	Fight.enmMCD = 0;
    }
}

function Act(u,cd,enter,turn)
{
    if(Math.abs(Fight.dis) <= u.atkDis())
    {
    	Fight[cd] = 0;
    	if(Fight[enter]==0)
    		addMsg(u.fightName()+"进入了攻击范围。");
    	Fight[enter] = 1;

        if(u.getAtkIdx() >= u.getAspd())
        {
        	if(u.hp()>0)
	        {
	            var atk = u.getAtk();
	            u.target.damage(atk);
	            addMsg(u.fightName()+"对"+u.target.fightName()+u.atkWord()+"，造成了" + atk + "的伤害。");
	        }
        	u.setAtkIdx(0);
        }
        else
        {
        	if(u.getAtkIdx()==0)
        	{
        		let w = u.startAtkWrd();
         		if(w!="")
        		{
	                addMsg(u.fightName()+w+"。");
        		}               		
        	}
            u.setAtkIdx(u.getAtkIdx() + 1);
        }
    }
}


var Fight = {

    target:null,
    playerPos:0,
    targetPos:20,
    fightTimer:0,
    info:{v:""},
    over:0,
    showClose:{v:false},
    showPnl:{v:false},
    plyMCD:0,
    plyEnter:0,
    enmEnter:0,
    enmMCD:0,
    dis:0,

    close:function()
    {
        Fight.target = null;
        Player.target = null;
        Fight.info.v = "";
        clearInterval(Fight.fightTimer);
        Fight.showPnl.v=false;
        Fight.over = 0;
    },

    init:function(u)
    {
    	if(Player==undefined)
    	{
    		Player = UB.Player;
    	}
        Fight.target = u;
        Player.target = u;
        u.target = Player;
        Fight.over=0;
        Fight.info.v = "";
        Fight.targetPos = 50;
        Fight.playerPos = 0;
        Fight.showClose.v = false;
        Fight.showPnl.v=true;
        Fight.plyMCD=0;
	    Fight.plyEnter=0;
	    Fight.enmEnter=0;
	    Fight.enmMCD=0;
        Fight.dis = Fight.targetPos - Fight.playerPos;
    },

    start:function(u)
    {
    	Fight.init(u);
        Fight.fightTimer = setInterval(Fight.step,500);
        addMsg(Player.fightName()+"与"+u.fightName()+"的战斗即将开始，双方距离："+Math.abs(Fight.targetPos - Fight.playerPos)+"米。");
        $addinfo(Player.fightName()+"与"+u.fightName()+"发生了争斗，胜利将鹿死谁手？");
    },

    step:function()
    {

        if(Fight.over==1)
        {
            unpdateFMsg();
            clearInterval(Fight.fightTimer);
            Fight.showClose.v = true;
            Fight.over = 0;
        }
        else
        {
        	if(HPCheck(Player)==1||HPCheck(Fight.target)==1)
        		return;

            Fight.dis = Fight.targetPos - Fight.playerPos;

            PlyMove();
            EnmMove();
            Act(Player,"plyMCD","plyEnter","playerTurn");
            Act(Fight.target,"enmMCD","enmEnter","targetTurn");
        }
        unpdateFMsg();
    },
}

export default {Fight}; 