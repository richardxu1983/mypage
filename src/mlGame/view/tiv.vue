<template>
	<div class="">
		<div>第&ensp;{{day}}&ensp;天&ensp;{{Math.floor(h)}}&ensp;时&ensp; [&ensp; 剩余：{{remain}}天 &ensp;]</div>
	</div>
</template>

<script>

import TI from '../../mlGame/core/gTime.js'
import DT from '../../mlGame/data/gData.js'
var $dt = DT.data;
var $ti = TI.gT;

export default {
	name:"tiv",
	data:function()
	{
		return{
			ti:$ti,
		}
	},
	computed:{

		day:function()
		{
			return this.ti.day;
		},
		h:function()
		{
			return this.ti.hour;
		},
		remain:function()
		{
			return ($dt.timeLimit-this.ti.day);
		},
	},
	methods:
	{
	}
}

</script>

<style lang="scss" scoped>

</style>