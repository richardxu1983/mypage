<template>
	<div v-if="data.areaGo">
		<div class="md bd">
		</div>
		<div class="mediumBox bframe">
			<h2>{{tit}}</h2>
			<div v-if="!data.areaGoProc">
				<div v-for="p in places" :key="p" >
					<ul>
						<li  class="actBtn left nosel" @click="gotoArea(p)">{{plName(p)}}</li><span>耗时：{{cti(p)}}小时</span>
					</ul>
				</div>
				<button class="close" @click="close">关闭</button>				
			</div>
			<div class="proc" v-if="data.areaGoProc">
				<div class="baseBar bar"></div>
				<transition
				   appear
				   v-on:appear="customAppearHook"
				   v-on:after-appear="customAfterAppearHook"
				 >
					<div class="procBar bar" id="procbar"></div>
				</transition>
			</div>
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
		tit:function()
		{
			if(!this.data.areaGoProc)
			{
				return "请选择要去的地方...";
			}
			else
			{
				return "正在前往[ "+$area[this.data.areaTo].name+" ]";
			}
		}
	},
	methods:
	{
		plName:function(p)
		{
			return $area[p].name;
		},
		close:function()
		{
			ACT.areaGo.clear();
		},
		gotoArea:function(p)
		{
			ACT.areaGo.confirm(p);
		},
		cti:function(p)
		{
			var x1 = $area[this.data.area].pos.x;
			var y1 = $area[this.data.area].pos.y;
			var x2 = $area[p].pos.x;
			var y2 = $area[p].pos.y;
			return Math.ceil(Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)) * 1);
		},
		customAppearHook:function()
		{

		},
		customAfterAppearHook:function()
		{
			document.getElementById('procbar').style.transition="width 1500ms ease-out";
			document.getElementById('procbar').style.width = '22em';
			document.getElementById('procbar').addEventListener('webkitTransitionEnd', function(){
				ACT.areaGo.goto();
			});
		}
	}
}

</script>

<style lang="scss" scoped>

@import "../../scss/mlGame";

.mediumBox{
	background-color: #F5F5DC;
	.close{
		position: absolute;
		bottom: 1em;
		left:16em;
	}
	h2{
		margin-top: 1.2em;
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

.proc{
	margin-top: 2em;
	.bar{
		position: absolute;
		top: 9em;
		left: 5em;	
		height: 2em;	
	}
	.baseBar{
		width: 22em;
		border: solid 1px #999;
	}
	.procBar{
		width: 0em;
		background-color: #6495ED;
		border: solid 1px #6495ED;
	}
}


</style>