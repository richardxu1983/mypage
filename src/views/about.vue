<template>
	<div class="box">
		<img class="avatar" src="/static/img/avatar.png">
		<ul class="other-site">
	      <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
	        <img :src="site.img">
	      </li>
	    </ul>
		<div class="markdown-body" v-html="msg"></div>
	</div>
</template>

<script>

export default {
	name:"about",
	data:function()
	{
		return {
			msg:"",
			thirdPartySite: [  // 配置你想在左上角展示的第三方站点信息
			    {
			      img: '/static/img/github.png',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
			      url: 'https://github.com/richardxu1983'  // 第三方站点的 url
			    },
			    ],
		}
	},
	created:function()
	{
		this.msg = require("../../static/md/about.md");
		document.title = "关于老徐";
	}
}


</script>

<style lang="scss" scoped>
	
	.box{
		box-shadow: 0 1px 3px rgba(26,26,26,.1);
	}

	.avatar {
		width: 75px;
		height: 75px;
		border-radius: 10px;
		margin-top: 25px;
		margin-left: 0px;
		cursor: pointer;
	}

	.other-site {
		list-style: none;
		margin-top: 20px;
		margin-bottom: 25px;
		height: 20px;
		width: 120px;
		margin-left: 0px;
		padding: 0;
	}
	.other-site li {
	  cursor: pointer;
	  margin-right: 20px;
	}
	.other-site li img {
	    width: 22px;
	    height: 22px;
	}
	
</style>

