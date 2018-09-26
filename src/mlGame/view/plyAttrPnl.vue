<template>
	<div>
		<div class="md bd">
		</div>
		<div class="box bframe">
			<h1 class="pn">{{ player.attr['name'] }}</h1>
			<p>拥有金币：{{ player.attr['gold'].value }}</p>
			<div class="cel">
				<p>当前生命：{{ player.attr['hp'].value }}</p>
				<p>最大生命：{{ player.attr['hpmax'].value }}</p>
				<p>攻击：{{ player.attr['atk'].value }}</p>
				<p>防御力：{{ player.attr['def'].value }}</p>
				<p>速度：{{ player.attr['spd'].value }}</p>	
			</div>
			<div class="cel">
				<p >武器：<label @click="opWp" class="lk">[&ensp;{{wpName}}&ensp;]</label></p>
				<p>战斗使用技能：{{skName}}</p>				
			</div>			

			<button class="close" @click="close">关闭</button>
		</div>
	</div>

</template>

<script>

import UB from '../../mlGame/core/unit.js'
import SK from '../../mlGame/data/skill.js'
var skl = SK.SKL;
var $ply = UB.Player;

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
				w=w+"[ "+skl[this.player.skf[j]].name+" ] , ";
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
		opWp:function()
		{
			this.$emit('opWp');
		}
	}
}
</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";

	.box{
		.cel{
			width: 180px;
			height: 150px;
			float: left;
			border: solid 1px #ddd;
			padding: 10px;
			margin-right: 30px;
		}
		.close{
			position: absolute;
			bottom: 10px;
			left: 220px;
		}
	}
	
	.pn{
		color: #EE7600;
	}

	.lk:hover{
		text-decoration: underline;
		cursor: pointer;
	}

</style>