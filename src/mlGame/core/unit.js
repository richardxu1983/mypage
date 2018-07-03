
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'
import FT from '../../mlGame/core/fight.js'
import WP from '../../mlGame/core/weapon.js'

var $map = MpB.Gmap;
var $SM = EB.StateManager;
var Fight = FT.Fight;
var Weapon = WP.Weapon;

//unit 类
function Unit(attr,weaponid)
{
	this.hp = attr.hp || 0;
    this.maxhp = attr.hp || 0;
	this.mp = attr.mp || 0;
	this.atk = attr.atk || 0;
    this.def = attr.def || 0;
    this.aspd = attr.aspd || 0;
    this.spd = attr.spd || 0;
	this.name = attr.name || "";
    if(weaponid==undefined)
    {
        this.weapon = null;
    }
    else
    {
        this.weapon = new Weapon(weaponid);
    }

    this.idx=0;

    this.getAtkIdx=function()
    {
        if(this.weapon==null)
        {
            return this.idx;
        }
        else {
            return this.weapon.idx;
        }
    };

    this.setAtkIdx=function(v)
    {
        if(this.weapon==null)
        {
            this.idx = v;
        }
        else {
            this.weapon.idx = v;
        }
    };    
    this.atkDis = function()
    {
        if(this.weapon==null)
        {
            return 2;
        }
        else {
            return this.weapon.atkDis;
        }
    };
    this.getAspd = function()
    {
        if(this.weapon==null)
        {
            return this.aspd;
        }
        else {
            return this.weapon.aspd;
        }        
    };
    this.getAtk = function()
    {
        if(this.weapon==null)
        {
            return this.atk;
        }
        else {
            return this.weapon.atk;
        }
    };
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
    };
    this.atkWord=function()
    {
        if(this.weapon==null)
        {
            return "打出一拳";
        }
        else {
            return this.weapon.atkWord;
        }
    };
    this.startAtkWrd = function()
    {
        if(this.weapon==null)
        {
            return "";
        }
        else {
            return this.weapon.startWrd;
        }
    };
}

var Player = {

    attr : {

        name:"冒险者",

        'hp' : {
            'name' : "生命值",
            'value':50,
            'init' : 50,
            'max':50
        },
        'mp' : {
            'name' : "魔法值",
            'value': 20,
            'init' : 20,
            'max':100
        },
        'atk' : {
            'name' : "攻击力",
            'value':1,
            'init' : 1,
        },
        'def' : {
            'name' : "防御力",
            'value':0,
            'init' : 0,
        },
        'aspd' : {
            'name' : "攻击速度",
            'value':3,
            'init' : 3,
            'min':1
        },
        'spd' : {
            'value':5,
            'init' :5,
        },
        'gold' : {
            'name' : "金币",
            'value':0,
            'init' : 10,
        },
        'pos':{
            'value':0,
            'init':0,
        },
    },

    weapon:null,

    format:{
        'posTxt':"1",
    },
    
    idx:3,

    atkDis:function()
    {
        if(Player.weapon==null)
        {
            return 2;
        }
        else {
            return Player.weapon.atkDis;
        }
    },
    atkWord:function()
    {
        if(Player.weapon==null)
        {
            return "打出一拳";
        }
        else {
            return Player.weapon.atkWord;
        }
    },
    startAtkWrd:function()
    {
        if(Player.weapon==null)
        {
            return "";
        }
        else {
            return Player.weapon.startWrd;
        }
    },
    getAspd : function()
    {
        if(Player.weapon==null)
        {
            return Player.getAttr('aspd');
        }
        else {
            return Player.weapon.aspd;
        }        
    },

    equipWp:function(id)
    {
        if(Fight.over==0)
        {
            Player.weapon = new Weapon(id);
        }
    },

    unEquipWp:function()
    {
        if(Fight.over==0)
            Player.weapon = null;
    },

    getAtkIdx:function()
    {
        if(Player.weapon==null)
        {
            return Player.idx;
        }
        else {
            return Player.weapon.idx;
        }
    },

    setAtkIdx:function(v)
    {
        if(Player.weapon==null)
        {
            Player.idx = v;
        }
        else {
            Player.weapon.idx = v;
        }
    },

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
        Player.weapon = null;
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
        return Player.attr[attr].max;
    },

    getAttrMin : function(attr)
    {
        var val = Player.attr[attr];
        return Player.attr[attr].min;
    },

    //
    getAtk : function()
    {
        if(Player.weapon==null)
        {
            var atk = Player.getAttr('atk');
            return Math.floor(atk);
        }
        else {
            return Player.weapon.atk;
        }
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
        if(maxVal!=undefined&&maxVal>0)
        {
            if(newVal > maxVal) newVal = maxVal;
        }
        if(minVal!=undefined&&minVal>0)
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

export default { Player , Unit}; 