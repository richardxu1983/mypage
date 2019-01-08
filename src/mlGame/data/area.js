/**
 * block：地块
 * 地块类型
 * 0:未分配
 * 1:居民区
 * 2:农业区
 * 3:生产区
 * 4:原材料产出区（树林、矿场）
 * 99:不可到达区
 */

const typeName = [];
typeName[0] = {name:"未分配建设类型",desc:"这个地块还没有被分配建设类型，必须分配建设类型后才能进行建设，下面是可以分配的类型：",to:[1,2,3],}
typeName[1] = 
{
	name:"居民区",
	desc:"居民区可以建设居民区、市场、商店等，为居民提供住所和服务",
	to:[],
	img:
	[
		{pop:50,img:"3"},
		{pop:30,img:"2"},
		{pop:10,img:"1"},
		{pop:1,img:"0"},
	],
};
typeName[2] = {name:"农业区",desc:"农业区可以建设农田、果园等，提供粮食",to:[],};
typeName[3] = {name:"手工业区",desc:"生产区可以建设工坊等建筑物，生产区会降低附近一格居民区的人气",to:[],};
typeName[4] = {name:"原材料产出区",to:[],};
typeName[99] = {name:"不可到达区",to:[],};

const block = 
[
	{
		id:0,
		name:"小片空地",
		desc:"这是一片小平原，有9个可建设的地块",
		enter:true,
		type:0,
		img:"00",
		width:3,
		cell:true,
	},
	{
		id:1,
		name:"空地",
		desc:"这是一片平原，有16个可建设的地块",
		enter:true,
		width:5,
		type:0,
		img:"00",
		cell:true,
	},
	{
		id:2,
		name:"大片空地",
		desc:"这是一片平原，有25个可建设的地块",
		enter:true,
		width:7,
		type:0,
		img:"00",
		cell:true,
	},
	{
		id:3,
		name:"山脉",
		desc:"这是一片山脉，不可同行和建设。",
		enter:false,
		width:0,
		type:99,
		img:"01",
		cell:false,
	},
	{
		id:4,
		name:"稀疏的树林",
		desc:"这是一片树林，有少量的树木",
		enter:true,
		width:4,
		type:4,
		img:"02",
		cell:false,
	},
	{
		id:5,
		name:"树林",
		desc:"这是一片树林，有一些树木",
		enter:true,
		width:4,
		type:4,
		img:"02",
		cell:false,
	},
	{
		id:6,
		name:"茂密树林",
		desc:"这是一片茂密的树林，有大量树木",
		enter:true,
		width:5,
		type:4,
		img:"06",
		cell:false,
	},
];


const cell = 
[
	{
		id:0,
		name:"平地",
		desc:"这是一片平地，可用于建设",
		build:true,
		img:"00",
	},
	{
		id:1,
		name:"树木",
		desc:"这是一颗树木，可被伐木场手机",
		build:false,
		img:"02",
	},
];

export default { block,cell,typeName }; 