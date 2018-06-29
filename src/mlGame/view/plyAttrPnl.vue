<template>
	<div class="playerInfo">
		<p>{{ player['name'] }}</p>
		<p><label>{{ player['hp'].name }}：</label>{{ player['hp'].value }}</p>
		<p><label>{{ player['mp'].name }}：</label>{{ player['mp'].value }}</p>
		<p><label>{{ player['atk'].name }}：</label>{{ player['atk'].value }}</p>
		<p><label>{{ player['def'].name }}：</label>{{ player['def'].value }}</p>
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
			player:$ply.attr,
		}
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