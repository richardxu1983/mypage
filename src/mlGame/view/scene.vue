<template>
	<div class="sce">
		<div id="world"></div>
		<div id="block"></div>
		<div class="mengban" id="mengban"></div>
		<div class="psel" id="sel"></div>
		<div class="mapInfo" id="mapInfo"></div>
		<div class="blockInfo" id="blockInfo"></div>
		<div class="mapAct" id="mapAct"></div>
		<div class="build" id="buildUI">
			<div class="title" id="assignTitle"></div>
			<div id="choiceArea"></div>
			<button class="close" id="closeAssign">关闭</button>
		</div>
	</div>
</template>

<script>

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
		.blockInfo
		{
			position: absolute;
			top: 0;
			left: 7em;
			width: 25em;
			height: 3em;
			padding-top: 1em;
			padding-right: 2em;
			text-align: right;
			color: white;
			font-size: xx-small;
		}
		.mengban
		{
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: black;
			opacity: 0.5;
			visibility: hidden;
		}
		.build
		{
			position: absolute;
			width: 36em;
			height: 20em;
			left: 10em;
			top:8em;
			background-color: #EEE8CD;
			visibility: hidden;
			.title
			{
				position: absolute;
				top:2em;
				left:1em;
				width: 34em;
			}
			.close
			{
				position: absolute;
				bottom: 1em;
				left:18em;

			}
			.choice
			{
				position: absolute;
				padding: .5em .5em .5em .5em;
				height: 1em;
				width: 34em;
			}
			.ctt
			{
				position: absolute;
				padding: .5em .5em .5em .5em;
				height: 1em;
				width: 34em;
			}
			.choice:hover
			{
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