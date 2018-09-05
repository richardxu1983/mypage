<template>
	<div v-if="dt.cnt==2">
		<div>矿场</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
export default {
	name:"vkuangchang",
	data:function()
	{
		return{
			dt:sdt.dt,
		}
	},
	computed:{
	},
	methods:
	{
	}
}

</script>


<style lang="scss" scoped>
	
</style>