
var AreaData = [];
var grid = [];
AreaData[0] = {
	id:0,	
	name:'守望村',
	type:1,
	dist:0,
	pos:{'x':100,'y':100},
	place:[{id:0},{id:1},{id:2},{id:3}],
	act:[0,1,2,3],
	to:[1,2,3],
	passerby:[0,1,2],
	passerbyProb:[0.1,0.3,0.4],
};
AreaData[1] = {
	id:1,	
	name:'野猪林',
	type:1,
	dist:0,
	pos:{'x':100,'y':98},
	place:[],
	act:[0,1,2],
	to:[0],
};
AreaData[2] = {
	id:2,	
	name:'守望农场',
	type:1,
	dist:0,
	pos:{'x':102,'y':100},
	place:[],
	act:[0,1,2],
	to:[0],
};
AreaData[3] = {
	id:3,	
	name:'南部荒野',
	type:1,
	dist:0,
	pos:{'x':100,'y':103},
	place:[],
	act:[0,1,2],
	to:[0],
};
export default { AreaData }; 