<template>
	<div class="sce">
		<div id="maps"></div>
		<img class="" id="flag" src="/static/img/mlGame/flag.png">
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
	}
</style>