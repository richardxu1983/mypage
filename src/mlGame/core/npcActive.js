import DT from '../../mlGame/data/gData.js'
import NPC from '../../mlGame/data/npc.js'
import ACT from '../../mlGame/core/act.js'
import MpB from '../../mlGame/core/gameMap.js'
import TI from '../../mlGame/core/gTime.js'
import EB from '../../mlGame/core/engine.js'
var $addinfo = EB.info.addInfo;
var $ti = TI.gtime;
var $npc = NPC.npc;
var $ply = NPC.plyAsk;
var $ans = NPC.npcAns;
var $dt = DT.data;

var actData = {
	npcTalk:false,
	npcId:-1,
	ntStep:-1,
	ntSeg:-1,
	ntIndex:-1,
	to:-1,
	plyId:-1,
	ansId:-1,
	ntInfo:"",
	dlg:-1,
	ntCtn:false,
	psByEmot:"",
	plyOp:false,
}

function ShowNpc()
{
	var expr = $ans[actData.ansId][actData.ntIndex].expr;
	if(expr)
		actData.psByEmot = "["+expr+"]";
}

var npcTalk = {

	talkToPsby:function(area)
	{
		var npcId = MpB.Gmap.pickPsby(area);
		if(npcId>=0)
		{
			npcTalk.talk(npcId);
		}
		else
		{
			actData.npcTalk = true;
			actData.npcId = -1;
			actData.psByEmot="";
		}
		npcTalk.refreshCtn();
	},

	clear:function()
	{
		ACT.setAction(false);
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

		var dlgId = $npc[actData.npcId].dlg;
		actData.dlg = dlgId;
		actData.ntStep = 0;
		actData.ntSeg = 0;
		actData.plyId = $npc[actData.npcId].plyAsk;
		actData.ansId = $npc[actData.npcId].ans;
		actData.ntIndex = NPC.npcDlg[dlgId].start;
		actData.to = $ans[actData.ansId][actData.ntIndex].t;
		actData.ntInfo="";
		actData.plyOp=false;

		$ti.addHour($dt.npcTkTime);

		ShowNpc();
	},

	refreshCtn:function()
	{
		if(actData.npcId>=0)
		{
			var i = actData.ntIndex;
			var step = actData.ntStep;
			if(step==0)
			{
				actData.ntCtn = true;
				return;
			}
			else
			{
				if($ply[actData.plyId][actData.to].length==1)
				{
					actData.ntCtn = true;
					return;
				}

			}
			actData.ntCtn = false;				
		}
		else
		{
			actData.plyOp=false;
			actData.ntCtn = true;
		}
	},

	getDesc:function()
	{
		if(actData.npcId>=0)
		{
			var d = $npc[actData.npcId].desc;
			var wp = $npc[actData.npcId].wp;
			if(wp<=0)
			{
				d+="，没有装备什么武器";
			}
			else
			{
				d+="，带了一"+WP.wpL[wp]+WP.wpQ[$wp[wp].quality]+"的"+WP.wpType[$wp[wp].type];
			}
			return d;				
		}
		else
		{
			return "附近没有什么人，也许过些时候来会有人。"
		}
	},
	curName:function()
	{
		if(!actData.npcTalk)
			return "";

		if(actData.npcId>=0)
			return $npc[actData.npcId].name;
		else
			return "";
	},

	clickOpt:function(v)
	{
		var i = actData.ntIndex;
		var ply = actData.plyId;
		var to = actData.to;
		var index = to+""+v;
		var dlgId = actData.dlg;
		actData.ntIndex = NPC.npcDlg[dlgId].pair[index];
		actData.ntStep = 0;
		actData.ntSeg = 0;
		actData.plyOp=false;
		if($ans[actData.ansId][actData.ntIndex].i)
			actData.ntInfo = $ans[actData.ansId][actData.ntIndex].i;
		ShowNpc();
		npcTalk.refreshCtn();
	},

	segNext:function()
	{
		actData.ntSeg+=1;
		npcTalk.refreshCtn();
	},

	StepNext:function()
	{
		if(actData.ntStep==0)
		{
			actData.to = $ans[actData.ansId][actData.ntIndex].t;
			actData.ntStep=1;
			actData.plyOp=true;
		}
		npcTalk.refreshCtn();
	},

	onCtn:function()
	{
		var id = actData.npcId;
		if(id>=0)
		{
			var i = actData.ntIndex;
			var ans = actData.ansId;
			var t = $ans[actData.ansId][actData.ntIndex].t;
			if(t>=0)
			{
				var step = actData.ntStep;
				if(step==0)
				{
					if($ans[ans][i])
					{
						if($ans[ans][i].dlg)
						{
							var len = $ans[ans][i].dlg.length;
							var seg = actData.ntSeg+1;
							if(seg<len)
							{
								npcTalk.segNext();
							}
							else{
								npcTalk.StepNext();
							}							
						}
						else
						{
							npcTalk.StepNext();
						}
					}
					else
					{
						npcTalk.StepNext();
					}
				}
				else
				{
					if($ply[actData.plyId][actData.to].length==1)
						npcTalk.clickOpt(0);
				}
			}
			else
			{
				npcTalk.clear();
			}			
		}
		else
		{
			npcTalk.clear();
		}
	},

	plyOpt:function()
	{
		if(actData.npcId>=0)
		{
			var ply = actData.plyId;
			var to = actData.to;
			if(to>=0)
			{
				return $ply[ply][to];
			}
		}
	},

	npcAns:function()
	{
		if(actData.npcId>=0)
		{
			var i = actData.ntIndex;
			if($ans[actData.ansId][i].dlg)
			{
				var seg = actData.ntSeg;
				return "“"+$ans[actData.ansId][actData.ntIndex].dlg[seg]+"”";
			}
			else
			{
				return "";
			}	
		}
	}
}

export default { npcTalk,actData};