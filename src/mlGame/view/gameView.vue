<template>

	<div class="mlBoard">
		<myArea></myArea>
		<div class="topBar" >
			<tiv class="left"></tiv>
			<div class="right">您拥有：&ensp;{{ player['gold'].value }}&ensp;金</div>
		</div>
		<plyAttrPnl v-if="plyAttrPnlShow" @closeplyAttrPnl="oncloseplyAttrPnl" @opWp="opWp"></plyAttrPnl>
		<fightPnl></fightPnl>
		<areaGo></areaGo>
		<ntk></ntk>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<div class="infoBox" id="info"></div>
		<!--<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>-->
		<div class="bottomBar">
			<button class="left" @click="plyAttrPnlShow = !plyAttrPnlShow">{{ btnAttrTxt }}</button>
			<button class="left" @click="test">金币+1</button>
			<button class="left" @click="fight">战斗</button>
			<button class="left" @click="newGame">新游戏</button>
			<button class="left" @click="equipWp1">装备匕首</button>
			<button class="left" @click="equipWp2">装备弓箭</button>
			<button class="left" @click="upEquip">卸下武器</button>
		</div>
	</div>

</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'
import plyAttrPnl from '../../mlGame/view/plyAttrPnl.vue'
import fightPnl from '../../mlGame/view/fightPnl.vue'
import wpDesc from '../../mlGame/view/wpDesc.vue'
import myArea from '../../mlGame/view/area.vue'
import tiv from '../../mlGame/view/tiv.vue'
import areaGo from '../../mlGame/view/areaGo.vue'
import ntk from '../../mlGame/view/npcTalk.vue'

var $ply = UnitBundle.Player;
var $map = MpB.Gmap;
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
	  myArea,
	  tiv,
	  areaGo,
	  ntk
	},
	created:function()
	{

	},
	mounted:function()
	{
		EB.Engine.loadGame();
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
			var u = new UnitBundle.Unit({
				hp:300,
				maxhp:300,
				mp:0,
				str:20,
				def:0,
				agi:20,
				spd:1,
				name:"强盗",
			},1);
			$ply.fight(u);
		},
		newGame:function()
		{
			EB.Engine.newGame();
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
			$ply.unEquipWp(1);
		},
	}
}

</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";
	
	.infoBox{
		position: absolute;
		width: 100%;
		bottom: 2em;
		padding: 0.3em 0 0.3em 1em;
		box-sizing: border-box;
		overflow-y: hidden;
		height: 2em;
		background-color: black;
		color: white;
	}
	.topBar{
		position: absolute;
		padding: 0.3em 1em 0.5em 1em;
		width: 100%;
		box-sizing: border-box;
		color: white;
	}
	.bottomBar{
		position: absolute;
		bottom: 0;
	}

	.mlBoard{
		width: 700px;
		height: 550px;
		margin: 0;
		border: solid 3px #ccc;
		position: relative;
		font-size: 90%;
		border-radius: 6px;
		background-color: #333;
		color: #98FB98;
	}

</style>