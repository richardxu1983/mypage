
import kk from '../../mlGame/data/kuangchang.js'
import UB from '../../mlGame/core/unit.js'
import nd from '../../mlGame/data/npc.js'
import EB from '../../mlGame/core/engine.js'
import ACT from '../../mlGame/core/npcActive.js'
var $npcTalk = ACT.npcTalk;
var $addinfo = EB.info.addInfo;
var $ply = UB.Player;
var $kc = kk.kc;

var kcData = {
	at:0,
};

var kcCtrl = {

	captuering:0,

	at:function()
	{
		return $kc.at;
	},

	maxlvl:function()
	{
		return $kc.lvls.length;
	},

	new:function()
	{
		$kc.at=1;
		kcData.at = $kc.at;
		kcCtrl.save();
	},

	load:function()
	{
		try 
        {
			var k = JSON.parse(localStorage.kc);
			if(k)
			{
				$kc.at = k.at;
			}
		}
		catch(e)
		{
			
		}
		kcData.at = $kc.at;
	},

	save:function()
	{
		localStorage.kc = JSON.stringify(kcData);
	},

	capture:function(n)
	{
		var npcid = $kc.lvls[n].npc;
		kcCtrl.captuering = n;
		kcCtrl.npcid = npcid;
		$npcTalk.talk(npcid,kcCtrl.onTalkFinish);

		//kcCtrl.captuering = n;
		//var npc = new UB.Npc(nd.npc[npcid],npcid,0,0);
		//$ply.fight(npc,kcCtrl.onFightOver);
	},

	onTalkFinish:function(ans)
	{
		var npcid = kcCtrl.npcid;
		var npc = new UB.Npc(nd.npc[npcid],npcid,0,0);
		$ply.fight(npc,kcCtrl.onFightOver);
	},

	onFightOver:function(n)
	{
		if(n==1)
		{
			kcCtrl.indexSet(kcCtrl.captuering+2);
			$addinfo("你占领了第"+(kcCtrl.captuering+1)+"层矿场");
		}
	},

	indexSet:function(n)
	{
		if(n<=$kc.lvls.length+1)
		{
			$kc.at=n;
			kcData.at = $kc.at;
			kcCtrl.save();
		}
	},
}

export default {kcCtrl};