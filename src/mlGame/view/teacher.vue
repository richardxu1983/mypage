<template>
	<div v-if="dt.cnt==3">
		<div>名师</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
export default {
	name:"vteacher",
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