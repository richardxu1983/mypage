<template>
	<div class="">
		<div>第&ensp;{{year}}&ensp;年&ensp;{{Math.floor(m)}}&ensp;月&ensp;</div>
		<div class="meter">
			<div class="base">
			</div>
			<div class="up" :style="{height:meter+'em'}">
			</div>
		</div>
	</div>
</template>

<script>

import TI from '../../mlGame/core/gTime.js'
import DT from '../../mlGame/data/gData.js'
var $dt = DT.data;
var $ti = TI.gT;
const $tCtrl = require('../../mlGame/core/gTime.js').default.gtime;

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
		meter:function()
		{
			return 1.5*(1-$tCtrl.remain());
		}
	},
	methods:
	{
	}
}

</script>

<style lang="scss" scoped>

.meter
{
	position: absolute;
	left: 9em;
	bottom: .3em;
	.base
	{
		position: absolute;
		bottom: 0em;
		width: .5em;
		height: 1.5em;
		border: 1px solid white;
	}
	.up
	{
		position: absolute;
		bottom: 0em;
		width: .5em;
		height: 1.5em;
		border: 1px solid white;
		background-color: white;
	}
}

</style>