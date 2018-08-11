<template>
	<div class="bak">
		<div class="title" >
			<h3>{{ title }}</h3>
			<p class="d">{{ desc }}</p>
		</div>
		<br>
		<div>
			<gameView></gameView>
		</div>
	</div>
</template>

<script>

import gameView from '../mlGame/view/gameview.vue'
import DT from '../mlGame/data/gData.js'
var $dt = DT.data;

export default {
	name:"magicLand",
	components:{
		gameView
	},
	data:function()
	{
		return {
			title:"苦逼屠龙记",
		}
	},
	computed:{
		desc:function()
		{
			return "苦逼屠龙记是老徐在小破站上做的第一个游戏，是一个关于一个勇敢的冒险者要在"+$dt.timeLimit+"天以内恶龙手中拯救村庄的故事。（游戏仍然在开发中，目前不具备可玩性）";
		},
	},
	created:function()
	{
		document.title = "苦逼屠龙记";
	}
}


</script>

<style lang="scss" scoped>
	
	.bak{
		background: #f6f6f6;
		.d{
			font-size: 15px;
			color: #666;
		}
	}

</style>