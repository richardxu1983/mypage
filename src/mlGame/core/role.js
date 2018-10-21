import UB from '../../mlGame/core/unit.js'
import DT from '../../mlGame/data/gData.js'
var $Unit = UB.Unit;
var $dt = DT.data;
var $role = DT.role;

class _role extends $Unit 
{ 
    constructor()
    { 
        super();
        this.setAttr('gold',0);
        this.setAttr('type',99);
    }

    gold(v)
    {
    	if(v)
    	{
    		this.setAttr('gold',v);
    	}
    	else
    	{
    		return this.getAttr('gold');
    	}
    }

    new()
    {
        var hpBase = $role.new.hp;
        var atkBase = $role.new.atkBase;
        var mtkBase = $role.new.mtkBase;
        var spdBase = $role.new.spdBase;
        var defBase = $role.new.defBase;
        var fireBase = $role.new.fire;
        var iceBase = $role.new.ice;
        var poisBase = $role.new.pois;
        this.setAttr('hp', hpBase);
        this.setAttr('hpmaxBase', hpBase);
        this.setAttr('atkBase', atkBase);
        this.setAttr('mtkBase', mtkBase);
        this.setAttr('spdBase', spdBase);
        this.setAttr('defBase', defBase);
        this.setAttr('fireBase', fireBase);
        this.setAttr('iceBase', iceBase);
        this.setAttr('poisBase', poisBase);
        this.name($role.new.name);
        this.gold($role.new.gold);
        this.setAttr('fskl', []);
        this.setAttr('ffskl', []);
        this.setAttr('tx', []);
        this.setAttr('ng', []);
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

export default { role};