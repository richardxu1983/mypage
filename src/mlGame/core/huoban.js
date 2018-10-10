
//
var plyHuoban = [];

var plyHuobanIndex = [];

var huoban = {

	new:function()
	{

	},

	load:function()
	{

	},

	save:function()
	{

	},

	add:function(id)
	{

		if(plyHuobanIndex[id]==1)
			return;

		var n = {}
		var index = plyHuoban.push(n);
		var v = plyHuoban[index-1];
		v.index = (index-1);
		v.id = id;

		plyHuobanIndex[id] = 1;
	}

}