import EB from '../../mlGame/core/engine.js'
import SK from '../../mlGame/data/skill.js'
import WPD from '../../mlGame/data/wpData.js'
var $wp = WPD.wp;
var $addinfo = EB.info.addInfo;
var skl = SK.SKL;
var $ac = SK.AC;

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
	    Fight.info.v=Fight.info.v+(Fight.t/2).toFixed(1)+"秒 : "+v+"\n";
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

function tg(index,u,depth,oac,dmg)
{
    var j,len,ac=-1,chance,id,iac=-1;

    for(j = 0,len=u.skSlot[index].length; j < len; j++) 
    {
        id = u.skSlot[index][j];
        chance = Math.floor(Math.random()*101);

        if((index==7&&(oac==skl[id].oac))||index!=7)
        {
            if(skCheck(id,u,chance))
            {
                ac = skl[id].ac;
                switch(ac)
                {
                case 1:
                    {
                        if(Fight.absDis()<=skl[id].dt2)
                        {
                            u.skd[id].cd = Fight.t;
                            u.skd[id].ct++;
                            var t = u.target.fpos-u.fpos>=0?1:-1;
                            u.fpos = u.fpos - t*skl[id].dt1;
                            Fight.dis = Fight.right.fpos - Fight.left.fpos;
                            Fight.w=Fight.w+u.fightName()+"使出一招“"+skl[id].name+"”，"+$ac[1].str;
                            iac = 1;
                            //addMsg(u.fightName()+"使出一招“"+skl[id].name+"”，"+$ac[1].str);
                        }
                    }
                    break;
                case 3:
                    {
                        u.skd[id].cd = Fight.t;
                        u.skd[id].ct++;
                        dmg=0;
                        Fight.w=Fight.w+"但"+u.fightName()+"使出一招“"+skl[id].name+"”，"+$ac[3].str;
                        iac = 3;
                    }
                    break;
                case 4:
                {
                    u.skd[id].cd = Fight.t;
                    u.skd[id].ct++;
                    dmg=dmg*skl[id].dt1;
                    Fight.w=Fight.w+$ac[4].str;
                    iac = 4;
                }
                break;
                case 5:
                {
                    if(Fight.absDis()>=skl[id].dt2&&Fight.absDis()<=skl[id].dt1)
                    {
                        u.skd[id].cd = Fight.t;
                        u.skd[id].ct++;
                        var t = u.target.fpos-u.fpos>=0?1:-1;
                        u.fpos = u.target.fpos - t;
                        Fight.dis = Fight.right.fpos - Fight.left.fpos;
                        addMsg(u.fightName()+"使出一招“"+skl[id].name+"”，"+$ac[5].str+u.target.fightName());
                        iac = 5;
                    }
                }
                break;
                case 6:
                {
                    if(Fight.absDis() <= u.atkDis())
                    {
                        u.skd[id].cd = Fight.t;
                        u.skd[id].ct++;
                        dmg = u.getAtk();
                        Fight.w = Fight.w + "，并且对"+u.target.fightName()+$ac[6].str+"，";
                        dmg = tg(2,u,1,-1,dmg);
                        dmg = tg(5,u.target,1,-1,dmg);
                        if(dmg>0)
                        {
                            u.target.damage(dmg);
                            Fight.w=Fight.w+"造成了" + dmg + "的伤害。";
                        }
                        iac = 6;
                    }
                }
                break;
                default:
                  break;
                }
                break;
            }
        }
    }
    if(depth==0)
    {
        tg(7,u,1,iac,dmg);
    }
    return dmg;
}


function skCheck(id,u,c)
{
    var cd = skl[id].cd;
    var wid = u.weapon.id;
    if(cd<0||(cd>0&&((Fight.t-u.skd[id].cd)>cd)))//cd检查
    {
        if((c<skl[id].chance)||(u.skd[id].ct==0&&(skl[id].fc>0&&c<skl[id].fc)))//概率检查
        {
            if(skl[id].nd==0||(skl[id].nd==1&&($wp[wid].rg==false))||(skl[id].nd==2&&($wp[wid].rg==true)))//武器检查
            {
                return true;
            }
        }
    }
    return false;
}

function Act(u)
{
    if(u.hp()<=0)
    {
        return;
    }

    Fight.w="";

    tg(4,u,0,-1,0);

    if(Fight.w!="")
    {
        addMsg(Fight.w);
        Fight.w = "";
    }

    if(Fight.absDis() <= u.atkDis())
    {
    	u.mcd= 0;
    	if(u.fEnter==0)
    		addMsg(u.fightName()+"进入了攻击范围。");
    	u.fEnter = 1;
        if(u.getAtkIdx() >= u.getAspd())
        {
            var dmg=0;
            dmg = nAtk(u);
            dmg = tg(5,u.target,0,-1,dmg);
            if(dmg>0)
            {
                u.target.damage(dmg);
                Fight.w=Fight.w+"造成了" + dmg + "的伤害。";
            }
            addMsg(Fight.w);
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


function nAtk(u)
{
    var dmg = u.getAtk();
    Fight.w = u.fightName()+"对"+u.target.fightName()+u.atkWord()+"，";
    dmg = tg(2,u,0,-1,dmg);
    return dmg;
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
    t:0,

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
        Fight.left.initSk();
        Fight.right.initSk();
        Fight.over=2;
        Fight.info.v = "";
        Fight.left.fpos = 0;
        Fight.right.fpos = 20;
        Fight.showClose.v = false;
        Fight.showPnl.v=true;
        Fight.left.mcd = 0;
        Fight.left.fEnter = 0;
        Fight.right.mcd = 0;
        Fight.right.fEnter = 0;
        Fight.dis = Fight.right.fpos - Fight.left.fpos;
        Fight.t=0;
    },

    absDis:function()
    {
    	Fight.dis = Fight.right.fpos - Fight.left.fpos;
    	return Math.abs(Fight.dis);
    },

    start:function(left,right)
    {
    	Fight.init(left,right);
        Fight.fightTimer = setInterval(Fight.step,350);
        addMsg(Fight.left.fightName()+"与"+Fight.right.fightName()+"的战斗即将开始，双方距离："+Fight.absDis()+"米。");
        $addinfo(Fight.left.name()+"与"+Fight.right.name()+"发生了争斗，胜利将鹿死谁手？");
    },

    step:function()
    {
        Fight.t++;
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
            if(HPCheck(Fight.left)==1||HPCheck(Fight.right)==1)
                return;
            Move(Fight.right);
            Act(Fight.right);
        }
        unpdateFMsg();
    },
}

export default {Fight}; 