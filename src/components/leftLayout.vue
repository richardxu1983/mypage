<template>
	<div class="left-layout-container">
		<img class="avatar" src="/static/img/avatar.png">
		<ul class="other-site">
	      <li v-for="site in thirdPartySite" :key="site.url" @click="openThirdPartySite(site.url)">
	        <img :src="site.img">
	      </li>
	    </ul>
	    <ul class="left-menu">
	    	<router-link :tag="li" v-for="(route,index) in routes" :to="route.path" :key="index" >{{route.name}}</router-link>
	    </ul>
	</div>
</template>

<script>

export default {
	name:"left-layout-container",
	data:function()
	{
		return {
				thirdPartySite: [  // 配置你想在左上角展示的第三方站点信息
			    {
			      img: '/static/img/github.png',  // 第三方站点图标，存放在「BGAIssueBlog-Web/static/img」目录中
			      url: 'https://github.com/richardxu1983'  // 第三方站点的 url
			    },
			    ],
			    routes:[
			    {
			    	name:"test",
			    	path:"/test"
			    },
			    ]
		}
	},
	methods:
	{
		openThirdPartySite (url) {
        	window.open(url)
      	},
	}
}

</script>

<style lang="scss" scoped>

	.left-layout-container {
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: 249px;
	background-color: #ffffff;
	border-right: 1px solid #eeeeee;
	}

	.avatar {
	width: 70px;
	height: 70px;
	border-radius: 10px;
	margin-top: 50px;
	margin-left: 90px;
	cursor: pointer;
	}

	.other-site {
	list-style: none;
	margin-top: 20px;
	margin-bottom: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	}
	.other-site li {
	  cursor: pointer;
	  margin-right: 20px;
	}
	.other-site li img {
	    width: 20px;
	    height: 20px;
	}
	.other-site li:last-child {
	  margin-right: 0px;
	}

  	.left-menu {
    // 上面总的高度为 290px，下面 QQ 群的 margin + 高度为 240px
    height: calc(100% - 290px - 240px);
    min-height: 150px;
    list-style: none;
    color: #4b595f;
    margin-bottom:100px;
    .a-player {
      margin-left:auto;
      margin-right:auto;
      margin-bottom:20px;
    }

    li {
      width: 249px;
      height: 60px;
      line-height: 60px;
      margin-top:20px;
      cursor: pointer;
      font-size: 16px;
      &:before {
        width: 4px;
        height: 100%;
        content: '';
        margin-right: 69px;
        float: left;
        display: table;
      }
    }
  }

</style>