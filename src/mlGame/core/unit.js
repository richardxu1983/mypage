
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'

var $map = MpB.Gmap;
var $addinfo = EB.info.addInfo;
var $SM = EB.StateManager;

//unit 类
function Unit(attr)
{
	this.hp = attr.hp || 0;
    this.maxhp = attr.hp || 0;
	this.mp = attr.mp || 0;
	this.atk = attr.atk || 0;
    this.def = attr.def || 0;
    this.aspd = attr.aspd || 0;
    this.spd = attr.spd || 0;
	this.name = attr.name || "";
    this.aspdIndex=0;
	this.damage = function(val)
    {
        var hp = this.hp;
        hp = hp - val;
        if(hp<=0)
        {
            hp = 0;
            this.hp = hp;
            //this.die();
            return -1;
        }
        this.hp = hp;
        return 1;
    };

    this.alive = function()
    {
    	return this.hp>0?true:false;
    }
}

function unpdateFMsg()
{
    var el = document.getElementById('ftMsg');
    if(el)
    {
        el.scrollTop = el.scrollHeight;
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

    addInfo:function(v)
    {
        Fight.info.v=Fight.info.v+v+"\n";
        unpdateFMsg();
        if(Fight.info.length>1000)
        {
            Fight.info.slice(-500);
        }
    },

    close:function()
    {
        Fight.target = null;
        Fight.info.v = "";
        clearInterval(Fight.fightTimer);
        Fight.showPnl.v=false;
    },

    start:function(u)
    {
        Fight.target = u;
        Fight.over=0;
        Fight.info.v = "";
        Fight.targetPos = 20;
        Fight.playerPos = 0;
        Fight.showClose.v = false;
        Fight.showPnl.v=true;
        Fight.fightTimer = setInterval(Fight.step,500);
        Fight.addInfo("["+Player.attr.name+"]"+" 向 "+"["+u.name+"]"+"发起了挑战，这将是一场你死我活的战斗，两者距离：" + (Fight.targetPos - Fight.playerPos));
    },

    step:function()
    {

        if(Fight.over==1)
        {
            unpdateFMsg();
            clearInterval(Fight.fightTimer);
            Fight.showClose.v = true;
        }
        else
        {
            if((Fight.targetPos - Fight.playerPos) >5)
            {
                Fight.playerPos = Fight.playerPos + Player.getAttr('spd');
                Fight.addInfo("["+Player.attr.name+"]"+" 向 "+"["+Fight.target.name+"]"+"靠近，两者距离：" + (Fight.targetPos - Fight.playerPos));
            }
            else
            {
                if(Player.aspdIndex>=Player.getAttr('aspd'))
                {
                    if(Fight.playerTurn()==1)
                    {
                        Fight.addInfo("["+Player.attr.name+"]"+" 胜利了");
                        unpdateFMsg();
                        Fight.over = 1;
                    }
                    else
                    {
                        Player.aspdIndex = 0;
                    }
                }
                else
                {
                    Player.aspdIndex = Player.aspdIndex + 1;
                }
            }

            if((Fight.targetPos - Fight.playerPos) >5)
            {
                Fight.targetPos = Fight.targetPos - Fight.target.spd;
                Fight.addInfo("["+Fight.target.name+"]"+" 向 "+"["+Player.attr.name+"]"+"靠近，两者距离：" + (Fight.targetPos - Fight.playerPos));
            }
            else
            {
                if(Fight.target.aspdIndex>=Fight.target.aspd)
                {
                   if( Fight.targetTurn()==1)
                   {
                        Fight.addInfo(Fight.target.name+" 胜利了");
                        unpdateFMsg();
                        Fight.over = 1;
                   }
                   else
                   {
                        Fight.target.aspdIndex = 0;
                   }
                }
                else
                {
                    Fight.target.aspdIndex = Fight.target.aspdIndex + 1;
                }
            } 
        }
        unpdateFMsg();
    },

    playerTurn:function()
    {
        if(Player.hp()>0)
        {
            var atk = Player.getAttr('atk');
            Fight.addInfo("["+Player.attr.name+"]"+" 向 "+"["+Fight.target.name+"]"+"发起进攻，造成了" + atk + "的伤害");
            if(Fight.target.damage(atk)==-1)
            {
                return 1;
            }
            return 0;
        }
        else
        {
            return -2;
        }
    },

    targetTurn:function()
    {
        if(Fight.target.hp>0)
        {
            var atk = Fight.target.atk;
            Fight.addInfo("["+Fight.target.name+"]"+" 向 "+"["+Player.attr.name+"]"+"发起进攻，造成了" + atk + "的伤害");
            if(Player.damage(atk)==-1)
            {
                return 1;
            }
            return 0;            
        }
        else
        {
            return -2;
        }
    },
}

var Player = {

    attr : {

        name:"冒险者",

        'hp' : {
            'name' : "生命值",
            'value':20,
            'init' : 20,
            'visual' : true,
            'max':20
        },
        'mp' : {
            'name' : "魔法值",
            'value': 20,
            'init' : 20,
            'visual' : true,
            'max':100
        },
        'atk' : {
            'name' : "攻击力",
            'value':1,
            'init' : 1,
            'visual' : true,
            'max':1000000
        },
        'def' : {
            'name' : "防御力",
            'value':0,
            'init' : 0,
            'visual' : true,
            'max':100
        },
        'aspd' : {
            'name' : "攻击速度",
            'value':3,
            'init' : 3,
            'visual' : false,
            'min':1
        },
        'spd' : {
            'name' : "移动速度",
            'value':5,
            'init' :5,
            'visual' : false,
            'max':10
        },
        'gold' : {
            'name' : "金币",
            'value':0,
            'init' : 10,
            'max' : 1000000,
        },
        'pos':{
            'name':"位置",
            'value':0,
            'init':0,
            'max' : 1000000,
        },
    },

    format:{
        'posTxt':"1",
    },
    
    aspdIndex:0,

    fightUnit:function(u)
    {
        Fight.start(u);
    },

    posFormat:function()
    {
        Player.format.posTxt = $map.mapName(Player.attr['pos'].value);
    },

    initAttr:function()
    {
        var v;
        for(v in Player.attr)
        {
            if(typeof(Player.attr[v])!="string")
                Player.attr[v].value = Player.getAttr(v);
        }
        Player.posFormat();
    },

    //
    getAttr : function(attr)
    {
        var ret = $SM.get('player.'+attr);
        if(ret == undefined)
        {
            //alert(attr);
            var val = this.attr[attr];
            if(val!=undefined)
            {
                $SM.set('player.'+attr , val.init);
            }
            else
            {
                $SM.set('player.'+attr , 0);
            }
        }
        //alert(attr + ' : ' + $SM.get('fighter.'+attr));
        return $SM.get('player.'+attr);
    },

    //
    getAttrMax : function(attr)
    {
        var val = Player.attr[attr];
        if(val!=undefined)
            return Player.attr[attr].max;
        else
            return -1;
    },

    getAttrMin : function(attr)
    {
        var val = Player.attr[attr];
        if(val!=undefined)
            return Player.attr[attr].min;
        else
            return -1;
    },

    //
    getAttack : function()
    {
        var atk = Player.getAttr('atk');
        //alert(power+','+Math.floor(power));
        return Math.floor(atk);
    },

    //
    attrToMax : function(attr)
    {
        Player.setAttr(attr,Player.getAttrMax(attr));
    },

    //
    setAttr : function(attr , val)
    {
        //alert(attr + ' : ' + val);
        var newVal = val;
        var maxVal = Player.getAttrMax(attr);
        var minVal = Player.getAttrMin(attr);
        if(newVal < 0) newVal = 0;
        if(maxVal>0)
        {
            if(newVal > maxVal) newVal = maxVal;
        }
        if(minVal>0)
        {
            if(newVal < maxVal) newVal = maxVal;
        }
        Player.attr[attr].value = newVal;
        $SM.set('player.'+attr , newVal);
        Player.onAttrChange(attr, newVal);
    },

    //
    arriveAt:function(i)
    {
        Player.setAttr('pos',i);
        Player.posFormat();
    },

    //
    onAttrChange : function(attr,val)
    {
        if(Player.attr[attr]!=undefined)
        {
            if(attr == 'hp' && val<=0)
            {
                Player.die();
            }
        }
    },

    addAttr : function(status , val)
    {
        if(Player.attr[status] == null) return;
        var originVal = Player.getAttr(status);
        var newVal = originVal + val;
        Player.setAttr(status,newVal);
    },

    //
    damage : function(val)
    {
        var dmg = -1 * val;
        Player.addAttr('hp',dmg);
        if(Player.hp()<=0)
        {
            return -1;
        }
        return 0;
    },

    //
    hp : function()
    {
        return Player.getAttr('hp');
    },

    //
    die : function()
    {

    },
};

//extend(Player,Unit);

export default { Player , Unit , Fight }; 