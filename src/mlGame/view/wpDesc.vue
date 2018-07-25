<template>
	<div class="bx bframe">
		<h2>[&ensp;{{n}}&ensp;]</h2>
		<p>-&ensp;{{rg}}&ensp;-</p>
		<p>攻击力：<b>{{atk}}+<label class="add">{{add}}</label></b></p>
		<p>主要属性：{{ka}}（每点{{ka}}提升&ensp;{{kaa}}%&ensp;攻击力）</p>
		<p>攻击距离：{{dis}}&ensp;米</p>
		<p>攻击速度：每&ensp;{{aspd}}&ensp;秒攻击一次</p>
		<button class="close" @click="close">关闭</button>
	</div>
</template>

<script>
import UB from '../../mlGame/core/unit.js'
import WP from '../../mlGame/core/weapon.js'
import WPD from '../../mlGame/data/wpData.js'
var $wp = WPD.wp;
var $ply = UB.Player;

const attrN = {

	'str':"强壮",
	'agi':"敏捷"
}

export default {
	name:"wpDesc",
	data:function()
	{
		return{
			wp:$ply.weapon,
			ply:$ply.attr
		}
	},
	computed: {
		n:function()
		{
			return $wp[this.wp.id].name;
		},
		atk:function()
		{
			return $wp[this.wp.id].atk;
		},
		ka:function()
		{
			return attrN[$wp[this.wp.id].ka];
		},
		kaa:function()
		{
			return $wp[this.wp.id].kaa*100;
		},
		dis:function()
		{
			return $wp[this.wp.id].atkDis;
		},
		aspd:function()
		{
			return $wp[this.wp.id].aspd*0.5;
		},
		add:function()
		{
			return Math.ceil($wp[this.wp.id].atk * (1+this.ply[$wp[this.wp.id].ka].value*$wp[this.wp.id].kaa))-$wp[this.wp.id].atk;
		},
		rg:function()
		{
			return $wp[this.wp.id].rg?"远程武器":"近程武器";
		}
	},
	methods:
	{
		close:function()
		{
			this.$emit('clsWp');
		},
	}
}
</script>

<style lang="scss" scoped>
	
@import "../../scss/mlGame";
.bx{
	.close{
		position: absolute;
		bottom: 10px;
		left: 155px;
	}
}

.add{
	color: #32CD32;
}

</style>