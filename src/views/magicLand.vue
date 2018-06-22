<template>
	<div>
		<div class="markdown-body" >
			<h2>{{ gametitle }}</h2>
			<p>{{ gamedesc }}</p>
		</div>
		<div class="mlBoard">
		</div>
	</div>
</template>

<script>

export default {
	name:"magicLand",
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
	
	.mlBoard{
		width: 600px;
		height: 700px;
		margin: 0 45px 45px 45px;
		background-color: #FFFFE0;
		border: solid 2px #CDCDB4;
	}

</style>