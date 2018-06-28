
//unit 类
function Area(data)
{
	this.name = data.name || "未知区域";
	this.pos = data.pos || {'x':0,'y':0};
}

const AreaList = 
[

{'id':0,	'name':'森林小镇',	'pos':{'x':1000,	'y':1000}	},
{'id':1,	'name':'测试地图',	'pos':{'x':1001,	'y':1000}	},
]

var Gmap = {

	map:[],

	loadMap:function()
	{
		var i
		for (i = 0; i < AreaList.length; i++)
		{
			Gmap.map[i] = new Area(AreaList[i]);
		}
	},

	mapName:function(i)
	{
		return Gmap.map[i].name;
	}
}



export default { Gmap }; 