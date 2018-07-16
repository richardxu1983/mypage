<template>
	<div class="mapPanel">
		<div><b class="title">位置：{{plyPos}}</b>&ensp;{{dist}}</div>
		<div class="plc">
			<div v-for="p in places" :key="p" class="plcBtn left nosel">
				{{plName(p)}}
			</div>
		</div>
		<div class="act">
			<div class="subTitle"><b>行动</b></div>
			<div v-for="p in acts" :key="p" @click="act(p)" class="actBtn left nosel">
				{{actName(p)}}
			</div>
		</div>
		<div>
		</div>
	</div>
</template>

<script>

import MpB from '../../mlGame/core/gameMap.js'
import ACT from '../../mlGame/core/act.js'
import UB from '../../mlGame/core/unit.js'
var $area = MpB.AreaList;
var $dist = MpB.district;
var $plc = MpB.plc;
var $ply = UB.Player;
var $act = ACT.areAct;

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
		acts:function()
		{
			return $area[this.pos.value].act;
		},
	},
	methods:
	{
		plName:function(p)
		{
			return $plc[p].name;
		},
		actName:function(p)
		{
			return $act[p].name;
		},
		act:function(p)
		{
			ACT.AreaDoAct(p,this.pos.value);
		},
	}
}

</script>


<style lang="scss" scoped>

@import "../../scss/mlGame";

.mapPanel{
	position: absolute;
	width: 535px;
	height: 150px;
	top: 5em;
	left: 1.5em;
	padding: 5px;
	.title{
		font-size: 1.4em;
	}
	.plc{
		padding: 1em 0 0 0;
		margin: 1em 0 0em 0;
		height: 5em;
	}
	.act{
		margin-top: 2em;
	}
	.subTitle{
		font-size: 1.31em;
		margin-bottom: 0.7em;
	}
}

</style>