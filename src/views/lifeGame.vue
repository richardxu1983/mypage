<template>
	<div class="bak">
		<div class="title" >
			<h3>生命游戏</h3>
		</div>
		<br>
		<div>
			<div class="bd">
				<div v-for="(v,index) in data" :key="index">
					<div v-for="(j,jindex) in data[index]" :id="index+'_'+jindex" :key="jindex" class="cell" :style="{top:index*5+'px',left:jindex*5+'px',backgroundColor:getColor(index,jindex)}" @click="onClick(index,jindex)">
					</div>
				</div>
			</div>
			<div class="btns">
				<button class="btn" @click="begin">{{startTxt}}</button>
				<button class="btn" @click="reset">重置</button>
				<button class="btn" @click="ran">随机</button>
				<button class="btn" @click="step">下一步</button>
			</div>
		</div>
	</div>
</template>

<script>

var grid = [];
var newGrid = [];
const maxCell = 140;
const prob = 0.06
function init()
{
	let v;
	for(let i=0;i<maxCell;i++)
	{
		grid[i] = [];
		newGrid[i]=[];
		for(let j=0;j<maxCell;j++)
		{
			grid[i][j] = 0;
			newGrid[i][j]=0;
		}
	}
}
init();

function set()
{
	let v;
	let g;
	for(let i=0;i<maxCell;i++)
	{
		for(let j=0;j<maxCell;j++)
		{

			grid[i][j] = 0;
			g = document.getElementById(i+"_"+j);
			if(grid[i][j]==1)
				g.style.backgroundColor="white";
			else
				g.style.backgroundColor="black";
		}
	}
}

function ranD()
{
	let v;
	let g;
	for(let i=0;i<maxCell;i++)
	{
		for(let j=0;j<maxCell;j++)
		{
			v = Math.random();
			if(v>prob)
				grid[i][j] = 0;
			else
				grid[i][j] = 1;

			g = document.getElementById(i+"_"+j);
			if(grid[i][j]==1)
				g.style.backgroundColor="white";
			else
				g.style.backgroundColor="black";
		}
	}	
}

function refresh()
{
	let v;
	for(let i=0;i<maxCell;i++)
	{
		for(let j=0;j<maxCell;j++)
		{
			count(i,j);
		}
	}
	for(let i=0;i<maxCell;i++)
	{
		for(let j=0;j<maxCell;j++)
		{
			grid[i][j] = newGrid[i][j];
			v = document.getElementById(i+"_"+j);
			if(grid[i][j]==1)
				v.style.backgroundColor="white";
			else
				v.style.backgroundColor="black";
		}
	}	
}

function stepD()
{
	refresh();
}

function draw(i,j)
{
	let v = grid[i][j];
	if(v==1)
		grid[i][j] = 0;
	else
		grid[i][j] = 1;

	let g = document.getElementById(i+"_"+j);
	if(grid[i][j]==1)
		g.style.backgroundColor="white";
	else
		g.style.backgroundColor="black";
}

function count(x,y)
{
	let v = 0;

	for(let i=x-1;i<=x+1;i++)
	{
		for(let j=y+-1;j<=y+1;j++)
		{
			if(x!=i||y!=j)
			{
				if(i>=0&&i<maxCell&&j>=0&&j<maxCell)
				{
					v=v+grid[i][j];
				}
			}
		}
	}

	let hp = grid[x][y];

	if(hp==0)
	{
		if(v==3)
			newGrid[x][y]=1;
		else
			newGrid[x][y] = 0;
		
	}
	else
	{
		if(v>3||v<2)
			newGrid[x][y]=0;
		else
			newGrid[x][y] = 1;
	}
}

var timeThread;

export default 
{
	name:"lifeGame",
	data:function()
	{
		return {
			title:"生命游戏",
			data:grid,
			startTxt:'开始',
			start:false,
		}
	},
	created:function()
	{

	},
	mounted:function()
	{
		ranD();
	},
	computed:
	{

	},
	created:function()
	{
		document.title = "生命游戏";
	},
	methods:
	{
		getColor:function(i,j)
		{
			if(grid[i][j]==0)
				return 'black';
			else
				return 'white';
		},
		begin:function()
		{
			window.clearInterval(timeThread); 
			if(!this.start)
			{
				this.start = true;
				timeThread=window.setInterval(refresh, 100);
				this.startTxt = "停止"
			}
			else
			{
				this.start = false;
				window.clearInterval(timeThread); 
				this.startTxt = "开始"
			}
		},
		reset:function()
		{
			this.start = false;
			window.clearInterval(timeThread); 
			this.startTxt = "开始"
			set();
		},
		onClick:function(i,j)
		{
			draw(i,j);
		},
		ran:function()
		{
			ranD();
		},
		step:function()
		{
			this.start = false;
			window.clearInterval(timeThread); 
			this.startTxt = "开始"
			stepD();
		}
	}
}


</script>

<style lang="scss" scoped>
	
	.bak{
		background: #f6f6f6;
		.d{
			font-size: 15px;
			color: #666;
		}
		.bd
		{
			position: absolute;
			top:6em;
			left:1em;
			width: 45em;
			height: 45em;
			background-color: black;
		}
		.cell
		{
			position: absolute;
			width: 4px;
			height: 4px;
		}
		.btns{
			position: absolute;
			top:52em;
			left:1em;
		}
		.btn{
			float: left;
			margin-right: 10px;
		}
	}

</style>