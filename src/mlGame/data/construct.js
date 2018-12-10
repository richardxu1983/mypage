var names = {
	'food':"粮食",
	'wood':"木材",
	'iron':"生铁",
};

var construct = 
[
	{
		id:0,
		name:'据点',
		desc:'据点一定范围以内会成为您的边界，边界内占领的土地才能进行建造',
		need:'需要平原',
		gold:0,
		area:0,
		img:'village_0',
		type:0,				//据点类型
	},
	{
		id:1,
		name:'村镇',
		desc:'村镇会吸引人们来居住，提供劳动力和税收。',
		need:'需要平原',
		gold:0,
		area:0,
		img:'village_0',
		type:1,				//村庄类型
	},
	{
		id:2,
		name:'田地',
		desc:'田地能产出粮食、草药及其它作物，需要劳工',
		need:'需要树林',
		gold:20,
		area:0,
		img:'crop_0',
		type:2,			//需要工人产出类型
		work:
		{
			worker:5,
			max:100,
			type:'food',
		},
	},
	{
		id:3,
		name:'林站',
		desc:'林站从树林产出木材，和其它的东西',
		need:'需要树林',
		gold:20,
		area:0,
		img:'crop_0',
		type:2,		//需要工人产出类型
		work:
		{
			worker:5,
			max:10,
			type:'wood',
		},
	},
	{
		id:4,
		name:'矿站',
		desc:'矿站能让劳力从矿场采集石头、矿产',
		need:'需要矿场',
		gold:100,
		area:2,
		img:'village_0',
		type:2,			//需要工人产出类型
		work:
		{
			worker:5,
			max:10,
			type:'iron',
		},
	},
];

export default { names,construct }; 