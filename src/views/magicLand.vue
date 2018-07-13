<template>
	<div class="bak">
		<div class="title" >
			<h3>{{ gametitle }}</h3>
			<p class="d">{{ gamedesc }}</p>
		</div>
		<br>
		<div>
			<gameView></gameView>
		</div>
	</div>
</template>

<script>

import gameView from '../mlGame/view/gameview.vue'

export default {
	name:"magicLand",
	components:{
		gameView
	},
	data:function()
	{
		return {
			gametitle:"苦逼屠龙记",
			gamedesc:"苦逼屠龙记是老徐在小破站上做的第一个游戏，是一个关于一个勇敢的冒险者要在600天以内恶龙手中拯救村庄的故事。"
		}
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