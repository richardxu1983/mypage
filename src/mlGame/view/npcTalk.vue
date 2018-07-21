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

			<div class="ctn sayBlock opt" v-if="showCtn" @click="contin">
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
			var d = $npc[this.data.npcId].desc;
			var wp = $npc[this.data.npcId].wp;
			if(wp<=0)
			{
				d+="，没有装备什么武器";
			}
			else
			{
				d+="，带了一"+WP.wpL[wp]+WP.wpQ[$wp[wp].quality]+"的"+WP.wpType[$wp[wp].type];
			}
			return d;
		},
		emot:function()
		{
			return this.data.psByEmot;
		},
		opts:function()
		{
			var i = this.data.ntIndex;
			if($npc[this.data.npcId].o[i])
			{
				if($npc[this.data.npcId].o[i][0].t>0)
				{
					return $npc[this.data.npcId].o[i];
				}
			}
		},
		pa:function()
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
		},
		showCtn:function()
		{
			var i = this.data.ntIndex;
			var step = this.data.ntStep;
			if(step==0)
			{
				return true;
			}
			else
			{
				if($npc[this.data.npcId].o[i].length==1)
					return true;
			}
			return false;
		}
	},
	methods:
	{
		clickOpt:function(i)
		{
			$npcTalk.clickOpt(i);
		},
		contin:function()
		{
			var i = this.data.ntIndex;
			var t = $npc[this.data.npcId].o[i][0].t;
			if(t>0)
			{
				var step = this.data.ntStep;
				if(step==0)
				{
					var len = $npc[this.data.npcId].a[i].length;
					var seg = this.data.ntSeg+1;
					if(seg<len)
					{
						$npcTalk.segNext();
					}
					else{
						$npcTalk.StepNext();
					}
				}
				else
				{
					if($npc[this.data.npcId].o[i].length==1)
						$npcTalk.clickOpt(0);
				}
			}
			else
			{
				$npcTalk.clear();
			}
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