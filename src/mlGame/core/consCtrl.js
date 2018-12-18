
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
    	this.data.lv = 1;
    	this.data.num1 = 0;	
    	this.data.num2 = 0;
    	this.data.num3 = 0;
    	this.data.num4 = 0;
    }
}

var conCtrl = 
{
	BuildCon:function(x,y,id,side)
	{

	},

	BuildConForce:function(x,y,id,side)
	{

	},

	afterBuild(x,y,id,side)
	{

	},

	canBuild(x,y,id,side)
	{

	},

	getConByIdx(idx)
	{
		return cons[idx];
	},
};

export default { conCtrl,conSide }; 