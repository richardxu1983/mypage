<template>
	<div class="mlBoard">
		<div class="topBar" >
			<div class="gtime">1000&nbsp;年&nbsp;1&nbsp;月&nbsp;1&nbsp;日&nbsp; 1&nbsp;时</div>
			<div class="gold">{{ player['gold'].value }}<span class="unitTxt">金</span></div>
		</div>
		<plyAttrPnl v-if="plyAttrPnlShow" @closeplyAttrPnl="oncloseplyAttrPnl"></plyAttrPnl>
		<fightPnl></fightPnl>
		<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>
		<div class="mapPanel">
			<h3>{{ playerTxt['posTxt'] }}</h3>
		</div>
		<div class="bottomBar">
			<button class="btnBottom" @click="plyAttrPnlShow = !plyAttrPnlShow">{{ btnAttrTxt }}</button>
			<button class="btnBottom" @click="playerAttrTest">测试</button>
			<button class="btnBottom" @click="newGame">新游戏</button>
			<button class="btnBottom" @click="equipWp1">装备匕首</button>
			<button class="btnBottom" @click="equipWp2">装备弓箭</button>
			<button class="btnBottom" @click="upEquip">卸下武器</button>
		</div>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'
import MpB from '../../mlGame/core/gameMap.js'
import plyAttrPnl from '../../mlGame/view/plyAttrPnl.vue'
import fightPnl from '../../mlGame/view/fightPnl.vue'

var $ply = UnitBundle.Player;
var $map = MpB.Gmap;
var $addinfo = EB.info.addInfo;

export default {
	name:"gameView",
	data:function()
	{
		return {
			btnAttrTxt:"属性",
			player:$ply.attr,
			playerTxt:$ply.format,
			plyAttrPnlShow:false,
			info:EB.info.txt,
		}
	},
	components: 
	{
	  plyAttrPnl,
	  fightPnl
	},
	created:function()
	{

	},
	mounted:function()
	{
		$map.loadMap();
		EB.Engine.loadGame();
		$addinfo("加载完毕...");
	},
	methods:
	{
		oncloseplyAttrPnl:function()
		{
			this.plyAttrPnlShow = !this.plyAttrPnlShow;
		},
		playerAttrTest:function()
		{
			$ply.addAttr('gold',1);
			$ply.fightUnit(new UnitBundle.Unit({
				hp:30,
				mp:0,
				atk:2,
				def:0,
				aspd:2,
				spd:4,
				name:"强盗",
			},0));
		},
		newGame:function()
		{
			EB.Engine.newGame();
			$addinfo("重新开始了游戏...");
		},
		equipWp1:function()
		{
			$ply.equipWp(0);
			$addinfo("装备了:"+$ply.weapon.name);
		},
		equipWp2:function()
		{
			$ply.equipWp(1);
			$addinfo("装备了:"+$ply.weapon.name);
		},
		upEquip:function()
		{
			$ply.unEquipWp(1);
		},
	}
}

</script>

<style lang="scss" scoped>
	
	.unitTxt{
		margin-left: 5px;
	}
	.infoBox{
		position: absolute;
		width: 535px;
		height: 150px;
		top: 335px;
		left: 25px;
		border: solid 1px #aaaaaa;
		background: #FFFFFA;
		padding: 5px;
		resize: none;
		overflow-y: scroll;
	}

	.mapPanel{
		position: absolute;
		width: 535px;
		height: 150px;
		top: 50px;
		left: 25px;
		padding: 5px;
		resize: none;
		h3{
			margin: 0 0 0 5px;
		}
	}
	
	.topBar{
		position: absolute;
		padding: 15px 25px 0px 25px;
		width: 525px;
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
		width: 600px;
		height: 550px;
		margin: 0 45px 45px 45px;
		background-color: #FFFFFA;
		border: solid 1px #aaaaaa;
		position: relative;
		font-size: 80%;
	}

</style>