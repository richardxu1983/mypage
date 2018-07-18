
//unit 类
function Area(data)
{
	this.name = data.name || "未知区域";
	this.pos = data.pos || {'x':0,'y':0};
}

/*
district type:
1:城镇
2:野外
 */

const district = [
{
	id:0,
	name:'守望镇',
	type:1,
	pros:50,
},
]

const AreaList = 
[
{
	id:0,	
	name:'守望镇中心',
	type:1,
	dist:0,
	pos:{'x':1000,'y':1000},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2],
	to:[1,2,3,4],
	npc:[],
},
{
	id:1,	
	name:'守望镇东区',
	type:1,
	dist:0,
	pos:{'x':1001,'y':1000},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2],
	to:[0,2,4],
	npc:[],
},
{
	id:2,	
	name:'守望镇南区',
	type:1,
	dist:0,
	pos:{'x':1000,'y':999},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2],
	to:[0,1,3],
	npc:[],
},
{
	id:3,	
	name:'守望镇西区',
	type:1,
	dist:0,
	pos:{'x':999,'y':1000},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2],
	to:[0,2,4],
	npc:[],
},
{
	id:4,	
	name:'守望镇北区',
	type:1,
	dist:0,
	pos:{'x':1000,'y':1001},
	place:[0,1,2,3],
	act:[0,1,2],
	to:[0,1,3],
	npc:[],
},
]

const plc = [
{
	id:0,
	name:'商店',
},
{
	id:1,
	name:'驿站',
},
{
	id:2,
	name:'土地管理所',
},
{
	id:3,
	name:'旅店',
},
];

var Gmap = {


}



export default { Gmap,district,AreaList,plc }; 