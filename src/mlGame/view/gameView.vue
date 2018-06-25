<template>
	<div class="mlBoard">
		<div class="playerInfo" v-if="playerAttrShow">
			<p><label>{{ playerAttr['hp'].name }}：</label>{{ playerAttr['hp'].value }}</p>
			<p><label>{{ playerAttr['mp'].name }}：</label>{{ playerAttr['mp'].value }}</p>
			<p><label>{{ playerAttr['atk'].name }}：</label>{{ playerAttr['atk'].value }}</p>
			<p><label>{{ playerAttr['def'].name }}：</label>{{ playerAttr['def'].value }}</p>
		</div>
		<button class="btnShowPlayerattr" @click="playerAttrShow=!playerAttrShow">{{ btnShowPlayerattr }}</button>
	</div>
</template>

<script>

import UnitBundle from '../../mlGame/core/unit.js'

export default {
	name:"gameView",
	data:function()
	{
		return {
			btnShowPlayerattr:"属性",
			playerAttrShow:false,
			playerAttr:UnitBundle.Player.attr
		}
	},
	created:function()
	{

	},
}

console.log(UnitBundle.Player);


</script>

<style lang="scss" scoped>
	
	.btnShowPlayerattr{
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.mlBoard{
		width: 600px;
		height: 700px;
		margin: 0 45px 45px 45px;
		background-color: #FFFFE0;
		border: solid 2px #CDCDB4;
		position: relative;
	}


	.playerInfo{
		position: absolute;
		left: 200px;
		bottom: 200px;
		border: solid 2px #CDCDB4;
		width: 200px;
		height: 300px;
	}

</style>