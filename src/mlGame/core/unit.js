
const Fight = require('../../mlGame/core/fight.js').default.Fight;
const $wp = require('../../mlGame/data/wpData.js').default.wp;
const skl = require('../../mlGame/data/skill.js').default.FSKL;
const $npc = require('../../mlGame/data/ng.js').default.npc;
const $item = require('../../mlGame/data/item.js').default.item;
const $ng = require('../../mlGame/data/ng.js').default.NG;

class Unit
{
    //构造函数
    constructor()
    {
        //保存属性
        this.attr = 
        {
            'id':0,
            'idx':0,
            'head':"",
            'name':"",
            'type':0,
            'weapon':0,
            'hp' : 0,
            'atkBase' : 0,
            'mtkBase' : 0,
            'defBase' : 0,
            'spdBase' : 0,
            'hpmaxBase':0,
            'fskl':[-1,-1,-1],  //上阵战法
            'zf':[], //所有战法
            'tx':[],    //特性
            'ng':[],    //所掌握内功
            'cl':{type:-1,index:0},    //正在练习的技能
            'pos':{'x':0,'y':0,'m':0},   //位置
            'side':0,
            'gold':0,
        };

        //计算属性
        this.cal = 
        {
            'hpmax' : 0,
            'atk':0,
            'mtk':0,
            'spd':0,
            'def':0,
        };

        //内功附加数值
        this.ng = 
        {
            'atk':0,
            'mtk':0,
            'spd':0,
            'def':0,
            'atkp':0,
            'mtkp':0,
            'spdp':0,
            'defp':0,
        };

        //战斗中的状态数值
        this.ft = 
        {
            round:0,
            eff:[],
            'atk':0,
            'mtk':0,
            'spd':0,
            'def':0,
            'atkp':0,
            'mtkp':0,
            'spdp':0,
            'defp':0,
        };

        this.ftOn = false;
    }

    ftInit()
    {
        this.ft.atk=0;
        this.ft.mtk=0;
        this.ft.spd=0;
        this.ft.def=0;
        this.ft.atkp=0;
        this.ft.mtkp=0;
        this.ft.spdp=0;
        this.ft.defp=0;
    }

    idx(v)
    {
        if(v!=undefined)
        {
            this.setAttr('idx', v)
        }
        else
        {
            return this.getAttr('idx');
        }
    }

    gold(v)
    {
        if(v!=undefined)
        {
            this.setAttr('gold', v)
        }
        else
        {
            return this.getAttr('gold');
        }
    }

    id(v)
    {
        if(v!=undefined)
        {
            this.setAttr('id', v)
        }
        else
        {
            return this.getAttr('id');
        }
    }

    side(v)
    {
        if(v!=undefined)
        {
            this.setAttr('side', v)
        }
        else
        {
            return this.getAttr('side');
        }
    }

    type(v)
    {
        if(v!=undefined)
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
        if(v!=undefined)
        {
            this.setAttr('weapon', v)
        }
        else
        {
            return this.getAttr('weapon');
        }
    }

    head(v)
    {
        if(v!=undefined)
        {
            this.setAttr('head', v)
        }
        else
        {
            return this.getAttr('head');
        }
    }

    //
    hp(v)
    {
        if(v!=undefined)
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
        if(v!=undefined)
        {
            this.setAttr('name', v)
        }
        else
        {
            return this.getAttr('name');
        }
    }

    pos(v)
    {
        if(v)
        {
            this.attr.pos.x=v.x;
            this.attr.pos.y=v.y;
        }
        else
        {
            return this.getAttr('pos');
        }
    }

    moveTo(x,y)
    {

    }

    setPos(x,y)
    {

    }

    fskl()
    {
        return this.getAttr('fskl');
    }

    attrCheck()
    {
        //基础属性
        var atk = this.attr['atkBase'];
        var mtk = this.attr['mtkBase'];
        var hpmax = this.attr['hpmaxBase'];
        var spd = this.attr['spdBase'];
        var def = this.attr['defBase'];

        //武器属性
        atk +=$wp[this.weapon()].atk;

        //内功属性
        atk+=this.ng.atk;
        mtk+=this.ng.mtk;
        spd+=this.ng.spd;
        def+=this.ng.def;

        atk*=(1+this.ng.atkp/100);
        mtk*=(1+this.ng.mtkp/100);
        spd*=(1+this.ng.spdp/100);
        def*=(1+this.ng.defp/100);

        //战斗属性
        if(this.ftOn)
        {
            atk+=this.ft.atk;
            mtk+=this.ft.mtk;
            spd+=this.ft.spd;
            def+=this.ft.def;

            atk*=(1+this.ft.atkp/100);
            mtk*=(1+this.ft.mtkp/100);
            spd*=(1+this.ft.spdp/100);
            def*=(1+this.ft.defp/100);
        }

        //最终属性
        this.setCal('atk', atk);
        this.setCal('mtk', mtk);
        this.setCal('hpmax', hpmax);
        this.setCal('spd', spd);
        this.setCal('def', def);
    }

    addToFtByIdx(idx)
    {

        if(this.attr.zf[idx]==undefined)
            return;

        for(var i=0;i<3;i++)
        {
            if(this.attr.fskl[i]<0)
            {
                this.attr.fskl[i] = idx;
                return;
            }
        }
    }

    addToFtByIdxPos(idx,pos)
    {
        for(var i=0;i<3;i++)
        {
            if(this.attr.fskl[i]==idx&&pos!=i)
            {
                this.attr.fskl[i]=-1;
            }
        }
        this.attr.fskl[pos] = idx;
    }

