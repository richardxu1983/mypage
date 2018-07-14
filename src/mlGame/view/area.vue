<template>
	<div class="mapPanel">
		<div><b class="title">{{plyPos}}</b>&ensp;{{dist}}</div>
		<div class="plc">
			<div v-for="p in places" :key="p" class="plcName">
				{{plName(p)}}
			</div>
		</div>
		<div>
		</div>
	</div>
</template>

<script>

import MpB from '../../mlGame/core/gameMap.js'
import UB from '../../mlGame/core/unit.js'
var $area = MpB.AreaList;
var $dist = MpB.district;
var $plc = MpB.plc;
var $ply = UB.Player;

export default {
	name:"area",
	data:function()
	{
		return{
			pos:$ply.attr.pos,
		}
	},
	computed:{
		plyPos:function()
		{
			return $area[this.pos.value].name;
		},
		dist:function()
		{
			var dis = $area[this.pos.value].dist;
			if(dis>=0)
			{
				return "（隶属于："+$dist[dis].name+"）";
			}
			else
			{
				return "";
			}
		},
		places:function()
		{
			return $area[this.pos.value].place;
		},

	},
	methods:
	{
		plName:function(p)
		{
			return $plc[p].name;
		},
	}
}

</script>


<style lang="scss" scoped>

.mapPanel{
	position: absolute;
	width: 535px;
	height: 150px;
	top: 50px;
	left: 25px;
	padding: 5px;
	.title{
		font-size: 1.4em;
	}
	.plc{
		padding: 20px 0 0 0;
		.plcName{
			float: left;
			margin-right: 10px;
			border: solid 1px black;
			padding: 2px 8px 2px 8px;
			cursor: pointer;
		}
		.plcName:hover{
			text-decoration: underline;
		}
	}

}

</style>