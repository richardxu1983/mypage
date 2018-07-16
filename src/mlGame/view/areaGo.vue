<template>
	<div v-if="data.areaGo">
		<div class="md bd">
		</div>
		<div class="box bframe">
			<h3>选择要前往的地方...</h3>
			<div v-for="p in places" :key="p">
				<ul>
					<li  class="plcBtn left nosel" @click="gotoArea(p)">{{plName(p)}}</li><span>耗时：{{cti(p)}}小时</span>
				</ul>
			</div>
			<button class="close" @click="close" >关闭</button>	
		</div>		
	</div>
</template>

<script>

import MpB from '../../mlGame/core/gameMap.js'
import ACT from '../../mlGame/core/act.js'
var $area = MpB.AreaList;

export default {
	name:"areaGo",
	data:function()
	{
		return{
			data:ACT.actData
		}
	},
	computed:{
		places:function()
		{
			return $area[this.data.area].to;
		},
	},
	methods:
	{
		plName:function(p)
		{
			return $area[p].name;
		},
		close:function()
		{
			ACT.clearAreaGo();
		},
		gotoArea:function(p)
		{
			ACT.gotoArea(p);
		},
		cti:function(p)
		{
			var x1 = $area[this.data.area].pos.x;
			var y1 = $area[this.data.area].pos.y;
			var x2 = $area[p].pos.x;
			var y2 = $area[p].pos.y;
			return Math.ceil(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * 1);
		}
	}
}

</script>

<style lang="scss" scoped>

@import "../../scss/mlGame";

.box{
	.close{
		position: absolute;
		bottom: 10px;
		left: 17em;
	}
}

ul{
	display:flex;
	align-items: center;
	padding: 0;
	li{
		list-style-type: none;
		text-align: center;
	}
}

</style>