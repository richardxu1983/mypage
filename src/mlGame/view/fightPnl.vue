<template>
	<div v-if="show.v">
		<div class="md bd">
		</div>
		<div class="fp bframe">
			<!--
			<div class="top">
				<div class="ply nameTag"><div class="right"></div></div>
				<div class="hp1 plyhp hpbar" ></div>
				<div class="plyhp hpbar" :style="{width:plyhpw+'px','background-color':plyhpc}"></div>
				<div class="vs">对阵</div>
				<div class="hp1 enmhp hpbar" ></div>
				<div class="enmhp hpbar" :style="{width:enmhpw+'px','background-color':enmhpc}"></div>
				<div class="enm nameTag"><div class="left"></div></div>
			</div>
			-->
			<textarea name="" id = "ftMsg" class="msg" rows="13" readonly>{{info.v}}</textarea>
			<button class="close" v-if="showClose.v" @click="close" >关闭</button>					
		</div>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import FT from '../../mlGame/core/fight.js'
var $ply = UnitBundle.Player;
var $fight = FT.Fight;

function getColor(p)
{
    if(p>=0.8)
	{
		return "#00FF33";
	}
	else if(p>=0.4)
	{
		return "orange";
	}
	else(p>=0.15)
	{
		return "red";
	}
}

export default {
	name:"fightPnl",
	data:function()
	{
		return {
			showClose:$fight.showClose,
			fight:$fight,
			info:$fight.info,
			show:$fight.showPnl
		}
	},
	computed: {
	    // a computed getter
	},
	methods:
	{
		close:function()
		{
			$fight.close();
		}
	}
}
</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";

	.bframe{
		padding: 0;
		border: solid 0.4em #CDB38B;
		border-radius: 1em;
	}

	.fp{
		position: absolute;
		left: 25px;
		top: 40px;
		background-color: white;
		width: 45em;
		height: 27em;
		z-index:100;
		.top{
			position: absolute;
			top: 20px;
			left: 0px;
			width: 650px;
			padding: 0px;
			height: 20px;
			.vs{
				position: absolute;
				top:0px;
				left: 310px;
			}
			.nameTag
			{
				position: absolute;
				top:0px;
				width: 70px;
				overflow: hidden;
				text-align: left;
				font-weight: bold;
			}
			.ply{
				left: 0px;
			}
			.hpbar{
				position: absolute;
				height: 5px;
				top: 6px;				
			}
			.plyhp{
				left: 85px;
			}
			.enmhp{
				right: 85px;	
			}
			.hp1{
				width: 130px;
				background-color: black;
			}
			.enm{
				right: 0px;
			}
		}
		.dis{
			position: absolute;
			left: 25px;
			top:48px;
			font-weight: bold;
		}
		.msg{
			position: absolute;
			border: solid 1px #aaaaaa;
			padding: 5px;
			resize: none;
			width: 575px;
			left: 25px;
			top:80px;
			overflow-y: scroll;
			background: #424242;
			color: white;
			line-height: 1.5;
			padding-left: 15px;
		}
		.close{
			position: absolute;
			bottom: 10px;
			left: 285px;
		}
	}

</style>