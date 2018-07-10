
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'
import FT from '../../mlGame/core/fight.js'
import WP from '../../mlGame/core/weapon.js'
import SK from '../../mlGame/core/skill.js'

var $map = MpB.Gmap;
var $SM = EB.StateManager;
var Fight = FT.Fight;
var Weapon = WP.Weapon;
var $wp = WP.wp;
var skl = SK.SKL;

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
            'str' : {
                'value':attr.str || 0,
            },
            'def' : {
                'value':attr.def || 0,
            },
            'agi' : {
                'value':attr.agi || 0,
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

        this.sk = [];   //全部学习技能
        this.skf = [];  //携带到战斗的技能
        this.skd = {};
        this.skSlot = [];
        for(var i=0;i<15;i++)
        {
            this.skSlot[i]=[];
        }

        this.idx = 2;
        this.target = null;
        this.fpos = 0;
        this.mcd = 0;
        this.fEnter=0;
        this.format = {'posTxt':"1"};

        if(weaponid==undefined||(weaponid==-1))
        {
            this.weapon = new Weapon(0);
        }
        else
        {
            this.weapon = new Weapon(weaponid);
        }
        this.idx = $wp[this.weapon.id].idx;
    }

    addSkToFight(id)
    {
        if(skl[id]==undefined)
            return;

        if(this.skf.includes(id))
            return;

        this.skf.push(id);

        this.skd[id]={cd:-100,ct:0};
        var tg = skl[id].tg;

        this.skSlot[tg].push(id);
        this.onadSTF(id);
    }

    initSk()
    {
        var i,len,id;
        for(i = 0,len=this.skf.length; i < len; i++) 
        {
            id=this.skf[i];
            this.skd[id]={cd:-100,ct:0};
        }
    }

    onadSTF(id){}

    //
    hp()
    {
        return this.getAttr('hp');
    }

    wpName()
    {
        return $wp[this.weapon.id].name;
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
        return $wp[this.weapon.id].atkDis;
    }

    getAspd()
    {
        return $wp[this.weapon.id].aspd;
    }

    getAtk()
    {
        return Math.ceil($wp[this.weapon.id].atk * (1+this.attr[$wp[this.weapon.id].ka].value*$wp[this.weapon.id].kaa));
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
        return $wp[this.weapon.id].atkWord;
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
        return $wp[this.weapon.id].startWrd;
    }

    equipWp(id)
    {
        if(Fight.over==0)
        {
            this.weapon = new Weapon(id);
            this.idx = $wp[this.weapon.id].idx;
            this.onEqWp(id);
        }
    }

    unEquipWp()
    {
        if(Fight.over==0)
        {
            this.weapon = new Weapon(0);
            this.idx = $wp[this.weapon.id].idx;
            this.onEqWp(0);
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

    onadSTF(id){
        $SM.setArray('player.skf', id);
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

    load(State)
    {
        var v;
        for(v in this.attr)
        {
            if(typeof(this.attr[v])=="object")
                this.attr[v].value = this.getAttr(v);
        }
        this.posFormat();

        //load weapon
        var id=$SM.get('player.weapon');
        if(id!=undefined)
            this.equipWp(id);
        else
            this.equipWp(0);

        //load skill
        this.skf=[];
        if(State!=undefined&&State["player.skf"]!=undefined)
        {
            var j,len;
            for(j = 0,len=State["player.skf"].length; j < len; j++) 
            {
                this.skf[j] = State["player.skf"][j];
            }           
        }  
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
    'str' : 20,
    'def' : 0,
    'agi' : 3,
    'spd' : 4,
    'gold' : 10,
    'pos':0,
    'name':"冒险者",  
};

var Player = new Ply(PlyInit,0);
//extend(Player,Unit);

export default { Player , Unit}; 