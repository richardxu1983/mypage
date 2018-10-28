<template>
	<div v-if="show.pnl">
		<div class="md bd">
		</div>
		<div class="topBar">
			<div class="btn" @click="psel(1)">
				基本
			</div>
			<div class="btn" @click="psel(2)">
				内功
			</div>
			<div class="btn" @click="psel(3)">
				战法
			</div>
		</div>
		<div class="box">

			<div v-if="sel==1">
				<div class="attr">
					<p>当前生命：{{ hp }}</p>
					<p>最大生命：{{ hpmax }}</p>
					<p>攻击：{{ atk }}</p>
					<p>防御力：{{ def }}</p>
					<p>速度：{{ spd }}</p>	
				</div>
				<div class="bag">
					<div v-for="(item,index) in bag" :key="index" class="left" @click="useItem(index)">
						<div :id="'bag_'+index" class="item">
							<div class="picf">
								<img class="pic" :src="itemIcon(index)">
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
					<div :id="'ng_'+index" class="item">
						<img class="pic" :src="ngIcon(index)">
						<div class="name">
							{{ngName(index)}}
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
var skl = SK.SKL;
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
		def:function()
		{
			return this.player.def();
		},
		spd:function()
		{
			return this.player.spd();
		},
	},
	methods:
	{
		close:function()
		{
			this.show.pnl=false;
		},
		itemName:function(index)
		{
			var bag = this.bag;
			var id = bag[index].id;
			return $item[id].name;
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
			return $ng[id].name+" ( Lv."+ng.lv+" )";
		},
		ngIcon:function(index)
		{
			var ng = this.player.attr.ng[index];
			var id = ng.id;
			return "/static/img/mlGame/ng_"+$ng[id].icon+".png";
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
		top:3.9em;
		height: 3em;
		left: 2em;
		z-index:100;
		.btn
		{
			float: left;
			width: 3.5em;
			height: 100%m;
			padding: 5px;
			background-color: #333;
			border: solid 1px gray;
			color:white;
			text-align: center;
		}
	}

	
	
	.box
	{
		position: absolute;
		width: 48em;
		height: 30em;
		left: 2em;
		top: 6em;
		padding: 25px;

		.ng
		{
			padding: 1em;
			width: 47em;
			height: 27em;
			overflow: scroll;
			border: solid 1px black;
			position: absolute;
			background-color: #333;
			.item
			{
				float: left;
				margin: 2px;
				width: 6em;
				height: 7em;
				vertical-align: middle;
				display: table-cell;
				position: absolute;
				.pic
				{
					position: absolute;
					width: 4em;
					height: 4em;
					top: 0em;
					left:.5em;
				}
				.name
				{
					position: absolute;
					bottom: .2em;
					width: 6em;
					overflow: hidden;
					font-size: 50%;
					text-align: center;
					background-color: #333;
					color: white;
				}
			}
		}

		.attr
		{
			position: absolute;
			top:4em;
			left: 4em;
		}
		.close
		{
			position: absolute;
			bottom: 1em;
			left: 25em;
		}

		.bag
		{
			position: absolute;
			right: 2em;
			bottom: 4em;
			width: 37em;
			height: 14.8em;
			border: solid 1px black;
			background-color: gray;
			overflow: scroll;
			position: absolute;
			.item
			{
				float: left;
				margin: 2px;
				width: 4em;
				height: 4.5em;
				border: solid 1px black;
				vertical-align: middle;
				display: table-cell;
				background-color: #333;
				position: absolute;
				.pic
				{
					position: absolute;
					width: 2em;
					height: 2em;
					top: .5em;
					left:1em;
				}
				.name
				{
					position: absolute;
					bottom: .2em;
					width: 100%;
					height: 1.5em;
					overflow: hidden;
					font-size: 50%;
					text-align: center;
					color: white;
				}
			}
		}
	}

</style>