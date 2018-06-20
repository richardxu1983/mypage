<template>
	<div>
		<article class="markdown-body">
			<div v-html="msg">
			</div>
		</article>
	</div>
</template>

<script>

export default {
	name:"test",
	data:function()
	{
		return {
			msg:""
		}
	},
	created:function()
	{
		this.msg = require("../../static/md/about.md");
	}
}


</script>

