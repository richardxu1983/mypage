<template>
	<div>
		<div class="markdown-body" >
			<h2>{{ gametitle }}</h2>
			<p>{{ gamedesc }}</p>
		</div>
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
			gamedesc:"一个练手vue的小游戏"
		}
	},
	created:function()
	{
		document.title = "魔法大陆";
	}
}


</script>

<style lang="scss" scoped>
	

</style>