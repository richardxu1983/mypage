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
			gametitle:"魔法大陆",
			gamedesc:"魔法大陆是老徐在小破站上做的第一个游戏，是一个关于一群勇敢的冒险者在充满魔法的大陆上冒险的故事。"
		}
	},
	created:function()
	{
		document.title = "魔法大陆";
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