<template>
	<div class="left-layout-container">
		<img class="siteLogo" src="/static/img/siteLogo.png">
		<div class="siteTitle"> 
			<div class="siteTitleCell">
				<b>小站</b>
			</div> 
			<div class="siteTitleCell1">
				{{ titleEmoji }}
			</div> 
		</div>
	    <ul class="left-menu">
	    	<router-link tag="li" v-for="route in routes" :to="route.path" :key="route.name" >{{route.name}}</router-link>
	    </ul>
	</div>
</template>

<script>


const EmojiList = [
"(^_^)/",
" (・(ェ)・)",
'<(￣︶￣)>',
"╮（╯◇╰）╭",
'≧▽≦y',
"(^o^)／",
"(;¬_¬) ",
"｡◕‿◕｡ ",
"(*°∀°)=3",
"(´∀｀)♡ "
]



export default {
	name:"left-layout-container",
	data:function()
	{
		return {
			    routes:[
			    {
			    	name:"小站首页",
			    	path:"/frontPage"
			    },
			    {
			    	name:"魔法大陆",
			    	path:"/magicLand"
			    },
			    {
			    	name:"关于老徐",
			    	path:"/about"
			    },
			    ],
			    titleEmoji:""
		}
	},
	created:function()
	{
		let ran = Math.floor(Math.random()*10);
		this.titleEmoji = EmojiList[ran];
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

	.siteLogo {
	width: 115px;
	height: 90px;
	margin-top: 50px;
	margin-left: 45px;
	cursor: pointer;
	}

	.siteTitle {
	color: #6495ED;
	margin-left: 50px;
	cursor: pointer;
	margin-top: 10px;
		.siteTitleCell{
			float: left;
			margin-left: 10px;
			padding: 0;
			font-size: 130%;
		}
		.siteTitleCell1{
			float: left;
			margin-left: 10px;
			padding-top:2px;
			font-size: 100%;
		}
	}

	.left-layout-container {
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	width: 249px;
	background-color: #ffffff;
	border-right: 1px solid #eeeeee;
	}

  	.left-menu {
    	// 上面总的高度为 290px，下面 QQ 群的 margin + 高度为 240px
	    height: calc(100% - 290px - 240px);
	    min-height: 150px;
	    list-style: none;
	    color: #4A708B;
	    margin-bottom:100px;
	    margin-top:100px;
	    padding: 0;
	    li {
	    	padding-right: 40px;
	    	text-align: right;
	    	box-sizing: border-box;
			width: 100%;
			height: 60px;
			padding-top: 10px;
			line-height: 40px;
			cursor: pointer;
			font-size: 16px;
	      &:hover{
	      	background-color:#FFFFE0;
	      }
	      &:before {
	        width: 4px;
	        height: 100%;
	        content: '';
	        margin-right: 69px;
	        float: left;
	        display: table;
	      }
    	}
    	.router-link-active{
    		background-color:#FFFFE0;
    	}
	}

</style>