<template>
	<div class="bottomBar">
		<div class="apts">行动力：{{apts}}</div>
		<button class="turn" @click="addMonth">下一个月</button>
	</div>
</template>

<script>

const $ti = require('../../mlGame/core/gTime.js').default.gT;
const $tCtrl = require('../../mlGame/core/gTime.js').default.gtime;

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

			time:$ti,
		}
	},
	computed:{

	    apts:function()
	    {
	    	return $tCtrl.remain();
	    }
	},
	methods:
	{
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