<template>
	<div v-if="show.pnl">
		<div class="md bd">
		</div>
		<div class="topBar">
			<div class="btn" :class="{active:(sel==1)}" @click="psel(1)">
				基本信息
			</div>
			<div class="btn" :class="{active:(sel==3)}" @click="psel(3)">
				所有战法
			</div>
			<div class="btn" :class="{active:(sel==2)}" @click="psel(2)">
				技艺/内功
			</div>
		</div>
		<div class="box">
			<div v-if="zfPnl" class="zfSelPnl">
				<div class="txt">全部战法</div>
				<div class="contain">
					<div v-for="(zf,index) in zfList" :key="index">
						<div :id="'zf_'+index" class="left cell" @click="zfSel(index)">
							<img class="pic" :src="zfIcon(index)">
							<div class="szName">
								{{zfName(index)}}
							</div>
							<div class="lv">
								{{zfLv(index)}}
							</div>
						</div>
					</div>
				</div>
				<button class="clo" @click="zfPnl=false">关闭</button>
			</div>
			<div v-if="sel==1">
				<div class="attr">
					<div class="tit">
						基本属性
					</div>
					<div class="con">
						<div class="lcon">
							<p>生命：{{ hp }}/{{ hpmax }}</p>
							<p>悟性：0</p>	
							<p>速度：{{ spd }}</p>
						</div>
						<div class="rcon">
							<p>攻击：{{ atk }}</p>
							<p>仙法：{{ mtk }}</p>
							<p>防御力：{{ def }}</p>
						</div>						
					</div>

				</div>
				<div class="szzf">
					<div class="title">
						上阵战法
					</div>
					<div v-for="(sk,index) in fsl" :key="index"  @click="openZfPnl(index)" class="left cell">
						<div class="txt" v-if="sk<0">
							空
						</div>
						<div v-else>
							<img class="pic" :src="skIcon(index)">
							<div class="szName">{{szzfName(index)}}</div>
							<div class="lv">
								{{szzfLv(index)}}
							</div>
						</div>
					</div>
				</div>
				<div class="cl">
					<div class="title">
						研习
					</div>
					<div class="cell">
						<div v-if="learning">
							<img class="pic" :src="clIcon()">
							<div class="time">
								{{clTime}}
							</div>
						</div>
						<div class="txt" v-else>
							空
						</div>
					</div>
				</div>
				<div class="bagttl">
					背包
				</div>
				<div class="bag">
					<div v-for="(item,index) in bag" :key="index" class="left" @click="useItem(index)">
						<div :id="'bag_'+index" class="item">
							<div class="picf">
								<img class="pic" :src="itemIcon(index)">
							</div>
							<div class="num">
								{{itemNum(index)}}
							</div>
							<div class="name">
								{{itemName(index)}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="sel==2" class="ng">
				<div v-for="(ng,index) in ngList" :key="index" class="left">
					<div :id="'ng_'+index" class="cell" @click="study(0,index)">
						<img class="pic" :src="ngIcon(index)">
						<div class="szName">
							{{ngName(index)}}
						</div>
						<div class="lv">
							{{ngLv(index)}}
						</div>
					</div>
				</div>
			</div>
			<div v-if="sel==3" class="ng">
				<div v-for="(zf,index) in zfList" :key="index" class="left">
					<div :id="'zf_'+index" class="cell" @click="study(1,index)">
						<img class="pic" :src="zfIcon(index)">
						<div class="szName">
							{{zfName(index)}}
						</div>
						<div class="lv">
							{{zfLv(index)}}
						</div>
					</div>
				</div>
			</div>
			<button class="close" @click="close">关闭</button>
		</div>
	</div>
</template>

<script>

import UB from '../../mlGame/core/unit.js'
import RO from '../../mlGame/core/role.js'
import SK from '../../mlGame/data/skill.js'
import ITM from '../../mlGame/data/item.js'
import NG from '../../mlGame/data/ng.js'
var skl = SK.FSKL;
var $ply = RO.role;
var $plyUI = RO.ui;
var $item = ITM.item;
var $ng = NG.NG;

export default {
	name:"plyPnl",
	data:function()
	{
		return {
			player:$ply,
			show:$plyUI,
			sel:1,
			zfPnl:false,
			cuFtIdx:-1,
		}
	},
	computed: 
	{
		bag:function()
		{
			return this.player.bag();
		},
		ngList:function()
		{
			return this.player.attr.ng;
		},
		fsl:function()
		{
			return this.player.attr.fskl;
		},
		zfList:function()
		{
			return this.player.attr.zf;
		},
		name:function()
		{
			return this.player.name();
		},
		hpmax:function()
		{
			return this.player.hpmax();
		},
		hp:function()
		{
			return this.player.hp();
		},
		atk:function()
		{
			return this.player.atk();
		},
		mtk:function()
		{
			return this.player.mtk();
		},
		def:function()
		{
			return this.player.def();
		},
		spd:function()
		{
			return this.player.spd();
		},
		learning:function()
		{
			if(this.player.attr.cl.type==-1)
				return false;
			else
				return true;
		},
		clTime:function()
		{
			var type=this.player.attr.cl.type;
			var idx=this.player.attr.cl.index;
			if(type==0)
			{
				var ng = this.player.attr.ng[idx];
				var lv = ng.lv;
	            var id = ng.id;
	            var lb = $ng[id].lb;
	            var lbp = $ng[id].lbp;
	            var next = Math.ceil(lb+Math.pow(lbp,lv));
	            return (ng.study/next).toFixed(0)+"%";
			}
			if(type==1)
			{
				console.log("idx="+idx);
				var zf = this.player.attr.zf[idx];
				var lv = zf.lv;
	            var id = zf.id;
	            var lb = skl[id].lb;
	            var lbp = skl[id].lbp;
	            var next = Math.ceil(lb+Math.pow(lbp,lv));
	            return (zf.study/next).toFixed(0)+"%";
			}
		},
	},
	methods:
	{
		close:function()
		{
			this.zfPnl=false;
			this.show.pnl=false;
		},
		itemName:function(index)
		{
			var bag = this.bag;
			var id = bag[index].id;
			return $item[id].name;
		},
		itemNum:function(index)
		{
			var bag = this.bag;
			var num = bag[index].stack;
			return num;
		},
		useItem:function(index)
		{
			this.player.bagUseItem(index);
		},
		itemIcon(index)
		{
			var bag = this.bag;
			var id = bag[index].id;
			return "/static/img/mlGame/item_"+$item[id].icon+".png";
		},
		psel:function(s)
		{
			this.sel=s;
		},
		ngName:function(index)
		{
			var ng = this.player.attr.ng[index];
			var id = ng.id;
			return $ng[id].name;
		},
		ngIcon:function(index)
		{
			var ng = this.player.attr.ng[index];
			var id = ng.id;
			return "/static/img/mlGame/ng_"+$ng[id].icon+".png";
		},
		zfName:function(index)
		{
			var zf = this.player.attr.zf[index];
			var id = zf.id;
			return skl[id].name;
		},
		zfLv:function(idx)
		{
			var zf = this.player.attr.zf[idx];
			return "L"+zf.lv;
		},
		ngLv:function(index)
		{
			var ng = this.player.attr.ng[index];
			return "L"+ng.lv;
		},
		szzfName:function(idx)
		{
			var el = this.player.attr.fskl[idx];
			var zf = this.player.attr.zf[el];
			var id = zf.id;
			return skl[id].name;
		},
		szzfLv:function(idx)
		{
			var el = this.player.attr.fskl[idx];
			var zf = this.player.attr.zf[el];
			return "L"+zf.lv;
		},
		zfIcon:function(index)
		{
			var zf = this.player.attr.zf[index];
			var id = zf.id;
			return "/static/img/mlGame/zf_"+skl[id].icon+".png";
		},
		skIcon:function(idx)
		{
			var el = this.player.attr.fskl[idx];
			var zf = this.player.attr.zf[el];
			var id = zf.id;
			return "/static/img/mlGame/zf_"+skl[id].icon+".png";
		},
		study:function(type,idx)
		{
			this.player.changeStudy(type,idx);
		},
		clIcon:function()
		{
			var type=this.player.attr.cl.type;
			var idx=this.player.attr.cl.index;
			if(type==0)
			{
				var ng = this.player.attr.ng[idx];
	            var id = ng.id;
	            return "/static/img/mlGame/ng_"+$ng[id].icon+".png";

			}
			if(type==1)
			{
				var zf = this.player.attr.zf[idx];
	            var id = zf.id;
	            return "/static/img/mlGame/zf_"+skl[id].icon+".png";
			}			
		},
		openZfPnl:function(index)
		{
			this.cuFtIdx = index;
			this.zfPnl=true;
		},
		zfSel:function(idx)
		{
			this.player.addToFtByIdxPos(idx,this.cuFtIdx);
			this.zfPnl=false;
		},
	}
}
</script>

<style lang="scss" scoped>

	@import "../../scss/mlGame";

	.topBar
	{
		position: absolute;
		width: 52em;
		top:4.5em;
		height: 3em;
		left: 6em;
		z-index:100;
		.btn
		{
			float: left;
			width: 5.5em;
			height: 100%m;
			padding: 5px;
			background-color: #333;
			border: solid 1px gray;
			color:white;
			text-align: center;
		}
		.btn:hover
		{
			cursor: pointer;
		}
		.active
		{
			background-color: #69594e;
		}
	}

	.cell
	{
		width: 5em;
		height: 5em;
		background-color: #111;
		margin:.5em;
		.pic
		{
			position: relative;
			top:1em;
			left: 1.5em;
			width: 24px;
			height: 24px;
		}
		.szName
		{
			position: relative;
			top:1.7em;
			width: 6em;
			text-align: center;
			overflow-style: hidden;
			font-size: xx-small;
		}
		.lv
		{
			position: relative;
			top:-1.8em;
			right: -3.8em;
			width: 2em;
			height: 15px;
			text-align: center;
			font-size: xx-small;
		}
		.sel
		{
			position: relative;
			bottom: -2em;
			left: 1.5em;
		}
		.txt
		{
			position: relative;
			top:1.5em;
			width: 5em;
			text-align: center;

		}
	}
	.cell:hover
	{
		cursor: pointer;
	}
	.box
	{
		position: absolute;
		width: 40em;
		height: 29.3em;
		left: 6em;
		top: 6.7em;
		padding: 25px;
		background-color: #333;
		color: white;
		border: 2px solid black;
		
		.zfSelPnl
		{
			position: absolute;
			border: solid 2px black;
			background-color: #443c36;
			left: 5.5em;
			top:4em;
			width: 32em;
			height: 20em;
			z-index:1;
			.txt
			{
				position: absolute;
				left:.5em;
				top:.5em;
				background-color: #443c36;
				font-weight: bolder;
				padding: .5em;
			}
			.contain
			{
				position: absolute;
				left: 2em;
				top: 4em;
				width: 28em;
				height: 12em;
				border: solid 1px black;
				background-color: #333;
				overflow: scroll;
			}
			.clo
			{
				position: absolute;
				left: 15em;
				bottom: 1em;
			}
		}

		.ng
		{
			padding: 1em;
			width: 38em;
			height: 21em;
			overflow: scroll;
			border: solid 1px black;
			position: absolute;
			background-color: #443c36;
		}
		.title
		{
			position: absolute;
			top: -1.5em;
			background-color: #443c36;
			font-weight: bolder;
			padding: .2em;
			left: 0.5em;
			font-size:small;
		}
		.szzf
		{
			position: absolute;
			top: 11.3em;
			left: 17em;
			width: 25em;
			height: 5em;
			.back
			{
				background-color: #443c36;
			}
		}
		.cl
		{
			position: absolute;
			top: 11.3em;
			left: 10em;
			width: 6em;
			height: 5em;
			text-align: center;
			.back
			{
				background-color: #443c36;
			}
			.pic
			{
				position: absolute;
				top:1.5em;
				height: 24px;
				width: 24px;
				left: 2.2em;
			}
			.txt
			{
				position: absolute;
				top:2.5em;
				width: 6em;
				text-align: center;
				font-size: xx-small;
			}
			.time
			{
				position: absolute;
				top:4.5em;
				height: 24px;
				width: 6em;
				text-align: center;
				font-size: xx-small;
			}
		}
		.attr
		{
			position: absolute;
			top:2.1em;
			left:10.5em;
			.tit
			{
				position: absolute;
				top: -1.2em;
				background-color: #443c36;
				font-weight: bolder;
				padding: .2em;
				width: 4.5em;
			}
			.con
			{
				position: absolute;
				top:1em;
				background-color: #111;
				font-size: xx-small;
				width: 22em;
				height: 5em;
				padding: 1em;
			}
			.lcon
			{
				position: absolute;
				top:.8em;
				width: 8em;
			}
			.rcon
			{
				position: absolute;
				width: 7em;
				left:12em;
				top:.8em;
			}
		}
		.close
		{
			position: absolute;
			bottom: 1em;
			left: 21em;
		}
		
		.bagttl
		{
			position: absolute;
			top: 17.1em;
			left: 10.5em;
			background-color: #443c36;
			font-weight: bolder;
			padding: .2em;
		}

		.bag
		{
			position: absolute;
			right: 1em;
			bottom: 3.5em;
			width: 32em;
			height: 10em;
			border: solid 1px black;
			background-color: #443c36;
			overflow: scroll;
			position: absolute;

			.item
			{
				float: left;
				margin: 2px;
				width: 4em;
				height:4em;
				vertical-align: middle;
				display: table-cell;
				.pic
				{
					position: relative;
					width: 34px;
					height: 34px;
					top: .5em;
					left:.7em;
				}
				.name
				{
					position: relative;
					bottom:.5em;
					width: 100%;
					height: 1.5em;
					overflow: hidden;
					font-size: xx-small;
					text-align: center;
					color: white;
				}
				.num
				{
					position: relative;
					bottom: 1em;
					right:-3em;
					width: 1.5em;
					overflow: hidden;
					text-align: center;
					background-color: #333;
					color: white;
					font-size: xx-small;
				}
			}
		}
	}

</style>