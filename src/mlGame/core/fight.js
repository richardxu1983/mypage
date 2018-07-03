
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
        addMsg("[ "+Player.attr.name+" ]"+"与"+u.name+"的战斗即将开始，双方距离："+Math.abs(Fight.targetPos - Fight.playerPos)+"米。");
        $addinfo(Player.attr.name+"与"+u.name+"发生了争斗，胜利将鹿死谁手？");
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
        	if(Player.hp()<=0)
            {
				addMsg(Fight.target.name+"胜利了");
				$addinfo(Fight.target.name+"胜利了");
				Fight.over = 1;
				return;        	
            }
            if(Fight.target.hp<=0)
            {
                addMsg(Player.attr.name+"胜利了");
                $addinfo(Player.attr.name+"胜利了");
                Fight.over = 1;
                return;     	
            }

            Fight.dis = Fight.targetPos - Fight.playerPos;

            if(Math.abs(Fight.dis) > Player.atkDis())
            {
                Fight.playerPos = Math.abs(Fight.dis)<=Player.getAttr('spd')?(Fight.targetPos - Player.atkDis()):Fight.playerPos + Player.getAttr('spd');
                if(Fight.plyMCD==0)
                	addMsg("[ "+Player.attr.name+" ]因为太远而无法攻击，于是向"+Fight.target.name+""+"靠近。");
                Fight.plyMCD++;
                if(Fight.plyMCD>=10)
                	Fight.plyMCD = 0;
            }
            else
            {

            	Fight.plyMCD = 0;
            	if(Fight.plyEnter==0)
            		addMsg("[ "+Player.attr.name+" ]进入了攻击范围。");
            	Fight.plyEnter = 1;

                if(Player.getAtkIdx() >= Player.getAspd())
                {
	                addMsg(Fight.playerTurn());
                	Player.setAtkIdx(0);
                }
                else
                {
                	if(Player.getAtkIdx()==0)
                	{
                		let w = Player.startAtkWrd();
                 		if(w!="")
                		{
			                addMsg("[ "+Player.attr.name+" ]"+w+"。");
                		}               		
                	}
                    Player.setAtkIdx(Player.getAtkIdx() + 1);
                }
            }


            if(Math.abs(Fight.targetPos - Fight.playerPos) >Fight.target.atkDis())
            {
                Fight.targetPos = Math.abs(Fight.dis)<=Fight.target.spd?(Fight.playerPos + Fight.target.atkDis()):Fight.targetPos - Fight.target.spd;
                if(Fight.enmMCD==0)
                {
	                addMsg(Fight.target.name+"因为太远而无法攻击，于是向[ "+Player.attr.name+" ]靠近。");             	
                }
                Fight.enmMCD++;
                if(Fight.enmMCD>=10)
                	Fight.enmMCD = 0;
            }
            else
            {
            	Fight.enmMCD = 0;
            	if(Fight.enmEnter==0)
            		addMsg(Fight.target.name+"进入了攻击范围。");
            	Fight.enmEnter = 1;
                if(Fight.target.getAtkIdx()>=Fight.target.getAspd())
                {
	                addMsg(Fight.targetTurn());
					Fight.target.setAtkIdx(0);
                }
                else
                {
                	if(Fight.target.getAtkIdx()==0)
                	{
                		let w = Fight.target.startAtkWrd();
                		if(w!="")
                		{
                			addMsg(Fight.target.name+""+w+"。");
                		}
                	}
                	Fight.target.setAtkIdx(Fight.target.getAtkIdx() + 1);
                }
            }
        }
        unpdateFMsg();
    },

    playerTurn:function()
    {
        if(Player.hp()>0)
        {
            var atk = Player.getAtk();
            Fight.target.damage(atk);
            return "[ "+Player.attr.name+" ]"+"对"+""+Fight.target.name+""+Player.atkWord()+"，造成了" + atk + "的伤害。";
        }
    },

    targetTurn:function()
    {
        if(Fight.target.hp>0)
        {
            var atk = Fight.target.getAtk();
            Player.damage(atk);
            return ""+Fight.target.name+""+"对"+"[ "+Player.attr.name+" ]"+Fight.target.atkWord()+"，造成了" + atk + "的伤害。"; 
        }
        return "";
    },
}

export default {Fight}; 