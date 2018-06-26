<template>
	<div class="mlBoard">
		<div class="playerInfo" v-if="playerAttrShow">
			<p>{{ player['name'] }}</p>
			<p>{{ player['gold'].value }}<span class="unitTxt">金</span></p>
			<p><label>{{ player['hp'].name }}：</label>{{ player['hp'].value }}</p>
			<p><label>{{ player['mp'].name }}：</label>{{ player['mp'].value }}</p>
			<p><label>{{ player['atk'].name }}：</label>{{ player['atk'].value }}</p>
			<p><label>{{ player['def'].name }}：</label>{{ player['def'].value }}</p>
		</div>
		<div class="bottomBar">
			<button class="btnBottom" @click="playerAttrShow=!playerAttrShow">{{ btnShowPlayerattr }}</button>
			<button class="btnBottom" @click="playerAttrTest">测试</button>
			<button class="btnBottom" @click="newGame">新游戏</button>
		</div>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import EB from '../../mlGame/core/engine.js'

var $ply = UnitBundle.Player;

export default {
	name:"gameView",
	data:function()
	{
		return {
			btnShowPlayerattr:"属性",
			playerAttrShow:false,
			player:UnitBundle.Player.attr
		}
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
		playerAttrTest:function()
		{
			//console.log($ply);
			$ply.addAttr('gold',1);
		},
		newGame:function()
		{
			EB.Engine.newGame();
		}
	}
}

</script>

<style lang="scss" scoped>
	
	.unitTxt{
		margin-left: 10px;
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
		height: 700px;
		margin: 0 45px 45px 45px;
		background-color: #FFFFFA;
		border: solid 1px #CDCDB4;
		position: relative;
	}


	.playerInfo{
		position: absolute;
		left: 200px;
		bottom: 200px;
		border: solid 1px #CDCDB4;
		background-color: #FFFFE0;
		width: 200px;
		height: 300px;
	}

</style>