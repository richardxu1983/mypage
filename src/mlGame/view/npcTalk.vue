<template>
	<div class=""  v-if="data.npcTalk">
		<div class="md bd">
		</div>
		<div class="box bframe">
			<h2>{{npcName}}</h2>
			<div class="psbBox">
				<div class="desc green">[{{desc}}]</div>
				<div class="desc green">{{emot}}<span class="black">{{pa}}</span></div>
				<div class="desc green"></div>
			</div>

			<div class="plyOp" v-if="data.plyOp">
				<div class="desc"><b>你：</b></div>
				<div class="desc psbBox opt" v-for="(v,index) in opts" :key="index" @click="clickOpt(index)">->“{{v.w}}”</div>			
			</div>

			<div class="ctn sayBlock opt" v-if="data.ntCtn" @click="contin">
				->继续<-	
			</div>
		</div>
	</div>
</template>

<script>

import ACT from '../../mlGame/core/act.js'
import NPC from '../../mlGame/core/npc.js'
import WP from '../../mlGame/core/weapon.js'

var $wp = WP.wp;
var $npcTalk = ACT.npcTalk;
var $npc = NPC.npc;


export default {
	name:"npcTalk",
	data:function()
	{
		return{
			data:ACT.actData
		}
	},
	computed:{
		npcName:function()
		{
			return $npcTalk.curName();
		},
		desc:function()
		{
			return $npcTalk.getDesc();
		},
		emot:function()
		{
			return this.data.psByEmot;
		},
		opts:function()
		{
			if(this.data.npcId>=0)
			{
				var i = this.data.ntIndex;
				if($npc[this.data.npcId].o[i])
				{
					if($npc[this.data.npcId].o[i][0].t>0)
					{
						return $npc[this.data.npcId].o[i];
					}
				}				
			}
		},
		pa:function()
		{
			if(this.data.npcId>=0)
			{
				var i = this.data.ntIndex;
				if($npc[this.data.npcId].a[i])
				{
					var seg = this.data.ntSeg;
					return "“"+$npc[this.data.npcId].a[i][seg]+"”";
				}
				else
				{
					return "";
				}				
			}
		},
	},
	methods:
	{
		clickOpt:function(i)
		{
			$npcTalk.clickOpt(i);
		},
		contin:function()
		{
			$npcTalk.onCtn();
		}
	}
}

</script>

<style lang="scss" scoped>

@import "../../scss/mlGame";

.box{
	background-color: 	#F5F5DC;
	h2{
		margin: 2em 0 .3em 0;
	}
}

.sayBlock{
	font-size: 1.2em;
	
}

.green{
	color: #6E8B3D;
}

.black{
	color: black;
}

.psbBox{
	width: 100%;
}

.desc{
	font-size: 1.2em;
	margin: 0em 0 .3em 0;
}

.psbSay{
	margin: 2em 0 1em 0;
}

.plyOp{
	margin: 3em 0 1em 0;
	.op{
		margin: 0 0 .5em 0;
	}
}

.opt{
	cursor: pointer;
}

.opt:hover{
	background-color: #CDC673;
}

.ctn{
	position: absolute;
	right: 1em;
	bottom: 1em;
}

</style>