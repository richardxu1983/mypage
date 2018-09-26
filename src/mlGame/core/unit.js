
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
            'hp' : 
            {
                'value':attr.hp || 0,
            },
            'hpmax' : 
            {
                'value':attr.hp || 0,
            },
            'atk' : {
                'value':0,
            },
            'atkBase' : {
                'value':attr.atkBase || 0,
            },
            'def' : {
                'value':0,
            },
            'defBase' : {
                'value':attr.defBase || 0,
            },
            'mtk' : {
                'value':0,
            },
            'mtkBase' : {
                'value':attr.mtkBase || 0,
            },
            'spd' : {
                'value':0,
            },
            'spdBase' : {
                'value':attr.spdBase || 0,
            },
            'lvl':{
                'value':attr.lvl || 1,
            },
        };

        this.Type = 0;

        this.sk = [];   //全部学习技能
        this.skf = [];  //携带到战斗的技能
        this.skd = {};
        this.skSlot = [];
        for(var i=0;i<15;i++)
        {
            this.skSlot[i]=[];
        }

        if(weaponid==undefined||(weaponid==-1))
        {
            this.weapon = new Weapon(0);
        }
        else
        {
            this.weapon = new Weapon(weaponid);
        }
    }

    attrCheck()
    {
        this.setAttr('atk', $wp[this.weapon.id].atk +this.attr['atkBase'].value);
        this.setAttr('mtk', $wp[this.weapon.id].mtk +this.attr['mtkBase'].value);
        this.setAttr('spd', this.attr['spdBase'].value);
        this.setAttr('def', this.attr['defBase'].value);
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
        return "【"+this.attr.name+"】";
    }
    lvl()
    {
        return this.getAttr('lvl');
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
        return this.attr['atk'].value;
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
        this.attr[attr].value = val;
        this.onSetAttr(attr ,val);
    }
    
    atkWord()
    {
        return $wp[this.weapon.id].atkWord;
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
            this.attrCheck();
            this.onEqWp(id);
        }
    }

    unEquipWp()
    {
        if(Fight.over==0)
        {
            this.weapon = new Weapon(0);
            this.idx = $wp[this.weapon.id].idx;
            this.attrCheck();
            this.onEqWp(0);
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
            'value':$dt.plyBeginGold,
        };
        this.attr.exp = 
        {
            'value':$dt.plyBeginExp,
        };
        this.Type = 99;
    }

    exp()
    {
        return this.getAttr('exp');
    }

    setExp(v)
    {
        this.setAttr('exp', v);
    }

    expAdd(v)
    {
        if(v<=0)
            return;

        var exp = this.exp();
        exp+=v;
        var lvl = this.lvl();
        var nextLvl = lvl+1;
        var nextExp = 0;
        this.setExp(exp);

        while(true)
        {
            if(this.lvl()>=$dt.plyMaxLevel)
                break;

            nextExp = (nextLvl*nextLvl)*75;
            
            if(exp>=nextExp)
            {
                lvl++;
                this.lvlUp();
                nextLvl = lvl+1;
            }
            else
            {
                break;
            }
        }
    }

    lvlUp()
    {
        var lvl = this.lvl();
        if(lvl<$dt.plyMaxLevel)
        {
            lvl++;
            this.setAttr('lvl', lvl);

            var hpBase = $dt.plyInit.hpmax;
            var atkBase = $dt.plyInit.atkBase;
            var mtkBase = $dt.plyInit.mtkBase;
            var spdBase = $dt.plyInit.spdBase;

            var hpmax = $dt.plyLvlUpAdd.hp*(lvl-1) + hpBase;
            var atk = $dt.plyLvlUpAdd.atk*(lvl-1) + atkBase;
            var mtk = $dt.plyLvlUpAdd.mtk*(lvl-1) + mtkBase;
            var spd = $dt.plyLvlUpAdd.spd*(lvl-1) + spdBase;

            this.setAttr('hpmax', hpmax);
            this.setAttr('hp', this.hp()+$dt.plyLvlUpAdd.hp);
            this.setAttr('atkBase', atk);
            this.setAttr('mtkBase', mtk);
            this.setAttr('spdBase', spd);
        }
        this.attrCheck();
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
        $SM.set('player.weapon' ,0);
    }

    fightName()
    {
        return "【你】";
    }

    new()
    {
        var hpBase = $dt.plyInit.hpmax;
        var atkBase = $dt.plyInit.atkBase;
        var mtkBase = $dt.plyInit.mtkBase;
        var spdBase = $dt.plyInit.spdBase;
        var defBase = $dt.plyInit.defBase;
        this.setAttr('hp', hpBase);
        this.setAttr('hpmax', hpBase);
        this.setAttr('atkBase', atkBase);
        this.setAttr('mtkBase', mtkBase);
        this.setAttr('spdBase', spdBase);
        this.setAttr('defBase', defBase);
        this.setAttr('lvl', 1);
        this.setAttr('exp', $dt.plyBeginExp);
        this.setAttr('gold', $dt.plyBeginGold);
        this.equipWp(0);
        this.sk = [];   //全部学习技能
        this.skf = [];  //携带到战斗的技能
    }

    load(State)
    {
        var v;
        for(v in this.attr)
        {
            if(typeof(this.attr[v])=="object")
                this.attr[v].value = this.loadAttr(v);
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
        this.attrCheck();
    }

    loadAttr(v)
    {
        var ret = $SM.get('player.'+v);
        if(ret == undefined)
        {
            ret = this.attr[v].value;
            $SM.set('player.'+v , ret);
        }
        return $SM.get('player.'+v);
    }

    getAttr(attr)
    {
        return this.attr[attr].value;
    }
}

class Npc extends Unit 
{ 
    constructor(id,weaponid)
    { 
        super({},weaponid);
        this.id = id;
        this.attr.lvl.value = $npc[id].lvl;
        this.attrInitByLvl();
        this.attrCheck();
        this.attr.name = $npc[id].name;
    }

    attrInitByLvl()
    {
        var lvl = this.getAttr('lvl');
        var id = this.id;
        var base = $npc[id].attr.base;
        var up = $npc[id].attr.up;
        var hp = base.hp+lvl*(up.hp);
        var atk = base.atk+lvl*(up.atk);
        var mtk = base.mtk+lvl*(up.mtk);
        var def = base.def+lvl*(up.def);
        var spd = base.spd+lvl*(up.spd);
        this.setAttr('hpmax',hp);
        this.setAttr('hp',hp);
        this.setAttr('atkBase',atk);
        this.setAttr('mtkBase',mtk);
        this.setAttr('spdBase',spd);
        this.setAttr('defBase',def);
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