import EB from '../../mlGame/core/engine.js'
import SK from '../../mlGame/core/skill.js'

var $addinfo = EB.info.addInfo;
var skl = SK.SKL;

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
		$addinfo(u.target.name()+"胜利了");
		Fight.over = 1;
		return 1;        	
    }
    return 0;
}

function Move(u)
{
	var dis = Fight.absDis();
    if( dis > u.atkDis())
    {
    	var t = u.target.fpos-u.fpos>=0?1:-1;
        u.fpos = dis<=u.getAttr('spd')?(u.fpos + t*u.atkDis()):(u.fpos + t*u.getAttr('spd'));
        if(u.mcd==0)
        	addMsg(u.fightName()+"因为太远而无法攻击，于是向"+u.target.fightName()+""+"靠近。");
        u.mcd++;
        if(u.mcd>=10)
        	u.mcd = 0;
    }
    Fight.dis = Fight.right.fpos - Fight.left.fpos;
}

function tg5(u)
{
    var j,len,ac=-1,chance;
    for(j = 0,len=u.target.skSlot[5].length; j < len; j++) 
    {
        chance = Math.floor(Math.random()*101);

        if(chance<skl[u.target.skSlot[5][j]].chance)
        {
            ac = skl[u.target.skSlot[5][j]].ac;
            switch(ac)
            {
            case 3:
                {
                    Fight.dmg=0;
                    Fight.w=Fight.w+"但"+u.target.fightName()+"使出一招“"+skl[u.target.skSlot[5][j]].name+"”，躲过了这次攻击";
                }
            default:
              break;
            }
            break;
        }
    }
    return ac;
}

function Act(u)
{
    if(Fight.absDis() <= u.atkDis())
    {
    	u.mcd= 0;
    	if(u.fEnter==0)
    		addMsg(u.fightName()+"进入了攻击范围。");
    	u.fEnter = 1;

        if(u.getAtkIdx() >= u.getAspd())
        {
        	if(u.hp()>0)
	        {
	            Fight.dmg = u.getAtk();
                var ac;
                Fight.w = u.fightName()+"对"+u.target.fightName()+u.atkWord()+"，";

                //类型5技能触发判断
                ac = tg5(u);

	            u.target.damage(Fight.dmg);
                if(ac==-1)
                    Fight.w=Fight.w+"造成了" + Fight.dmg + "的伤害。";
                addMsg(Fight.w);
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
    Fight.dis = Fight.right.fpos - Fight.left.fpos;
}


var Fight = {

	left:null,
	right:null,
    fightTimer:0,
    info:{v:""},
    over:0,
    showClose:{v:false},
    showPnl:{v:false},
    dis:0,
    w:"",
    dmg:0,

    close:function()
    {
    	clearInterval(Fight.fightTimer);
        Fight.target = null;
        Fight.left=null;
        Fight.right = null;
        Fight.info.v = "";
        Fight.showPnl.v=false;
        Fight.over = 0;
    },

    init:function(left,right)
    {
    	Fight.left=left;
        Fight.right = right;
        Fight.left.target = right;
        Fight.right.target = left;
        Fight.over=2;
        Fight.info.v = "";
        Fight.left.fpos = 0;
        Fight.right.fpos = 50;
        Fight.showClose.v = false;
        Fight.showPnl.v=true;
        Fight.left.mcd = 0;
        Fight.left.fEnter = 0;
        Fight.right.mcd = 0;
        Fight.right.fEnter = 0;
        Fight.dis = Fight.right.fpos - Fight.left.fpos;
    },

    absDis:function()
    {
    	Fight.dis = Fight.right.fpos - Fight.left.fpos;
    	return Math.abs(Fight.dis);
    },

    start:function(left,right)
    {
    	Fight.init(left,right);
        Fight.fightTimer = setInterval(Fight.step,500);
        addMsg(Fight.left.fightName()+"与"+Fight.right.fightName()+"的战斗即将开始，双方距离："+Fight.absDis()+"米。");
        $addinfo(Fight.left.name()+"与"+Fight.right.name()+"发生了争斗，胜利将鹿死谁手？");
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
        	if(HPCheck(Fight.left)==1||HPCheck(Fight.right)==1)
        		return;
            Move(Fight.left);
            Act(Fight.left);
            Move(Fight.right);
            Act(Fight.right);
        }
        unpdateFMsg();
    },
}

export default {Fight}; 