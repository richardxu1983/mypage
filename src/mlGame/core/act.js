
import MpB from '../../mlGame/core/gameMap.js'
import TI from '../../mlGame/core/gTime.js'
import UB from '../../mlGame/core/unit.js'
var $ply = UB.Player;
var $ti = TI.gtime;
var $area = MpB.AreaList;
var $dist = MpB.district;
var $plc = MpB.plc;

var areAct=[
{
	id:0,
	name:'离开',
	desc:'选择前往的地点',
	t:0,
},
{
	id:1,
	name:'休息一下',
	desc:'也许我需要休息一下了...',
	t:2,
},
{
	id:2,
	name:'睡觉',
	desc:'也许我需要睡一下了...',
	t:8,
},
]

var onAction = false;

var actData = {
	areaGo:false,
	area:-1,
}

function clearAreaGo()
{
	onAction = false;
	actData.areaGo = false;
	actData.area = -1;
}

function gotoArea(p)
{
	var x1 = $area[actData.area].pos.x;
	var y1 = $area[actData.area].pos.y;
	var x2 = $area[p].pos.x;
	var y2 = $area[p].pos.y;
	var hour = Math.ceil(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * 1);
	$ti.addHour(hour);
	clearAreaGo();
	$ply.arriveAt(p);
}

function AreaDoAct(act,area)
{
	if(onAction)
		return;

	onAction = true;

	switch (act) {
		case 0:
			{
				actData.areaGo = true;
				actData.area = area;
			}
			break;
		default:
			onAction = false;
			break;
	}
}

export default { areAct,AreaDoAct,actData,clearAreaGo,gotoArea }; 