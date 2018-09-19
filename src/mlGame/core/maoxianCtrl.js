import mxd from '../../mlGame/data/maoxian.js'
var $data = mxd.maoxian;
var $mapType = mxd.mapType;
var $world = mxd.world;

var mx = {
	done:false,
	world:0,
	map:[],
};

var maoxianCtrl = {

	new:function()
	{

		maoxianCtrl.genTiles();
		maoxianCtrl.save();
	},

	load:function()
	{
		try 
        {
			var k = JSON.parse(localStorage.maoxian);
			if(k)
			{
				mx.done = k.done;
				mx.world = k.world;
				mx.current = k.current;
				var maxNum = $data.maxMap;
				for(var i=0;i<maxNum;i++)
				{
					mx.map[i] = k.map[i];
				}
			}
		}
		catch(e)
		{
			maoxianCtrl.new();
		}
	},

	save:function()
	{
		localStorage.maoxian = JSON.stringify(mx);
	},

	genTiles:function()
	{
		mx.map = [];
		mx.done = false;
		mx.world = 0;
		mx.current = 0;

		var maxNum = $data.maxMap;
		var ran;
		var mapId;
		var tmpMapId,prob;
		var worldId = mx.world;
		var worldData = $world[worldId];

		for(var i=0;i<maxNum;i++)
		{
			ran = Math.random();
			mapId=0;

			for(var j=0;j<worldData.maps.length;j++)
			{
				tmpMapId = worldData.maps[j].mapId;
				prob = worldData.maps[j].prob;
				if(ran<prob)
				{
					mapId = tmpMapId;
					break;
				}
				else
				{
					ran -= prob;
				}
			}
			mx.map[i] = mapId;
		}
	},

	refresh:function()
	{
		var elm_current = document.getElementById("map_tile_"+mx.current);
		//elm_current.classList.add("current");
	},

	move:function()
	{
		var last = mx.current;
		var elm_last = document.getElementById("map_tile_"+last);
		mx.current++;
		if(mx.current>=$data.maxMap)
			mx.current = 0;
		var elm_current = document.getElementById("map_tile_"+mx.current);
		maoxianCtrl.save();
		//elm_last.classList.remove("current");
		//elm_current.classList.add("current");
	},
}

export default {maoxianCtrl,mx};