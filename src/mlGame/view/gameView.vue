<template>
	<div class="mlBoard">
		<myArea></myArea>
		<div class="topBar" >
			<div class="gtime">第&ensp;1&ensp;天&ensp;8&ensp;时&ensp; [&ensp; 剩余：600天 &ensp;]</div>
			<div class="gold">您拥有：&ensp;{{ player['gold'].value }}&ensp;金</div>
		</div>
		
		<plyAttrPnl v-if="plyAttrPnlShow" @closeplyAttrPnl="oncloseplyAttrPnl" @opWp="opWp"></plyAttrPnl>
		<fightPnl></fightPnl>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>
		<div class="bottomBar">
			<button class="btnBottom" @click="plyAttrPnlShow = !plyAttrPnlShow">{{ btnAttrTxt }}</button>
			<button class="btnBottom" @click="test">测试</button>
			<button class="btnBottom" @click="fight">战斗</button>
			<button class="btnBottom" @click="newGame">新游戏</button>
			<button class="btnBottom" @click="equipWp1">装备匕首</button>
			<button class="btnBottom" @click="equipWp2">装备弓箭</button>
			<button class="btnBottom" @click="upEquip">卸下武器</button>
			<button class="btnBottom" @click="showwp">武器名</button>
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
			playerTxt:$ply.format,
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
	  myArea
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
		showwp:function()
		{
			$addinfo("装备了:"+$ply.wpName());
		},
	}
}

</script>

<style lang="scss" scoped>
	
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
		.gtime{
			float: left;
		}
		.gold{
			position: absolute;
			right: 0px;
		}
	}

	.bottomBar{
		position: absolute;
		bottom: 0;
	}

	.btnBottom{
		float: left;
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