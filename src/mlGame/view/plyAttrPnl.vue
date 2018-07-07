<template>
	<div class="playerInfo">
		<p>{{ player.attr['name'] }}</p>
		<p><label>生命：</label>{{ player.attr['hp'].value }}</p>
		<p><label>法力：</label>{{ player.attr['mp'].value }}</p>
		<p><label>强壮：</label>{{ player.attr['str'].value }}</p>
		<p><label>敏捷：</label>{{ player.attr['agi'].value }}</p>
		<p><label>武器：</label>{{wpName}}</p>
		<p><label>技能：</label>{{skName}}</p>
		<button class="close" @click="close">关闭</button>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import SK from '../../mlGame/core/skill.js'
var skl = SK.SKL;
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
		skName:function()
		{
			var j,len,ac=-1;
			var w="";
			for(j = 0,len=this.player.skf.length; j < len; j++) 
			{
				w=w+skl[this.player.skf[j]].name+" , ";
			}
			return w;
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