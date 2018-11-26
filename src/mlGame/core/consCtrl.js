
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
    }
}

var conCtrl = 
{
	BuildCon:function(x,y,id,side)
	{
		let $mapCtrl = require('../../mlGame/core/gameMap.js').default.mapCtrl;

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
		if(type!=v.area||$ply.gold()<v.gold)
			return;

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

export default { conCtrl }; 