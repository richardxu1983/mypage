var build = [
{
	id:0,
	name:'商店',
},
];

var construct = 
[
	{
		id:0,
		name:'村镇',
		desc:'村镇会吸引人们来居住，提供劳动力和税收。',
		need:'需要平原',
		gold:0,
		area:0,
		img:'village_0',
	},
	{
		id:1,
		name:'林站',
		desc:'林站能让劳力从树林采集木头',
		need:'需要树林',
		gold:100,
		area:1,
		img:'village_0',
	},
	{
		id:2,
		name:'矿站',
		desc:'矿站能让劳力从矿场采集石头、矿产',
		need:'需要矿场',
		gold:100,
		area:2,
		img:'village_0',
	},
];

export default { build,construct }; 