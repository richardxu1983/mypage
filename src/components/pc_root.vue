<template>
	<div>
		<LeftLayout/>
		<router-view  class="main-container"/>
	</div>
</template>

<script>

import LeftLayout from './LeftLayout.vue'

export default {
	name:"pc_root",
	components: 
  {
      LeftLayout
  },
  mounted:function()
  {
    this.$router.push("/frontPage")
  }
}

document.title = 'pc端首页'

</script>

<style>
  .main-container {
    position: fixed;
    left: 250px;
    right: 0px;
    bottom: 0px;
    top: 0px;
  }
</style>
