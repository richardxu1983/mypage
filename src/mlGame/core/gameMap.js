
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

var district = [
{
	id:0,
	name:'守望镇',
	type:1,
	pros:50,
	pop:1000,	//人口
	fr:20,		//繁荣度
	publicSecurity:20,	//治安
	commerce:20,	//商业
	industry:20,	//手工业
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
	act:[0,1,2,3],
	to:[1,2,3,4],
	passerby:[0],
},
{
	id:1,	
	name:'守望镇东区',
	type:1,
	dist:0,
	pos:{'x':1001,'y':1000},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2,3],
	to:[0,2,4],
	passerby:[0],
},
{
	id:2,	
	name:'守望镇南区',
	type:1,
	dist:0,
	pos:{'x':1000,'y':999},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2,3],
	to:[0,1,3],
	passerby:[0],
},
{
	id:3,	
	name:'守望镇西区',
	type:1,
	dist:0,
	pos:{'x':999,'y':1000},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2,3],
	to:[0,2,4],
	passerby:[0],
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
	passerby:[0],
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

	pickPsby:function(area)
	{
		return AreaList[area].passerby[0];
	}
}



export default { Gmap,district,AreaList,plc }; 