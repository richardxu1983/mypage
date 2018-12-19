<template>
	<div class="sce">
		<div id="world"></div>
		<div id="block"></div>
		<div class="psel" id="sel"></div>
		<div class="mapInfo" id="mapInfo"></div>
		<div class="mapAct" id="mapAct"></div>
		<div class="build" id="construct">
		</div>
	</div>
</template>

<script>

import mp from '../../mlGame/core/gameMap.js'

export default 
{
	name:"scene",
}

</script>


<style lang="scss">

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
		.psel
		{
			position: absolute;
			width: 60px;
			height: 60px;
			visibility: hidden;
			pointer-events:none;
			box-sizing: border-box;
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
			font-size: xx-small;
		}
		.build
		{
			position: absolute;
			width: 36em;
			height: 25em;
			left: 10em;
			top:6em;
			background-color: #EEE8CD;
			visibility:hidden;
			.close
			{
				position: absolute;
				bottom: 1em;
				left:18em;
			}
			.desc
			{
				position: absolute;
				top:2em;
				left:1.5em;
				width: 32em;
			}
			.sel
			{
				position: absolute;
				left:1.5em;
				padding: .5em 0 .5em 0;
			}
			.selno
			{
				position: absolute;
				left:1.5em;
				padding: .5em 0 .5em 0;
			}
			.sel:hover
			{
				cursor: pointer;
				background-color: yellow;
			}
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