    addToFtById(id)
    {
        if(!skl[id])
            return;

        var len = this.attr.zf.length;

        if(len<1)
            return;

        var idx=-1;

        for(var i=0;i<len;i++)
        {
            if(this.attr.zf[i].id==id)
            {
                idx=i;
                for(var j=0;j<3;j++)
                {
                    if(this.attr.fskl[j]<0)
                    {
                        this.attr.fskl[j] = idx;
                        return;
                    }
                }
            }
        }
    }

    delFtByIdx(idx)
    {
        this.attr.fskl[idx]=-1;
    }

    delFtByPos(pos)
    {
        this.attr.fskl[pos-1]=-1;
    }

    absorbJS(id)
    {
        var js = $item[id];
        if(js)
        {
            //学习技能类型
            var st = js.data1;
            //内功
            if(st==0)
            {
                var sid = js.data2;//内功id
                if(this.findNg(sid)>=0)  //已存在
                    return -1;
                this.addNg(sid);
                return 1;
            }
            //战法
            if(st==1)
            {
                var sid = js.data2;//战法id
                if(this.findZf(sid)>=0)  //已存在
                    return -1;
                this.addZf(sid);
                return 1;
            }            
        }
        return -1;
    }

    findNg(sid)
    {
        var len=this.attr.ng.length;
        var i=0;
        var v;
        for(i=0;i<len;i++)
        {
            v = this.attr.ng[i];
            if(v.id==sid)
                return i;
        }
        return -1;
    }

    //寻找战法
    findZf(id)
    {
        var len=this.attr.zf.length;
        var i=0;
        var v;
        for(i=0;i<len;i++)
        {
            v = this.attr.zf[i];
            if(v.id==id)
                return i;
        }
        return -1;
    }

    //添加战法
    addZf(id)
    {
        if(this.findZf(id)>=0)
            return;
        if(this.attr.zf.length>=20)
            return;
        this.attr.zf.push({"id":id,"lv":1,"study":0});
    }

    //添加内功
    addNg(id)
    {
        if(this.findNg(id)>=0)
            return;
        if(this.attr.ng.length>=32)
            return;
        this.attr.ng.push({"id":id,"lv":1,"study":0});
        this.ngRecal();
        this.attrCheck();
    }

    ngInit()
    {
        var key;
        for(key in this.ng)
        {
            this.ng[key]=0;
        }
    }

    ngAddLv(id)
    {
        var index = this.findNg(id);
        if(index>=0)
        {
            var ng = this.attr.ng[index];
            ng.lv++;
            ng.study = 0;
            this.ngRecal();
            this.attrCheck();
            return ng.lv;
        }
        return -1;
    }

    zfAddLv(id)
    {
        var index = this.findZf(id);
        if(index>=0)
        {
            var zf = this.attr.zf[index];
            zf.lv++;
            zf.study = 0;
            return zf.lv;
        }
        return -1;
    }

    ngRecal()
    {
        var len=this.attr.ng.length;
        if(len<=0)
            return;

        this.ngInit();

        var i=0;
        var v;
        var id;
        var lv;
        var attr;
        var add=0;
        var key;
        for(i=0;i<len;i++)
        {
            v=this.attr.ng[i];
            id=v.id;
            lv=v.lv;
            attr = JSON.parse($ng[id].attr);
            add = (lv-1)*$ng[id].add;
            for(key in attr)
            {
                this.ng[key]+=attr[key];
                this.ng[key]+=add;
            }
        }
    }

    //月份加一
    onMonthStep()
    {
        var cl = this.attr.cl;

        //如果正在练习内功
        if(cl.type==0)
        {
            var index=cl.index;
            var ng = this.attr.ng[index];
            ng.study++;
            var lv = ng.lv;
            var id = ng.id;
            var lb = $ng[id].lb;
            var lbp = $ng[id].lbp;
            var next = Math.ceil(lb+Math.pow(lbp,lv));
            if(ng.study>=next)
            {
                this.ngAddLv(id);
            }
        }
        //如果正在练习战法
        if(cl.type==1)
        {
            var index=cl.index;
            var zf = this.attr.zf[index];
            zf.study++;
            var lv = zf.lv;
            var id = zf.id;
            var lb = skl[id].lb;
            var lbp = skl[id].lbp;
            var next = Math.ceil(lb+Math.pow(lbp,lv));
            if(zf.study>=next)
            {
                this.zfAddLv(id);
            }
        }
    }

    //改变学习内容
    changeStudy(t,index)
    {
        this.attr.cl.index = index;
        this.attr.cl.type = t;
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

    getCal(v)
    {
        return this.cal[v];
    }

    setCal(k , v)
    {
        this.cal[k] = v;
        this.onSetcal(k ,v);
    }

    atkDis()
    {
        return $wp[this.weapon()].atkDis;
    }

    atk()
    {
        return this.getCal('atk');
    }

    mtk()
    {
        return this.getCal('mtk');
    }

    def()
    {
        return this.getCal('def');
    }

    spd()
    {
        return this.getCal('spd');
    }

    hpmax()
    {
        return this.getCal('hpmax');
    }

    damage(val)
    {
        var hp = this.hp();
        hp = hp - val;
        if(hp<=0)
        {
            this.hp(0);
            return -1;
        }
        this.hp(hp);
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
    onSetcal(k,v){}
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
        var mtk = base.mtk;
        var def = base.def;
        var spd = base.spd;
        this.setAttr('hp',hp);
        this.setAttr('hpmaxBase',hp);
        this.setAttr('atkBase',atk);
        this.setAttr('mtkBase',mtk);
        this.setAttr('spdBase',spd);
        this.setAttr('defBase',def);
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