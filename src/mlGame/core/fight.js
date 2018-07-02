
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
    Fight.info.v=Fight.info.v+v+"\n";
    unpdateFMsg();
    if(Fight.info.length>1000)
    {
        Fight.info.slice(-500);
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
        Fight.targetPos = 20;
        Fight.playerPos = 0;
        Fight.showClose.v = false;
        Fight.showPnl.v=true;
    },

    start:function(u)
    {
    	Fight.init(u);
        Fight.fightTimer = setInterval(Fight.step,500);
        addMsg("["+Player.attr.name+"]"+" 向 "+"["+u.name+"]"+"发起了挑战，这将是一场你死我活的战斗");
        $addinfo("["+Player.attr.name+"]"+" 向 "+"["+u.name+"]"+"发起了挑战，这将是一场你死我活的战斗");
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
				addMsg(Fight.target.name+" 胜利了");
				$addinfo(Fight.target.name+" 胜利了");
				Fight.over = 1;
				return;        	
            }
            if(Fight.target.hp<=0)
            {
                addMsg(Player.attr.name+" 胜利了");
                $addinfo(Player.attr.name+" 胜利了");
                Fight.over = 1;
                return;     	
            }

            if(Math.abs(Fight.targetPos - Fight.playerPos) > Player.atkDis())
            {
                Fight.playerPos = Fight.playerPos + Player.getAttr('spd');
                addMsg("["+Player.attr.name+"]因为太远而无法攻击，于是"+" 向 "+"["+Fight.target.name+"]"+"靠近");
            }
            else
            {
                if(Player.getAtkIdx() >= Player.getAspd())
                {
                	Fight.playerTurn();
                	Player.setAtkIdx(0);
                }
                else
                {
                    Player.setAtkIdx(Player.getAtkIdx() + 1);
                }
            }
            if(Math.abs(Fight.targetPos - Fight.playerPos) >Fight.target.atkDis())
            {
                Fight.targetPos = Fight.targetPos - Fight.target.spd;
                addMsg("["+Fight.target.name+"]因为太远而无法攻击，于是"+" 向 "+"["+Player.attr.name+"]"+"靠近");
            }
            else
            {
                if(Fight.target.getAtkIdx()>=Fight.target.getAspd())
                {
					Fight.targetTurn();
					Fight.target.setAtkIdx(0);
                }
                else
                {
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
            addMsg("["+Player.attr.name+"]"+" 向 "+"["+Fight.target.name+"]"+Player.atkWord()+"，造成了" + atk + "的伤害");
            Fight.target.damage(atk);
        }
    },

    targetTurn:function()
    {
        if(Fight.target.hp>0)
        {
            var atk = Fight.target.getAtk();
            addMsg("["+Fight.target.name+"]"+" 向 "+"["+Player.attr.name+"]"+Fight.target.atkWord()+"，造成了" + atk + "的伤害");
            Player.damage(atk);        
        }
    },
}

export default {Fight}; 