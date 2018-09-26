<template>
	<div class="bottomBar">
		<img class="player_head" src="/static/img/mlGame/player_head.png">
		<div class="lv bantou"></div>
		<div class="lv">{{ player.lvl.value }}</div>
		<div class="hpBar z1" :style="{width:'55px','background-color':'black'}"></div>
		<div class="hpBar z2" :style="{width:plyhpw+'px','background-color':plyhpc}"></div>
		<div class="attrs">属性</div>
	</div>
</template>

<script>
import UB from '../../mlGame/core/unit.js'
var $ply = UB.Player;

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
			player:$ply.attr,
		}
	},
	computed:{
		plyhpw:function()
	    {
	    	var len = Math.floor((this.player['hp'].value/this.player['hpmax'].value)*55);
	    	return len;		
	    },
	    plyhpc:function()
	    {
    		var p = (this.player['hp'].value/this.player['hpmax'].value);
    		return getColor(p);	
	    },
	},
	methods:
	{

	}
}

</script>


<style lang="scss" scoped>
	.bottomBar{
		position: absolute;
		bottom: 0;
		width: 100%;
		background-color:#554837;
		height: 5em;
		padding: .4em .4em 0em .7em;
		box-sizing: border-box;
		color: #eee;
		border: outset 0.1em #CDB38B;
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
		top:0.3em;
		width: 55px;
		height: 55px;
		background-color: white;
		border-radius: 3px;
	}
	.hpBar{
		position: absolute;
		left: 0.7em;
		bottom:0.1em;
		height: .4em;
	}
	.attrs{
		position: absolute;
		left: 5.5em;
		top:0.3em;
		height: 3em;
		width: 8em;
		background-color: gray;
	}
	.lv
	{
		position: absolute;
		left: .8em;
		top:3.7em;
		font-size: .1em;
		width: 1.5em;
		height: 1.2em;
		text-align: center;
	}
	.bantou{
		background-color: black;
		opacity: 0.7;
	}
</style>