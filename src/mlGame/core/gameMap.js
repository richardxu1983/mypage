

var maps = [];
const MAXCELL = 50;

class map
{ 
    constructor(data)
    { 
    	this.data = {};
    	this.data.x = data.x;
    	this.data.y = data.y;
    	this.data.type = data.type;
    	this.data.units = [];
    	this.data.idx = data.x*MAXCELL+data.y;
    }

    addUnit(v)
    {
    	return (this.data.units.push(v)-1);
    }

    delUnitByIdx(idx)
    {
    	this.data.units.splice(idx,1);
    }
}

class _mapCtrl 
{
	constructor()
	{
		this.cutPos = {'x':0,'y':0};
	}

	getMax()
	{
		return MAXCELL;
	}

	new()
	{

	}

	load()
	{

	}

	getCutPos()
	{
		return this.cutPos;
	}

	setCutPos(x,y)
	{
		this.cutPos.x = x;
		this.cutPos.y = y;
	}

	getMapByPos(x,y)
	{
		return maps[x*MAXCELL+y];
	}

	insertMap(map)
	{
		maps[map.idx] = map;
	}

	genMapAtPos(x,y,type)
	{
		var m = new map({'x':x,'y':y,'type':type});
		this.insertMap(m);
	}

	addUnitToPos(x,y,u)
	{
		var m = this.getMapByPos(x, y);
		if(m==undefined)
			return -1;
		return m.addUnitToPos(u.idx());
	}

	delUnitAtByIdx(x,y,idx)
	{
		var m = this.getMapByPos(x, y);
		m.delUnitByIdx(idx);
	}

	genMapArea(x,y,r)
	{
		for(var i=x-r;i<=x+r;i++)
		{
			for(var j=y-r;j<=y+r;j++)
			{
				this.genMapAtPos(i, j, 0);
			}
		}
	}

	genNew()
	{
		this.genMapArea(25,25,5);
	}
}

var mapCtrl = new _mapCtrl();

export default { mapCtrl };