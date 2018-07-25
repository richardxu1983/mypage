
import MpB from '../../mlGame/core/gameMap.js'
import TI from '../../mlGame/core/gTime.js'
import UB from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'
import NPC from '../../mlGame/core/npcActive.js'

var $addinfo = EB.info.addInfo;
var $ply = UB.Player;
var $ti = TI.gtime;
var $area = MpB.AreaList;
var $dist = MpB.district;
var $plc = MpB.plc;

var areAct=[
{
	id:0,
	name:'离开',
	t:0,
},
{
	id:1,
	name:'休息一下',
	t:2,
},
{
	id:2,
	name:'睡觉',
	t:8,
},
{
	id:3,
	name:'找个路人',
	t:0.5,
},
]

var onAction = false;

var actData = {
	areaGo:false,
	area:-1,
	areaGoProc:false,
	areaTo:-1,
}

var areaGo = {

	clear:function()
	{
		onAction = false;
		actData.areaGo = false;
		actData.area = -1;
		actData.areaGoProc = false;
		actData.areaTo = -1;
	},

	goto:function()
	{
		var x1 = $area[actData.area].pos.x;
		var y1 = $area[actData.area].pos.y;
		var x2 = $area[actData.areaTo].pos.x;
		var y2 = $area[actData.areaTo].pos.y;
		var hour = Math.ceil(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * 1);
		$ti.addHour(hour);
		$ply.arriveAt(actData.areaTo);
		$addinfo(hour+"个小时以后，我来到了"+$area[actData.areaTo].name);
		areaGo.clear();
	},

	confirm:function(p)
	{
		actData.areaGoProc = true;
		actData.areaTo = p;
	}
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
				actData.areaGoProc = false;
				actData.areaTo = -1;
			}
			break;
		case 3:
		{
			NPC.npcTalk.talkToPsby(area);
		}
		break;
		default:
			onAction = false;
			break;
	}
}

function setAction(v)
{
	onAction = v;
}

export default { areAct,AreaDoAct,actData,areaGo,setAction};