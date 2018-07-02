<template>
	<div class="fightPnl" v-if="show.v">
		<div class="top">
			<div class="ply">
				{{player['name']}}
			</div>
			<div class="plyhp" :style="{width:plyhpw+'px'}"></div>
			<div class="vs">vs</div>
			<div class="enmhp" :style="{width:enmhpw+'px'}"></div>
			<div class="enm">
				{{ enmName }}
			</div>
		</div>
		<div class="dis">距离：{{ dis }}</div>
		<textarea name="" id = "ftMsg" class="msg" rows="16" readonly>{{info.v}}</textarea>
		<button class="close" v-if="showClose.v" @click="close" >关闭</button>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'
import FT from '../../mlGame/core/fight.js'

var $ply = UnitBundle.Player;
var $fight = FT.Fight;
var $enm = FT.Fight.target;

export default {
	name:"fightPnl",
	data:function()
	{
		return {
			showClose:$fight.showClose,
			player:$ply.attr,
			fight:$fight,
			info:$fight.info,
			show:$fight.showPnl
		}
	},
	computed: {
	    // a computed getter
	    dis:function()
	    {
	    	return Math.abs(this.fight.targetPos - this.fight.playerPos);
	    },
	    plyhpw:function(){
	    	var len;
	    	len = Math.floor((this.player['hp'].value/this.player['hp'].max)*120);
	    	return len;
	    },
	    enmhpw:function(){
	    	if(this.fight.target)
	    	{
	    		var len;
		    	len = Math.floor((this.fight.target.hp/this.fight.target.maxhp)*120);
		    	return len;
	    	}
	    	else
	    	{
	    		return 0;
	    	}
	    },
	    enmName: function () {
			if(this.fight.target)
			{
				return this.fight.target.name;
			}
			else
			{
				return "--";
			}
	    },
	    enmHp:function()
	    {
	    	if(this.fight.target)
			{
				return this.fight.target.hp;
			}
			else
			{
				return "--";
			}
	    },
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

	.fightPnl{
		position: absolute;
		left: 50px;
		top: 90px;
		border: solid 1px #CDCDB4;
		background-color: #FFFFF0;
		width: 500px;
		height: 380px;
		z-index:100;

		.top{
			position: absolute;
			top: 20px;
			left: 25px;
			width: 450px;
			padding: 0px;
			height: 20px;
			.vs{
				position: absolute;
				top:0px;
				left: 220px;
			}
			.ply{
				position: absolute;
				top:0px;
				left: 10px;
				width: 60px;
				overflow: hidden;
			}
			.plyhp{
				position: absolute;
				left: 70px;
				height: 4px;
				top: 7px;
				background-color: black;
			}
			.enmhp{
				position: absolute;
				right: 75px;
				height: 4px;
				top: 7px;
				background-color: black;				
			}
			.enm{
				position: absolute;
				top:0px;
				right: 5px;
				width: 60px;
				overflow: hidden;
			}
		}
		.dis{
			position: absolute;
			left: 25px;
			top:45px;
		}
		.msg{
			position: absolute;
			border: solid 1px #eeeeee;
			padding: 5px;
			resize: none;
			width: 435px;
			left: 25px;
			top:75px;
			overflow-y: scroll;
		}
		.close{
			position: absolute;
			bottom: 10px;
			left: 220px;
		}
	}

</style>