<template>
	<div v-if="dt.cnt==1">
		<div class="map">
			<div v-for="(item,index) in maps" :key="index" class="left">
				<div :id="'map_tile_'+index" class="block" v-bind:class="currentClass(index)">
					{{mapName(index)}}
				</div>
			</div>
		</div>
		<div class="test">
			<button @click="move">移动</button>
		</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
import MX from '../../mlGame/core/maoxianCtrl.js'
import mxd from '../../mlGame/data/maoxian.js'
var $mapType = mxd.mapType;
var $ctrl = MX.maoxianCtrl;
var $data = MX.mx;

export default {
	name:"maoxian",
	data:function()
	{
		return{
			dt:sdt.dt,
			maps:$data.map,
			data:$data,
		}
	},
	computed:{
	},
	mounted:function()
	{
		console.log("maoxian vue mounted");
	},
	methods:
	{
		mapCell:function(index)
		{
			return $data.map[index];
		},
		mapName:function(index)
		{
			var id = this.mapCell(index);
			return $mapType[id].name;
		},
		current:function(index)
		{
			return index==this.data.current?true:false;
		},
		move:function()
		{
			$ctrl.move();
		},
		currentClass:function(index)
		{
			if(index==this.data.current)
				return "current"
			return "";
		},
	}
}

</script>


<style lang="scss" scoped>
	
	.map{
		position: absolute;
		left: 2em;
		top: 2em;
	}

	.block{
		border: solid 2px gray;
		padding: .5em .5em .5em .5em;
		margin-right: 0;
		margin-left: 0;
	}

	.current{
		border: solid 2px orange;
	}

	.left{
		float: left;
	}

	.test{
		position: absolute;
		right: 2em;
		bottom: 2em;		
	}

</style>