<template>
	<div v-if="dt.cnt==1">
		<div>铁匠铺</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
export default {
	name:"vtiejiang",
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