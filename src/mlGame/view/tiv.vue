<template>
	<div class="">
		<div>第&ensp;{{ti.day}}&ensp;天&ensp;{{Math.floor(ti.hour)}}&ensp;时&ensp; [&ensp; 剩余：{{remain}}天 &ensp;]</div>
	</div>
</template>

<script>

import TI from '../../mlGame/core/gTime.js'
var $ti = TI.gtime;


export default {
	name:"tiv",
	data:function()
	{
		return{
			ti:$ti,
		}
	},
	computed:{
		remain:function()
		{
			return (60-this.ti.day);
		},
	},
	methods:
	{
	}
}

</script>

<style lang="scss" scoped>

</style>