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
		<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>
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
			$ply.equipWp(2);
			$ply.addSkToFight(1);
			$ply.addSkToFight(0);
			$ply.addSkToFight(3);
			$ply.addSkToFight(4);
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
		width: 635px;
		height: 100px;
		bottom: 50px;
		left: 25px;
		border: solid 1px #aaaaaa;
		padding: 5px;
		resize: none;
		overflow-y: scroll;
	}
	.topBar{
		position: absolute;
		padding: 15px 25px 0px 25px;
		width: 625px;
	}
	.bottomBar{
		position: absolute;
		bottom: 0;
	}

	.mlBoard{
		width: 700px;
		height: 550px;
		margin: 0;
		background-color: #fff;
		border: solid 3px #ddd;
		position: relative;
		font-size: 90%;
		border-radius: 6px;
	}

</style>