<template>
	<div v-if="dt.cnt==0">
		<div>home</div>
	</div>
</template>

<script>
import sdt from '../../mlGame/data/scene.js'
export default {
	name:"vhome",
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