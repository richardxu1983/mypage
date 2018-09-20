<template>
	<div>
		<div class="nav">
			<div v-for="p in sceneList" :key="p" :id="p.id" @click="sceneTo(p.param)" class="left navBtn">
				{{p.name}}
			</div>
		</div>
		<div class="container">
			<vhome></vhome>
			<vkuangchang></vkuangchang>
			<vteacher></vteacher>
			<vmaoxian></vmaoxian>
		</div>		
	</div>
</template>

<script>

import vhome from '../../mlGame/view/home.vue'
import vkuangchang from '../../mlGame/view/kuangchang.vue'
import vteacher from '../../mlGame/view/teacher.vue'
import vmaoxian from '../../mlGame/view/maoxian.vue'
import sdt from '../../mlGame/data/scene.js'
import sce from '../../mlGame/core/sceneCtrl.js'

export default {
	name:"sceneView",
	data:function()
	{
		return{
			sceneList:sdt.dt.tab,
		}
	},
	computed:{
	},
	components: 
	{
	  vhome,
	  vkuangchang,
	  vteacher,
	  vmaoxian,
	},
	methods:
	{
		sceneTo:function(n)
		{
			sce.scene.to(n);
		},
	}
}

</script>


<style lang="scss" scoped>

	@import "../../scss/mlGame";

	.nav{
		position: absolute;
		top: 4em;
		padding-left: 2em;
	}
	.navBtn
	{
		width: 6em;
		height: 2em;
		color: black;
		margin-right: .5em;
		text-align: center;
		padding-top: .5em;
		cursor: pointer;
		border: outset 0.2em #CDB38B;
	}
	.container{
		background-color: white;
		position: absolute;
		border: solid 0.15em #CDBA96;
		width: 100%;
		height: 23.7em;
		top:6.5em;
		box-sizing: border-box;
		padding: 1em 1em 0em 1em;
	}
</style>