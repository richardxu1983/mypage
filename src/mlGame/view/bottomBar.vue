<template>
	<div class="bottomBar">
		<img class="player_head" src="/static/img/mlGame/player_head.png" @click="showPnl()">
		<div class="hpBar z1" :style="{width:'45px','background-color':'black'}"></div>
		<div class="hpBar z2" :style="{width:plyhpw+'px','background-color':plyhpc}"></div>
		<div class="apts">行动力：{{apts}}</div>
		<button class="turn" @click="addMonth">下一个月</button>
	</div>
</template>

<script>
import RO from '../../mlGame/core/role.js'
var $ply = RO.role;
const $ti = require('../../mlGame/core/gTime.js').default.gT;
var $tCtrl = require('../../mlGame/core/gTime.js').default.gtime;

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
	name:"bottomBar",
	data:function()
	{
		return{
			player:$ply,
			time:$ti,
		}
	},
	computed:{
		plyhpw:function()
	    {
	    	var len = Math.floor((this.player.hp()/this.player.hpmax())*45);
	    	return len;		
	    },
	    plyhpc:function()
	    {
    		var p = (this.player.hp()/this.player.hpmax());
    		return getColor(p);	
	    },
	    apts:function()
	    {
	    	return $tCtrl.remain();
	    }
	},
	methods:
	{
		showPnl:function()
		{
			if(!RO.ui.pnl)
				RO.ui.pnl=true;
		},
		addMonth:function()
		{
			$tCtrl.addMonth(1);
		}
	}
}

</script>


<style lang="scss" scoped>
	.bottomBar{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 4.5em;
		padding: 0 .4em 0em .7em;
		box-sizing: border-box;
	}
	.z1{
		z-index:1;
	}
	.z2{
		z-index:2;
	}
	.player_head{
		position: absolute;
		left: 0.7em;
		top:0.5em;
		width: 45px;
		height: 45px;
		background-color: white;
		border-radius: 3px;
	}
	.hpBar{
		position: absolute;
		left: 0.7em;
		bottom:0.1em;
		height: .4em;
	}
	.apts
	{
		position: absolute;
		top:1.5em;
		right: 8em;
		color: white;
	}
	.turn
	{
		position: absolute;
		top:1.5em;
		right: 1em;
		height: 2em;
	}
</style>