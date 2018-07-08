<template>
	<div>
		<div class="playerInfo">
			<h2>{{ player.attr['name'] }}</h2>
			<p>金币：{{ player.attr['gold'].value }}</p>
			<div class="cel">
				<p><label>生命：</label>{{ player.attr['hp'].value }}</p>
				<p><label>法力：</label>{{ player.attr['mp'].value }}</p>
				<p><label>强壮：</label>{{ player.attr['str'].value }}</p>
				<p><label>敏捷：</label>{{ player.attr['agi'].value }}</p>
				<p><label>防御力：</label>{{ player.attr['def'].value }}</p>
				<p><label>战斗移动速度：</label>{{ player.attr['spd'].value }}米/秒</p>	
			</div>
			<div class="cel">
				<p><label>武器：</label>{{wpName}}</p>
				<p><label>战斗使用技能：</label>{{skName}}</p>				
			</div>			

			<button class="close" @click="close">关闭</button>
		</div>
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
			if(w=="")
				w="无";
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

	.bd{
		width: 600px;
    	height: 550px;
	}

	.playerInfo{
		position: absolute;
		left: 50px;
		top: 110px;
		border: solid 3px #aaaaaa;
		background-color: white;
		width: 470px;
		height: 280px;
		z-index:100;
		padding: 0 0px 25px 25px;
		.cel{
			width: 180px;
			height: 150px;
			float: left;
			border: solid 1px #ddd;
			padding: 10px;
			margin-right: 30px;
			p{
				margin: 0 0 8px 0;
			}
		}
		.close{
			position: absolute;
			bottom: 10px;
			left: 220px;
		}
	}

</style>