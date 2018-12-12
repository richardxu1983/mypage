
const $condt = require('../../mlGame/data/construct.js').default.construct;

var cons = [];
var conSide = [];

class cot
{ 
    constructor(data)
    { 
    	this.data = {};
    	this.data.id = data.id;
    	this.data.ownBy = data.side;
    	this.data.map = data.idx;
    	this.data.num1 = 0;	//当作为产出时，为工人数量，当作为村庄时
    	this.data.num2 = 0;
    	this.data.num3 = 0;
    	this.data.num4 = 0;
    }
}

var conCtrl = 
{
	BuildCon:function(x,y,id,side)
	{
		if(!conCtrl.canBuild(x,y,id,side))
			return;

		let $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;
		let v = $condt[id];
		let p = $prop.get(side);
		if(v.gold!=0)
		{
			p.ad('gold',-1*v.gold);
		}
		
		if(conSide[side]==undefined)
			conSide[side] = [];

		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;
		let m = $mapCtrl.getMapByPos(x, y);
		let con = new cot({'id':id,'side':side,'idx':m.data.idx});
		let len = cons.push(con);
		m.data.con = len-1;
		conSide[side].push(len-1);
		conCtrl.afterBuild(x,y,id,side);
	},

	BuildConForce:function(x,y,id,side)
	{
		if(conSide[side]==undefined)
			conSide[side] = [];

		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;
		let m = $mapCtrl.getMapByPos(x, y);
		let con = new cot({'id':id,'side':side,'idx':m.data.idx});
		let len = cons.push(con);
		m.data.con = len-1;
		m.data.ownBy = side;
		conSide[side].push(len-1);
		conCtrl.afterBuild(x,y,id,side);
	},

	afterBuild(x,y,id,side)
	{
		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;
		if($condt[id].type==0)
		{
			let range = $condt[id].range;
			let m;

			for(let i=x-range;i<=x+range;i++)
			{
				for(let j=y-range;j<=y+range;j++)
				{
					if($mapCtrl.inMap(i,j))
					{
						if((x-i)*(x-i)+(y-j)*(y-j)<=range*range)
						{
							m = $mapCtrl.getMapByPos(i, j);
							if(m.data.in==0)
								m.data.in=side;
						}
					}
				}
			}

			$mapCtrl.renderBorder();
		}
	},

	canBuild(x,y,id,side)
	{
		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;
		let $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;
		let v = $condt[id];

		if(!v)
			return false;

		let m = $mapCtrl.getMapByPos(x, y);
		let own = m.data.ownBy;
		let bin = m.data.in;

		if(own!=side||bin!=side)
			return false;

		if(m.data.con!=-1)
			return false;
		
		let type = m.data.type;
		let p = $prop.get(side);

		if(p==undefined)
			return false;

		if(type!=v.area||p.gold()<v.gold)
			return false;
		return true;
	},

	getConByIdx(idx)
	{
		return cons[idx];
	},
};

export default { conCtrl,conSide }; 