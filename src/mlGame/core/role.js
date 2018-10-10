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

    new()
    {
        var hpBase = $role.new.hp;
        var atkBase = $role.new.atkBase;
        var spdBase = $role.new.spdBase;
        var defBase = $role.new.defBase;
        var fireBase = $role.new.fire;
        var iceBase = $role.new.ice;
        var poisBase = $role.new.pois;
        this.setAttr('hp', hpBase);
        this.setAttr('hpmax', hpBase);
        this.setAttr('atkBase', atkBase);
        this.setAttr('spdBase', spdBase);
        this.setAttr('defBase', defBase);
        this.setAttr('fireBase', fireBase);
        this.setAttr('iceBase', iceBase);
        this.setAttr('poisBase', poisBase);
        this.name($role.new.name);
        this.lvl($role.new.lvl);
        this.gold($role.new.gold);
        this.setAttr('fskl', []);
        this.attrCheck();
    }

    save()
    {
    	localStorage.role = JSON.stringify(this.attr);
    }

    load(State)
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

var Role = new _role();

export default { Role};