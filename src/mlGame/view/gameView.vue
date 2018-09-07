<template>

	<div class="mlBoard nosel">
		<div class="topBar" >
			<tiv class="left"></tiv>
			<div class="right">您拥有：&ensp;{{ player['gold'].value }}&ensp;金</div>
		</div>
		<div class="nav">
			<div v-for="p in sceneList" :key="p" :id="p.id" @click="sceneTo(p.param)" class="left navBtn">
				{{p.name}}
			</div>
		</div>
		<sceneView></sceneView>
		<plyAttrPnl v-if="plyAttrPnlShow" @closeplyAttrPnl="oncloseplyAttrPnl" @opWp="opWp"></plyAttrPnl>
		<fightPnl></fightPnl>
		<areaGo></areaGo>
		<ntk></ntk>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<div class="infoBox" id="info"></div>
		<!--<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>-->
		<div class="bottomBar">
			[&ensp;{{ player.name }}&ensp;]：等级&ensp;{{ player.lvl.value }}
		</div>
		<div class="tool">
			<button class="right" @click="plyAttrPnlShow = !plyAttrPnlShow">{{ btnAttrTxt }}</button>
			<button class="right" @click="test">金币+1</button>
			<button class="right" @click="fight">战斗</button>
			<button class="right" @click="newGame">新游戏</button>
			<button class="right" @click="equipWp1">装备匕首</button>
			<button class="right" @click="equipWp2">装备弓箭</button>
			<button class="right" @click="upEquip">卸下武器</button>
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
import SCE from '../../mlGame/core/sceneCtrl.js'
import sdt from '../../mlGame/data/scene.js'
import sceneView from '../../mlGame/view/scene.vue'
var $SCENE = SCE.scene;
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
			sceneList:sdt.dt.tab,
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
	},
	created:function()
	{

	},
	mounted:function()
	{
		EB.Engine.gameInit();
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
		sceneTo:function(n)
		{
			//alert(n);
			$SCENE.to(n);
		},
	}
}

</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";
	
	.nav{
		position: absolute;
		top: 4em;
		padding-left: 2em;
	}
	
	.navBtn
	{
		width: 6em;
		height: 2em;
		color: black;
		margin-right: .5em;
		text-align: center;
		padding-top: .5em;
		cursor: pointer;
		border: outset 0.2em #CDB38B;
	}

	.infoBox{
		position: absolute;
		width: 100%;
		bottom: 4em;
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
	.bottomBar{
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color:#554837;
		height: 4em;
		padding: 1.2em .5em 0em 1em;
		box-sizing: border-box;
		color: #eee;
		border: outset 0.2em #CDB38B;
		font-size: 1.05em;
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