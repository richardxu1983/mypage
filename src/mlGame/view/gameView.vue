<template>

	<div class="mlBoard nosel">
		<div class="topBar" >
			<tiv class="left"></tiv>
			<div class="right">您拥有：&ensp;{{ gold }}&ensp;金</div>
		</div>
		<sceneView></sceneView>
		<fightPnl></fightPnl>
		<areaGo></areaGo>
		<ntk></ntk>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<div class="infoBox" id="info"></div>
		<!--<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>-->
		<bottomBar></bottomBar>
		<div class="tool">
			<button class="right" @click="test">金币+1</button>
			<button class="right" @click="fight">战斗</button>
			<button class="right" @click="newGame">新游戏</button>
			<button class="right" @click="equipWp1">显示战斗记录</button>
			<button class="right" @click="equipWp2">装备弓箭</button>
		</div>
	</div>
</template>

<script>

import UB from '../../mlGame/core/unit.js'
import RO from '../../mlGame/core/role.js'
import fightPnl from '../../mlGame/view/fightPnl.vue'
import wpDesc from '../../mlGame/view/wpDesc.vue'
import tiv from '../../mlGame/view/tiv.vue'
import ntk from '../../mlGame/view/npcTalk.vue'
import sceneView from '../../mlGame/view/scene.vue'
import CT from '../../mlGame/core/ctrls.js'
import bottomBar from '../../mlGame/view/bottomBar.vue'
import zxModule from '../../mlGame/core/zhenxing.js'
import FT from '../../mlGame/core/fight.js'
var $ctrl = CT.c;
var $ply = RO.role;
var zxCtrl = zxModule.zxCtrl;

export default {
	name:"gameView",
	data:function()
	{
		return {
			player:$ply,
			plyAttrPnlShow:false,
			wpDesc:false,
		}
	},
	computed:
	{
		gold:function()
		{
			return this.player.gold();
		}
	},
	components: 
	{
	  fightPnl,
	  wpDesc,
	  tiv,
	  ntk,
	  sceneView,
	  bottomBar,
	},
	created:function()
	{
		$ctrl.start();
	},
	mounted:function()
	{
		$ctrl.refresh();
	},
	methods:
	{
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

		},
		fight:function()
		{
			var npc1 = new UB.Npc(100,0);
			var npc2 = new UB.Npc(100,0);
			zxCtrl.fight([npc1,0,npc2]);
		},
		newGame:function()
		{
			$ctrl.new();
		},
		equipWp1:function()
		{
			FT.Fight.showRecord();
		},
		equipWp2:function()
		{
			$ply.equipWp(2);
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