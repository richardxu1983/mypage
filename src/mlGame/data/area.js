
var mapTile = []
var tileType = 
[
	{
		"id":0,
		"name":"平原",
		"enter":true,
		"maxLv":1,
		"showLv":false,
	},
	{
		"id":1,
		"name":"山脉",
		"enter":false,
		"maxLv":1,
		"showLv":false,
	},
	{
		"id":2,
		"name":"树林",
		"enter":true,
		"maxLv":2,
		"showLv":true,
	},
];

//平原
mapTile[0] = []
mapTile[0][0] = {tile:"00"};

//山脉
mapTile[1] = []
mapTile[1][0] = {tile:"10"};

//树林
mapTile[2] = []
mapTile[2][0] = {tile:"20"};	//一级树林
mapTile[2][1] = {tile:"21"};	//二级树林

export default { tileType,mapTile }; 