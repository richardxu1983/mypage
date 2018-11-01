import UB from '../../mlGame/core/unit.js'
import DT from '../../mlGame/data/gData.js'
import ITM from '../../mlGame/data/item.js'
var $Unit = UB.Unit;
var $role = DT.role;
var $item = ITM.item;

var ui =  
{
    pnl:false,
}

class _role extends $Unit 
{ 
    constructor()
    { 
        super();
        this.attr.bag=[];
        this.setAttr('gold',0);
        this.setAttr('type',99);
    }

    gold(v)
    {
    	if(v!=undefined)
    	{
    		this.setAttr('gold',v);
    	}
    	else
    	{
    		return this.getAttr('gold');
    	}
    }

    bag()
    {
        return this.attr.bag;
    }

    bagAddItem(id)
    {
        var len = this.attr.bag.length;
        var i=0;
        var item;
        var id;
        for(i=0;i<len;i++)
        {
            item = this.attr.bag[i];
            if(item)
            {
                id=item.id;
                if($item[id].stack>item.stack)
                {
                    item.stack++;
                    return;
                }
            }
        }

        if(this.attr.bag.length>=64)
            return;

        this.attr.bag.push({'id':id,'stack':1});
    }

    bagDelItem(index)
    {
        this.attr.bag.splice(index,1);
    }

    bagUseItem(index)
    {
        var it=this.attr.bag[index];
        console.log("index="+index);
        if(it)
        {
            var item=$item[it.id];
            if(item.use==0)
                return;
            if(item.type==0)
            {
                if(item.sub==0)
                {
                    if(this.absorbJS(it.id)==1)
                    {
                        this.bagDelItem(index);
                    }
                }
            }
        }
    }

    new()
    {
        var hpBase = $role.new.hp;
        var atkBase = $role.new.atkBase;
        var mtkBase = $role.new.mtkBase;
        var spdBase = $role.new.spdBase;
        var defBase = $role.new.defBase;
        this.setAttr('hp', hpBase);
        this.setAttr('hpmaxBase', hpBase);
        this.setAttr('atkBase', atkBase);
        this.setAttr('mtkBase', mtkBase);
        this.setAttr('spdBase', spdBase);
        this.setAttr('defBase', defBase);
        this.name($role.new.name);
        this.gold($role.new.gold);
        this.setAttr('fskl', []);
        this.setAttr('ffskl', []);
        this.setAttr('tx', []);
        this.setAttr('ng', []);
        this.setAttr('bag', []);
        this.attr.cl = {type:-1,index:0};    //正在练习的技能
        this.attrCheck();
    }

    save()
    {
    	localStorage.role = JSON.stringify(this.attr);
    }

    load()
    {
    	try 
        {
			var attr = JSON.parse(localStorage.kc);
			if(k)
			{
				this.attr = attr;
			}
		}
		catch(e)
		{
			this.new();
		}
        this.attrCheck();
    }
}

var role = new _role();

export default { role,ui};