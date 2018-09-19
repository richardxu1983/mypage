

var maoxian = {
	maxMap:7,
}

var mapType = [];
mapType[0] = {
	name:"草原",
	mob:100,
}
mapType[1] = {
	name:"树林",
	mob:100,
}

var world = [];
world[0] = 
{
	maps:
	[
	{mapId:0,prob:0.7,},
	{mapId:1,prob:0.3,},
	],
}

export default {maoxian,mapType,world};