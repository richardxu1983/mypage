
const $condt = require('../../mlGame/data/construct.js').default.construct;

const $ply = require('../../mlGame/core/role.js').default.role;

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
		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;
		let $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;

		var v = $condt[id];
		if(!v)
			return;
		let m = $mapCtrl.getMapByPos(x, y);
		let own = m.data.ownBy;

		if(own!=side)
			return;
		if(m.data.con!=-1)
			return;
		let type = m.data.type;
		let p = $prop.get(side);

		if(p==undefined)
			return;

		if(type!=v.area||p.gold()<v.gold)
			return;

		console.log(p);
		p.ad('gold',-1*v.gold);

		if(conSide[side]==undefined)
			conSide[side] = [];

		var con = new cot({'id':id,'side':side,'idx':m.data.idx});
		var len = cons.push(con);
		m.data.con = len-1;
		conSide[side].push(len-1);
	},

	getConByIdx(idx)
	{
		return cons[idx];
	}
};

export default { conCtrl,conSide }; 