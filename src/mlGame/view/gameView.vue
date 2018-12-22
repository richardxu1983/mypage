<template>

	<div class="mlBoard nosel">
		<div class="topBar" >
			<tiv class="left"></tiv>
			<div class="res">
				<div class="cell">木材：{{wood}}</div>
				<div class="cell">石头：{{stone}}</div>
				<div class="cell">铁矿：{{iron}}</div>
				<div class="cell">粮食：{{food}}</div>
			</div>
			<div class="rightRes">
				<div class="cell">金币：{{gold}}</div>
				<div class="cell">人口：{{pop}}</div>
				<div class="cell">地块：{{block}}/{{maxBlock}}</div>
			</div>
		</div>
		<fightPnl></fightPnl>
		<plyPnl></plyPnl>
		<scene></scene>
		<wpDesc v-if="wpDesc" @clsWp="clsWp"></wpDesc>
		<div class="infoBox" id="info"></div>
		<!--<textarea name="" id="infoBox" class="infoBox" readonly>{{info.v}}</textarea>-->
		<bottomBar></bottomBar>
		<div class="tool">
			<button class="right" @click="test">添加物品</button>
			<button class="right" @click="fight">战斗</button>
			<button class="right" @click="newGame">新游戏</button>
			<button class="right" @click="equipWp1">显示战斗记录</button>
			<button class="right" @click="equipWp2">人物</button>
			<button class="right" @click="test1">测试</button>
		</div>
	</div>
</template>

<script>

import UB from '../../mlGame/core/unit.js'
import RO from '../../mlGame/core/role.js'
import fightPnl from '../../mlGame/view/fightPnl.vue'
import plyPnl from '../../mlGame/view/plyAttrPnl.vue'
import wpDesc from '../../mlGame/view/wpDesc.vue'
import tiv from '../../mlGame/view/tiv.vue'
import CT from '../../mlGame/core/ctrls.js'
import bottomBar from '../../mlGame/view/bottomBar.vue'
import zxModule from '../../mlGame/core/zhenxing.js'
import FT from '../../mlGame/core/fight.js'
import scene from '../../mlGame/view/scene.vue'
var $ctrl = CT.c;
var $ply = RO.role;
var zxCtrl = zxModule.zxCtrl;
const $prop = require('../../mlGame/core/propCtrl.js').default.propList;

export default {
	name:"gameView",
	data:function()
	{
		return {
			ply:$ply,
			prop:$prop,
		}
	},
	computed:
	{
		gold:function()
		{
			return this.fmat($ply.gold());
		},
		wood:function()
		{
			return this.fmat($ply.wood());
		},
		iron:function()
		{
			return this.fmat($ply.iron());
		},
		food:function()
		{
			return this.fmat($ply.food());
		},
		stone:function()
		{
			return this.fmat($ply.stone());
		},
		pop:function()
		{
			return this.fmat($ply.pop());
		},
		block:function()
		{
			return this.fmat($ply.block());
		},
		maxBlock:function()
		{
			return this.fmat($ply.maxBlock());
		},
	},
	components: 
	{
	  fightPnl,
	  wpDesc,
	  tiv,
	  bottomBar,
	  plyPnl,
	  scene,
	},
	created:function()
	{
		$ctrl.start();
	},
	mounted:function()
	{
		$ctrl.mounted();
	},
	methods:
	{
		fmat:function(v)
		{
			if(v>=100000)
			{
				return Math.floor(v/10000)+"万";
			}
			else
				return v;
		},
		clsWp:function()
		{

		},
		opWp:function()
		{

		},
		test:function()
		{
			$ply.bagAddItem(0);
			$ply.bagAddItem(1);
		},
		fight:function()
		{
			var npc1 = new UB.Npc(100,0);
			var npc2 = new UB.Npc(101,0);
			var npc3 = new UB.Npc(102,0);
			zxCtrl.fight([npc1,npc3,npc2]);
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
			if(!RO.ui.pnl)
				RO.ui.pnl=true;
		},
		test1:function()
		{
			console.log($ply.atk());
		}
	}
}

</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";
	
	.infoBox{
		position: absolute;
		width: 100%;
		bottom: 4em;
		padding: 0.3em 0 0.3em 1em;
		box-sizing: border-box;
		overflow-y: hidden;
		height: 2em;
		color: white;
		font-size: 1.1em;
		opacity: .5;
		pointer-events:none;
	}
	.topBar{
		position: absolute;
		padding: 1em 1.5em 0.5em 1.5em;
		width: 100%;
		box-sizing: border-box;
		color: #FFF8DC;
		font-size: xx-small;
		.res
		{
			position: absolute;
			left:14em;
			.cell
			{
				float: left;
				width: 6em;
				margin-right: 1em;
			}
		}
		.rightRes
		{
			position: absolute;
			right:.5em;
			.cell
			{
				float: right;
				width: 6em;
				margin-left: 1em;
			}
		}
	}
	.tool{
		position: absolute;
		bottom: -2em;
		left: 0;
	}
	
	.mlBoard{
		width: 800px;
		height: 650px;
		margin: 0;
		border: solid 1px #ccc;
		position: relative;
		font-size: 90%;
		background-color: #333;
	}



</style>