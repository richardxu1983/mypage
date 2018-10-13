
import FT from '../../mlGame/core/fight.js'
import SK from '../../mlGame/data/skill.js'
import WPD from '../../mlGame/data/wpData.js'
import DT from '../../mlGame/data/gData.js'
import NPCD from '../../mlGame/data/npc.js'
var Fight = FT.Fight;
var $wp = WPD.wp;
var skl = SK.SKL;
var $npc = NPCD.npc;

class Unit
{
    //构造函数
    constructor()
    {
        this.attr = {
            'id':0,
            'name':"",
            'lvl':1,
            'type':0,
            'weapon':0,
            'hp' : 0,
            'hpmax' : 0,
            'atkBase' : 0,
            'defBase' : 0,
            'fireBase' : 0,
            'iceBase' : 0,
            'poisBase' : 0,
            'spdBase' : 0,
            'atk':0,
            'spd':0,
            'def':0,
            'fire':0,
            'ice':0,
            'pois':0,
            'fskl':[],
        };
    }

    id(v)
    {
        if(v)
        {
            this.setAttr('id', v)
        }
        else
        {
            return this.getAttr('id');
        }
    }

    type(v)
    {
        if(v)
        {
            this.setAttr('type', v)
        }
        else
        {
            return this.getAttr('type');
        }
    }

    weapon(v)
    {
        if(v)
        {
            this.setAttr('weapon', v)
        }
        else
        {
            return this.getAttr('weapon');
        }
    }

    //
    hp(v)
    {
        if(v)
        {
            this.setAttr('hp', v)
        }
        else
        {
            return this.getAttr('hp');
        }
    }

    name(v)
    {
        if(v)
        {
            this.setAttr('name', v)
        }
        else
        {
            return this.getAttr('name');
        }
    }

    lvl(v)
    {
        if(v)
        {
            this.setAttr('lvl', v)
        }
        else
        {
            return this.getAttr('lvl');
        }
    }

    fskl()
    {
        return this.getAttr('fskl');
    }

    attrCheck()
    {
        this.setAttr('atk', $wp[this.weapon()].atk +this.attr['atkBase']);
        this.setAttr('spd', this.attr['spdBase']);
        this.setAttr('def', this.attr['defBase']);
        this.setAttr('fire', this.attr['fireBase']);
        this.setAttr('ice', this.attr['iceBase']);
        this.setAttr('pois', this.attr['poisBase']);
    }

    addSkToFight(id)
    {
        if(skl[id]==undefined)
            return;

        if(this.attr.fskl.length>=3)
            return;

        if(this.attr.fskl.includes(id))
            return;

        this.attr.fskl.push(id);
    }

    getAttr(v)
    {
        return this.attr[v];
    }

    setAttr(attr , val)
    {
        this.attr[attr] = val;
        this.onSetAttr(attr ,val);
    }

    atkDis()
    {
        return $wp[this.weapon()].atkDis;
    }

    atk()
    {
        return this.getAttr('atk');
    }

    def()
    {
        return this.getAttr('def');
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

    equipWp(id)
    {
        if(Fight.over==0)
        {
            this.setAttr('weapon',id);
            this.attrCheck();
            this.onEqWp(id);
        }
    }

    unEquipWp()
    {
        if(Fight.over==0)
        {
            this.setAttr('weapon',0);
            this.attrCheck();
            this.onEqWp(0);
        }
    }

    onEqWp(id){}
    onUnEqWp(){}
    onSetAttr(attr ,newVal){}
}

class Npc extends Unit 
{ 
    constructor(id,weaponid)
    { 
        super();
        this.id(id);
        this.weapon(weaponid);
        this.attrInit();
        this.attrCheck();
        this.name($npc[id].name);
    }

    attrInit()
    {
        var id = this.id();
        var base = $npc[id].attr;
        var hp = base.hp;
        var atk = base.atk;
        var def = base.def;
        var spd = base.spd;
        this.setAttr('hpmax',hp);
        this.setAttr('hp',hp);
        this.setAttr('atkBase',atk);
        this.setAttr('spdBase',spd);
        this.setAttr('defBase',def);
        this.setAttr('fireBase',0);
        this.setAttr('iceBase',0);
        this.setAttr('poisBase',0);
    }
}

//extend(Player,Unit);
var unitCtrl = {
    npcName:function(id)
    {
        return $npc[id].name;
    }
}

export default { Unit , Npc,unitCtrl};