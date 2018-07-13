<template>
	<div class="AppHeader">
		<div class="nav">
			<div class="begin"> 
				<div @click="home" class="a">
					<b>小-破-站</b>
				</div> 
				<div @click="home" class="a left">
					{{ titleEmoji }}
				</div> 
			</div>
			<ul class="end">
		    	<router-link tag="li" v-for="route in routes" :to="route.path" :key="route.name" >{{route.name}}</router-link>
		    </ul>
		</div>
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
			    	name:"苦逼屠龙记",
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
      	home () 
      	{
        	this.$router.push('/')
      	},
	}
}

</script>

<style lang="scss" scoped>

	.AppHeader{
		position: relative;
	    z-index: 100;
	    min-width: 1032px;
	    overflow: hidden;
	    background: #fff;
	    box-shadow: 0 1px 3px rgba(26,26,26,.1);
	    background-clip: content-box;
	}

  	.nav {
		position: relative;
	    display: flex;
	    justify-content: flex-begin;
	    align-items: center;
	    width: 800px;
	    height: 52px;
	    margin: 0 auto;
	    color: #8590a6;
	    .begin{
	    	justify-content: flex-begin;
	    	-webkit-box-flex: 1;
		    -ms-flex: 1;
		    flex: 0 1 auto;
		    -webkit-box-pack: begin;
			display: flex;
			color: #87CEFA;
			font-size: 24px;
			.a {
				cursor: pointer;
			}
			.left{
				margin-left: 15px;
				font-size: 0.6em;
				padding-top: 7px;
			}
	    }
	    ul
	    {
		    flex: 0 1 auto;
		    display:flex;
		    font-size: 15px;
	    	li
	    	{
				cursor: pointer;
				list-style-type: none;
				text-align: center;
				padding: 0 15px;
				line-height: 50px;
				-webkit-user-select:none;
			    -moz-user-select:none;
			    -ms-user-select:none;
			    user-select:none;
		      &:hover{
		      	background-color: #E0FFFF;
		      }
	    	}
	    	.router-link-active{
	    		color: black;
	    		border-bottom: solid 3px #87CEFA;
	    	}
	    }
	}

</style>