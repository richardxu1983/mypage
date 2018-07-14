
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
	place:[0,1,2,3],
	act:[],
},
{
	id:1,	
	name:'测试地图',
	type:2,
	dist:-1,
	pos:{'x':1001,'y':1000},
	place:[],
	act:[],
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