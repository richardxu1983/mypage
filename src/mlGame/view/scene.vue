<template>
	<div class="sce">
		<div id="maps"></div>
		<img class="flag" id="flag" src="/static/img/mlGame/flag.png">
		<div class="mapInfo" id="mapInfo"></div>
		<div class="mapAct" id="mapAct">
		</div>
	</div>
</template>

<script>

import mp from '../../mlGame/core/gameMap.js'
var $map = mp.mapCtrl;

export default 
{
	name:"scene",

}

</script>


<style lang="scss" scoped>

	@import "../../scss/mlGame";
	.sce
	{
		position: absolute;
		width: 100%;
		height: 37.5em;
		top:3em;
		left:0;
		box-sizing: border-box;
		background-color: black;
		.flag
		{
			pointer-events:none;
		}
		.mapInfo
		{
			position: absolute;
			top: 0;
			right: 0;
			width: 25em;
			height: 3em;
			padding-top: 1em;
			padding-right: 2em;
			text-align: right;
			color: white;
		}

		.mapAct
		{
			position: absolute;
			bottom: 0;
			right: 0;
			width: 25em;
			height: 2.5em;
			padding-top: 1em;
			padding-right: 2em;
			background-color: black;
		}
	}
</style>