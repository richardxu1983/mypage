
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'
import FT from '../../mlGame/core/fight.js'
import WP from '../../mlGame/core/weapon.js'

var $map = MpB.Gmap;
var $SM = EB.StateManager;
var Fight = FT.Fight;
var Weapon = WP.Weapon;

class Unit
{
    //构造函数
    constructor(attr,weaponid)
    {
        this.attr = {
            'name':attr.name || "",
            'hp' : {
                'value':attr.hp || 0,
                'max':attr.maxhp || 0
            },
            'mp' : {
                'value': attr.mp || 0,
                'max':attr.mp || 0
            },
            'atk' : {
                'value':attr.atk || 0,
            },
            'def' : {
                'value':attr.def || 0,
            },
            'aspd' : {
                'value':attr.aspd || 0,
                'min':1
            },
            'spd' : {
                'value':attr.spd || 0,
            },
            'gold' : {
                'value':attr.gold || 0,
            },
            'pos':{
                'value':attr.pos || 0,
            },
        };
        this.idx = attr.aspd.value;
        this.target = null;
        this.fpos = 0;
        this.mcd = 0;
        this.fEnter=0;
        this.format = {'posTxt':"1"};
        if(weaponid==undefined)
        {
            this.weapon = null;
        }
        else
        {
            this.weapon = new Weapon(weaponid);
            this.idx = this.weapon.idx;
        }
    }

    //
    hp()
    {
        return this.getAttr('hp');
    }

    wpName()
    {
        if(this.weapon==null)
        {
            return "拳头";
        }
        else {
            return this.weapon.name;
        }
    }

    getAttr(v)
    {
        return this.attr[v].value;
    }

    name()
    {
        return this.attr.name;
    }

    fightName()
    {
        return this.attr.name;
    }

    getAtkIdx()
    {
        return this.idx;
    }

    setAtkIdx(v)
    {
        this.idx = v;
    }

    atkDis()
    {
        if(this.weapon==null)
        {
            return 2;
        }
        else {
            return this.weapon.atkDis;
        }
    }

    getAspd()
    {
        if(this.weapon==null)
        {
            return this.getAttr('aspd');
        }
        else {
            return this.weapon.aspd;
        }        
    }

    getAtk()
    {
        if(this.weapon==null)
        {
            return this.getAttr('atk');
        }
        else {
            return this.weapon.atk;
        }
    }

    damage(val)
    {
        var hp = this.hp();
        hp = hp - val;
        if(hp<=0)
        {
            hp = 0;
            this.setAttr('hp',hp);
            return -1;
        }
        this.setAttr('hp',hp);
        return 1;
    }

    addAttr(attr , val)
    {
        var n = this.getAttr(attr) + val;
        this.setAttr(attr, n);
    }

    setAttr(attr , val)
    {
        var newVal = val;
        var maxVal = this.getAttrMax(attr);
        var minVal = this.getAttrMin(attr);
        if(newVal < 0) newVal = 0;
        if(maxVal!=undefined&&maxVal>0)
        {
            if(newVal > maxVal) newVal = maxVal;
        }
        if(minVal!=undefined&&minVal>0)
        {
            if(newVal < maxVal) newVal = maxVal;
        }
        this.attr[attr].value = newVal;
        this.onSetAttr(attr ,newVal);
    }
    
    atkWord()
    {
        if(this.weapon==null)
        {
            return "打出一拳";
        }
        else {
            return this.weapon.atkWord;
        }
    }

    getAttrMax(attr)
    {
        var val = this.attr[attr];
        return this.attr[attr].max;
    }

    getAttrMin(attr)
    {
        var val = this.attr[attr];
        return this.attr[attr].min;
    }

    startAtkWrd()
    {
        if(this.weapon==null)
        {
            return "";
        }
        else {
            return this.weapon.startWrd;
        }
    }

    equipWp(id)
    {
        if(Fight.over==0)
        {
            this.weapon = new Weapon(id);
            this.idx = this.weapon.idx;
            this.onEqWp(id);
        }
    }

    unEquipWp()
    {
        if(Fight.over==0)
        {
            this.weapon = null;
            this.idx = this.attr.aspd.value;
            this.onUnEqWp();
        }
    }

    fight(u)
    {
        if(Fight.over==0)
        {
            Fight.start(this,u);
        }
    }

    posFormat()
    {
        this.format.posTxt = $map.mapName(this.attr['pos'].value);
    }

    arriveAt(i)
    {
        Player.setAttr('pos',i);
        Player.posFormat();
    }

    onEqWp(id){}
    onUnEqWp(){}
    onSetAttr(attr ,newVal){}
}

class Ply extends Unit 
{ 
    constructor(attr,weaponid) 
    { 
        super(attr,weaponid); 
    } 

    onSetAttr(attr ,newVal){
        $SM.set('player.'+attr , newVal);
    }

    onEqWp(id){
        $SM.set('player.weapon' , id);
    }

    onUnEqWp(){
        $SM.set('player.weapon' ,undefined);
    }

    fightName()
    {
        return "[ "+this.attr.name+" ]";
    }

    load()
    {
        var v;
        for(v in this.attr)
        {
            if(typeof(this.attr[v])=="object")
                this.attr[v].value = this.getAttr(v);
        }
        this.posFormat();
        var id=$SM.get('player.weapon');
        if(id!=undefined)
            this.equipWp(id);
        else
            this.unEquipWp();
    }

    getAttr(attr)
    {
        var ret = $SM.get('player.'+attr);
        if(ret == undefined)
        {
            var val = this.attr[attr];
            if(val!=undefined)
            {
                $SM.set('player.'+attr , PlyInit[attr]);
            }
            else
            {
                $SM.set('player.'+attr , 0);
            }
        }
        //alert(attr + ' : ' + $SM.get('fighter.'+attr));
        return $SM.get('player.'+attr);
    }
}

var PlyInit = {
    'hp' : 50,
    'maxhp':50,
    'mp' : 20,
    'atk' : 5,
    'def' : 0,
    'aspd' : 3,
    'spd' : 4,
    'gold' : 10,
    'pos':0,
    'name':"冒险者",  
};

var Player = new Ply(PlyInit);
//extend(Player,Unit);

export default { Player , Unit}; 