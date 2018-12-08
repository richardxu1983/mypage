
var mapTile = []
var tileType = 
[
	{
		"id":0,
		"name":"平原",
		"desc":"这是一片平原。",
		"enter":true,
		"maxLv":1,
		"showLv":false,
		"img":"00",
	},
	{
		"id":1,
		"name":"山脉",
		"desc":"这是一片山脉，不可同行和建设。",
		"enter":false,
		"maxLv":1,
		"showLv":false,
		"img":"01",
	},
	{
		"id":2,
		"name":"树林",
		"desc":"这是一片树林，如果建设了林站，可以产出木材和其它少量材料。",
		"enter":true,
		"maxLv":2,
		"showLv":true,
		"img":"02",
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