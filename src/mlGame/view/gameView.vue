<template>

	<div class="mlBoard nosel">
		<div class="topBar" >
			<tiv class="left"></tiv>
			<div class="right">您拥有：&ensp;{{ player['gold'].value }}&ensp;金</div>
		</div>
		<sceneView></sceneView>
		<plyAttrPnl v-if="plyAttrPnlShow" @closeplyAttrPnl="oncloseplyAttrPnl" @opWp="opWp"></plyAttrPnl>
		<fightPnl></fightPnl>
		<areaGo></areaGo>
		<ntk></ntk>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<div class="infoBox" id="info"></div>
		<!--<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>-->
		<bottomBar></bottomBar>
		<div class="tool">
			<button class="right" @click="plyAttrPnlShow = !plyAttrPnlShow">{{ btnAttrTxt }}</button>
			<button class="right" @click="test">金币+1</button>
			<button class="right" @click="fight">战斗</button>
			<button class="right" @click="newGame">新游戏</button>
			<button class="right" @click="equipWp1">装备匕首</button>
			<button class="right" @click="equipWp2">装备弓箭</button>
			<button class="right" @click="upEquip">+经验</button>
		</div>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'
import plyAttrPnl from '../../mlGame/view/plyAttrPnl.vue'
import fightPnl from '../../mlGame/view/fightPnl.vue'
import wpDesc from '../../mlGame/view/wpDesc.vue'
import tiv from '../../mlGame/view/tiv.vue'
import areaGo from '../../mlGame/view/areaGo.vue'
import ntk from '../../mlGame/view/npcTalk.vue'
import sceneView from '../../mlGame/view/scene.vue'
import CT from '../../mlGame/core/ctrls.js'
import bottomBar from '../../mlGame/view/bottomBar.vue'
var $ctrl = CT.c;
var $ply = UnitBundle.Player;
var $addinfo = EB.info.addInfo;

export default {
	name:"gameView",
	data:function()
	{
		return {
			btnAttrTxt:"人物",
			player:$ply.attr,
			plyAttrPnlShow:false,
			wpDesc:false,
			info:EB.info.txt,
		}
	},
	components: 
	{
	  plyAttrPnl,
	  fightPnl,
	  wpDesc,
	  tiv,
	  areaGo,
	  ntk,
	  sceneView,
	  bottomBar,
	},
	created:function()
	{
		console.log("gameView vue created");
		EB.Engine.gameInit();
		$ctrl.start();
	},
	mounted:function()
	{
		console.log("gameView vue mounted");
		$ctrl.refresh();
	},
	methods:
	{
		oncloseplyAttrPnl:function()
		{
			this.plyAttrPnlShow = !this.plyAttrPnlShow;
		},
		clsWp:function()
		{
			this.wpDesc=false;
		},
		opWp:function()
		{
			this.wpDesc=true;
		},
		test:function()
		{
			$ply.addAttr('gold',1);
		},
		fight:function()
		{
			var npc1 = new UnitBundle.Npc(100,0,0);
			var npc2 = new UnitBundle.Npc(100,0,0);
			$ply.fight([npc2,0,npc1]);
		},
		newGame:function()
		{
			EB.Engine.new();
			$ctrl.new();
			$addinfo("重新开始了游戏...");
		},
		equipWp1:function()
		{
			$ply.equipWp(1);
		},
		equipWp2:function()
		{
			$ply.equipWp(2);
		},
		upEquip:function()
		{
			$ply.expAdd(1000);
		},
	}
}

</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";
	
	.infoBox{
		position: absolute;
		width: 100%;
		bottom: 5em;
		padding: 0.3em 0 0.3em 1em;
		box-sizing: border-box;
		overflow-y: hidden;
		height: 2em;
		background-color: #333;
		color: white;
		font-size: 1.1em;
	}
	.topBar{
		position: absolute;
		padding: 1em 1.5em 0.5em 1.5em;
		width: 100%;
		box-sizing: border-box;
		color: #FFF8DC;
	}
	.tool{
		position: absolute;
		bottom: -2em;
		left: 0;
	}

	.mlBoard{
		width: 700px;
		height: 550px;
		margin: 0;
		border: solid 1px #ccc;
		position: relative;
		font-size: 90%;
		background-color: #333;
	}



</style>