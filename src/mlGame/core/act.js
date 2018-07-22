
import MpB from '../../mlGame/core/gameMap.js'
import TI from '../../mlGame/core/gTime.js'
import UB from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'
import NPC from '../../mlGame/core/npc.js'
import DT from '../../mlGame/core/gData.js'
var $dt = DT.data;
var $npc = NPC.npc;
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
	npcTalk:false,
	npcId:-1,
	ntStep:-1,
	ntSeg:-1,
	ntIndex:-1,
	ntInfo:"",
	psByEmot:"",
	plyOp:false,
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

var npcTalk = {

	clear:function()
	{
		onAction = false;
		actData.npcTalk = false;
		actData.npcId = -1;
		if(actData.ntInfo)
		{
			$addinfo(actData.ntInfo);
			actData.ntInfo="";
		}
	},

	talk:function(npcId)
	{
		actData.npcTalk = true;
		actData.npcId = npcId;
		actData.ntStep = $npc[actData.npcId].step;
		actData.ntSeg = 0;
		actData.ntIndex = 0;
		actData.ntInfo="";
		if($npc[actData.npcId].d["0"])
			actData.psByEmot = "["+$npc[actData.npcId].d["0"]+"]";
		if(actData.ntStep==1)
			actData.plyOp=true;
		$ti.addHour($dt.npcTkTime);
	},

	talkToPsby:function(area)
	{
		var npcId = MpB.Gmap.pickPsby(area);
		npcTalk.talk(npcId);
	},

	curName:function()
	{
		if(!actData.npcTalk)
			return "";

		return $npc[actData.npcId].name;
	},

	emot:function()
	{
		var i = actData.ntIndex;
		if($npc[actData.npcId].d[i])
			actData.psByEmot = "["+$npc[actData.npcId].d[i]+"]";
	},

	clickOpt:function(v)
	{
		var i = actData.ntIndex;
		actData.ntIndex = $npc[actData.npcId].o[i][v].t;
		actData.ntStep = 0;
		actData.ntSeg = 0;
		actData.plyOp=false;
		if($npc[actData.npcId].o[i][v].i)
			actData.ntInfo = $npc[actData.npcId].o[i][v].i;
		npcTalk.emot();
	},

	segNext:function()
	{
		actData.ntSeg+=1;
	},

	StepNext:function()
	{
		if(actData.ntStep==0)
		{
			actData.ntStep=1;
			actData.plyOp=true;
		}
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
			npcTalk.talkToPsby(area);
		}
		break;
		default:
			onAction = false;
			break;
	}
}

export default { areAct,AreaDoAct,actData,areaGo,npcTalk};