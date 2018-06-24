
import {extend} from './utils/utils.js'

//unit 类
function Unit(attr)
{
	this.hp = attr.hp || 0;
	this.mp = attr.mp || 0;
	this.atk = attr.atk || 0;
	this.name = attr.name || "";

	this.damage = function(val)
    {
        var hp = this.hp;
        hp = hp - val;
        if(hp<=0)
        {
            hp = 0;
            this.hp = hp;
            this.die();
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

var Player = {

    attr : {
        'hp' : {
            'name' : "生命值",
            'value':0,
            'init' : 20,
            'visual' : true,
            'max':100
        },
        'mp' : {
            'name' : "魔法值",
            'value':0,
            'init' : 20,
            'visual' : true,
            'max':100
        },
        'atk' : {
            'name' : "攻击力",
            'value':0,
            'init' : 1,
            'visual' : true,
            'max':1000000
        },
        'def' : {
            'name' : "防御",
            'value':0,
            'init' : 0,
            'visual' : true,
            'max':100
        },
        'aspd' : {
            'name' : "攻击速度",
            'value':0,
            'init' : 3,
            'visual' : false,
            'max':1
        },
        'gold' : {
            'name' : "金币",
            'value':0,
            'init' : 10,
            'max' : 1000000,
        },
    },

    name:"冒险者";

    //
    getAttr : function(attr)
    {
        var ret = $SM.get('fighter.'+attr);
        if(ret == undefined)
        {
            //alert(attr);
            var val = this.attr[attr];
            if(val!=undefined)
                $SM.set('fighter.'+attr , val.init);
            else
                $SM.set('fighter.'+attr , 0);
        }
        //alert(attr + ' : ' + $SM.get('fighter.'+attr));
        return $SM.get('fighter.'+attr);
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
        if(newVal < 0) newVal = 0;
        if(maxVal>0)
        {
            if(newVal > maxVal) newVal = maxVal;
        }
        Player.attr[attr].value = newVal;
        $SM.set('fighter.'+attr , newVal);
        Player.onAttrChange(attr, newVal);
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

extend(Player,Unit);