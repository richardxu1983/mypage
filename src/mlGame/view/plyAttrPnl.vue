<template>
	<div class="playerInfo">
		<p>{{ player.attr['name'] }}</p>
		<p><label>生命：</label>{{ player.attr['hp'].value }}</p>
		<p><label>法力：</label>{{ player.attr['mp'].value }}</p>
		<p><label>攻击：</label>{{ player.attr['atk'].value }}</p>
		<p><label>防御：</label>{{ player.attr['def'].value }}</p>
		<p><label>武器：</label>{{wpName}}</p>
		<button class="close" @click="close">关闭</button>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
var $ply = UnitBundle.Player;

export default {
	name:"plyAttrPnl",
	data:function()
	{
		return {
			player:$ply,
		}
	},
	computed: {
		wpName:function()
		{
			return this.player.wpName();
		},
	},
	methods:
	{
		close:function()
		{
			this.$emit('closeplyAttrPnl');
		},
	}
}
</script>

<style lang="scss" scoped>

	.playerInfo{
		position: absolute;
		left: 200px;
		bottom: 200px;
		border: solid 1px #CDCDB4;
		background-color: #FFFFE0;
		width: 200px;
		height: 300px;
		z-index:100;
		.close{
			position: absolute;
			bottom: 10px;
			left: 75px;
		}
	}

</style>