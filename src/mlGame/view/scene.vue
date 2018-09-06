<template>
	<div class="container">
		<vhome></vhome>
		<vkuangchang></vkuangchang>
		<vteacher></vteacher>
		<vtiejiang></vtiejiang>
	</div>
</template>

<script>

import vhome from '../../mlGame/view/home.vue'
import vkuangchang from '../../mlGame/view/kuangchang.vue'
import vteacher from '../../mlGame/view/teacher.vue'
import vtiejiang from '../../mlGame/view/tiejiang.vue'
export default {
	name:"sceneView",
	data:function()
	{
		return{
		}
	},
	computed:{
	},
	components: 
	{
	  vhome,
	  vkuangchang,
	  vteacher,
	  vtiejiang,
	},
	methods:
	{
	}
}

</script>


<style lang="scss" scoped>
	
	.container{
		background-color: white;
		position: absolute;
		border: solid 0.15em #CDBA96;
		width: 100%;
		height: 24.7em;
		top:6.5em;
		box-sizing: border-box;
		padding: 1em 1em 0em 1em;
	}
</style>