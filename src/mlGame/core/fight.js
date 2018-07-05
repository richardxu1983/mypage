import EB from '../../mlGame/core/engine.js'

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