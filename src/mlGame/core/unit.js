
import EB from '../../mlGame/core/engine.js'
import FT from '../../mlGame/core/fight.js'
import WP from '../../mlGame/core/weapon.js'
import SK from '../../mlGame/data/skill.js'
import WPD from '../../mlGame/data/wpData.js'
import DT from '../../mlGame/data/gData.js'
import NPCD from '../../mlGame/data/npc.js'
var $dt = DT.data;
var $SM = EB.StateManager;
var Fight = FT.Fight;
var Weapon = WP.Weapon;
var $wp = WPD.wp;
var skl = SK.SKL;
var $npc = NPCD.npc;

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
            'lvl':{
                'value':attr.lvl || 1,
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

    setAttrMax(attr,v)
    {
        this.attr[attr].max = v;
    }

    hpMaxAdd(v)
    {
        var hpmax = this.getAttrMax('hp');
        hpmax+=v;
        var hp = this.hp();
        hp+=v;
        this.setAttrMax('hp', hpmax);
        this.setAttr('hp', hp);
    }

    mpMaxAdd(v)
    {
        var mpmax = this.getAttrMax('mp');
        mpmax+=v;
        var mp = this.getAttr('mp');
        mp+=v;
        this.setAttrMax('mp', mpmax);
        this.setAttr('mp', mp);
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

    arriveAt(i)
    {
        Player.setAttr('pos',i);
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
        this.attr.gold = 
        {
            'value':attr.gold || 0,
        }
        this.attr.unUsed = 
        {
            'value':0,
        }
    }

    lvl()
    {
        return this.getAttr('lvl');
    }

    lvlUp()
    {
        var lvl = this.lvl();
        if(lvl<$dt.plyMaxLevel)
        {
            lvl++;
            this.setAttr('lvl', lvl);
            var unUsed = this.getAttr('unUsed');
            unUsed+=$dt.plyLvlupPnts;
            this.setAttr('unUsed', unUsed);
            this.hpMaxAdd($dt.plyLvlUpAdd.hp);
            this.mpMaxAdd($dt.plyLvlUpAdd.mp);
        }
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
                //alert(attr + ' : ' + $dt.plyInit[attr]);
                $SM.set('player.'+attr , $dt.plyInit[attr]);
            }
            else
            {
                $SM.set('player.'+attr , 0);
            }
        }
        //alert(attr + ' : ' + $SM.get('player.'+attr));
        return $SM.get('player.'+attr);
    }
}

class Npc extends Unit 
{ 
    constructor(attr,id,qulity,weaponid)
    { 
        super(attr,weaponid);
        this.id = id;
        this.qulity = qulity;
        this.attrInitByLvl();
    }

    attrInitByLvl()
    {
        var lvl = this.getAttr('lvl');
        var q = this.qulity;
        var hp = lvl*(5+qulity)+100+10*qulity;
        var mp = lvl*(5+qulity)+100+10*qulity;
        var str = 20+lvl*(1+qulity)+2*qulity;
        var def = lvl*(1+qulity)+2*qulity;
        this.setAttrMax('hp',hp);
        this.setAttr('hp',hp);
        this.setAttrMax('mp',mp);
        this.setAttr('mp',mp);
        this.setAttr('str',str);
        this.setAttr('agi',20);
        this.setAttr('spd',1);
        this.setAttr('def',def);
    }
}

var Player = new Ply($dt.plyInit,0);
//extend(Player,Unit);
var unitCtrl = {
    npcName:function(id)
    {
        return $npc[id].name;
    }
}

export default { Player , Unit , Npc,unitCtrl}; 