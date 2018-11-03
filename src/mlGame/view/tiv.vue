<template>
	<div class="">
		<div>第&ensp;{{year}}&ensp;年&ensp;{{Math.floor(m)}}&ensp;月&ensp;</div>
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

		year:function()
		{
			return this.ti.year;
		},
		m:function()
		{
			return this.ti.month;
		},
	},
	methods:
	{
	}
}

</script>

<style lang="scss" scoped>

</style>