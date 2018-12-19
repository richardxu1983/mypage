
const $ply = require('../../mlGame/core/role.js').default.role;
const $block = require('../../mlGame/data/area.js').default.block;
const $cellTile = require('../../mlGame/data/area.js').default.cell;

//世界地图
var maps = [];
var mapUI = 
{
	guihua:false,
};

const MAXCELL = 50;
const maxx=9;
const maxy=7;
const centerx = (maxx+1)/2;
const centery = (maxy+1)/2;
const topGap=55;
const leftGap=175;
const width = 60;

//世界地图展开后的每个地块，用于建设建筑物
class cell
{
	constructor(data)
	{
		this.data = {};
		this.data.x = data.x;
		this.data.y = data.y;
		this.data.idx = data.x*data.width+data.y;
		this.data.type = data.type;
		this.data.build = -1;
		this.data.build_lv = 0;
		this.data.status = -1;
	}
}

//世界地图上的每个地块
class block
{ 
    constructor(data)
    { 
    	this.select = {x:-1,y:-1};
    	this.data = {};
    	this.data.x = data.x;
    	this.data.y = data.y;
    	this.data.id = data.id;
    	this.data.ownBy = 0;					//被谁占领
    	this.data.cells = -1;
    	this.data.idx = data.x*MAXCELL+data.y;	//世界地图数组中的位置
    }

    captureByUnit(u)
    {
    	let s = u.side();

    	if(s==this.data.ownBy)
    		return;

    	this.data.ownBy = s;
    }

    captureBySide(s)
    {
    	if(s==this.data.ownBy)
    		return;

    	this.data.ownBy = s;
    }

    buildOnCell(x,y,id)
    {
    	let c = this.data.cells[x][y];
    	if(c.data.build!=-1)
    		return;
    }

    createCell()
    {
    	if(this.data.cells!=-1)
    		return;

    	this.data.cells = [];

    	let w = $block[this.data.id].width;
    	let t;

    	for(let i=0;i<w;i++)
    	{
    		for(let j=0;j<w;j++)
    		{
    			t = $block[this.data.id].cell[i][j];
    			this.data.cells[i][j] = cell({x:i,y:j,type:t});
    		}
    	}
    }
}

class _mapCtrl 
{
	constructor()
	{
		this.viewMode = 0;	//0:world,1:block
		this.WorldViewCenter = {'x':0,'y':0};
		this.curBlock = {'x':0,'y':0};
		this.worldSelect = {'x':-1,'y':-1,'i':-1,'j':-1};
		this.lastWorldSel = {'x':-1,'y':-1,'i':-1,'j':-1};
		this.showBorder = false;
	}

	getWorldViewCenter()
	{
		return this.WorldViewCenter;
	}

	setWorldViewCenter(x,y)
	{
		this.WorldViewCenter.x = x;
		this.WorldViewCenter.y = y;
	}

	getBlockByPos(x,y)
	{
		return maps[x*MAXCELL+y];
	}

	genMapAtPos(x,y,type)
	{
		let v=0;
		let p = Math.random();
		v = p>0.15?0:4;
		var m = new block({'x':x,'y':y,'id':v});
		maps[m.data.idx] = m;
	}

	genMapArea(x,y,r)
	{
		for(var i=x-r;i<=x+r;i++)
		{
			for(var j=y-r;j<=y+r;j++)
			{
				this.genMapAtPos(i, j, 0);
			}
		}
	}

	capturePosByUnit(x,y,u)
	{
		var m = this.getBlockByPos(x, y);
		m.captureByUnit(u);
	}

	capturePosBySide(x,y,s)
	{
		var m = this.getBlockByPos(x, y);
		m.captureBySide(s);
	}

	createEl()
	{
		createWorldTiles();
	}

	render()
	{
		if(this.viewMode==0)
		{
			this.renderWorld();
		}
		else
		{
			this.renderBlock();
		}
		initMapActBtn();
	}

	switchView(mode)
	{
		this.viewMode = mode;
		if(mode==0)
		{
			showWorldTiles();
			this.renderWorld();
		}
		else
		{
			hideWorldTiles();
		}
		hideSel();
		hideMapTip();
		refreshBtn();
	}

	getBlockTile(x,y)
	{
		let xmin = this.WorldViewCenter.x - centerx + 1;
		let ymin = this.WorldViewCenter.y - centery + 1;
		let xi = x - xmin;	//绘图坐标
		let xj = y - ymin;	//绘图坐标
		var div = document.getElementById("tile_"+xi+"_"+xj);
		return div;
	}

	getBorder(x,y)
	{
		let xmin = this.WorldViewCenter.x - centerx + 1;
		let ymin = this.WorldViewCenter.y - centery + 1;
		let xi = x - xmin;	//绘图坐标
		let xj = y - ymin;	//绘图坐标
		var div = document.getElementById("border_"+xi+"_"+xj);
		return div;
	}

	renderBorderPos(x,y)
	{
		if(!this.inWorldView(x,y))
			return;

		let div = this.getBorder(x,y);
		if(!div)
			return;

		if(this.showBorder==false)
		{
			div.style.visibility="hidden";
			return;
		}
		else
			div.style.visibility="visible";

		var m = this.getBlockByPos(x, y);
		var s = m.data.ownBy;

		//判断上边
		if(this.inWorldView(x,y+1))
		{
			var s1 = this.getBlockByPos(x, y+1).data.ownBy;
			if(s1==s)
			{
				div.style.borderTop = "";
				let d = this.getBorder(x,y+1);
				d.style.borderBottom = "";
			}
			else
			{
				this.renderSgB("borderTop",s,div);
			}
		}
		else
		{
			//不在范围
			this.renderSgB("borderTop",s,div);
		}
		
		if(this.inWorldView(x,y-1))
		{
			var s1 = this.getBlockByPos(x, y-1).data.ownBy;
			if(s1==s)
			{
				div.style.borderBottom = "";
				let d = this.getBorder(x,y-1);
				d.style.borderTop = "";
			}
			else
			{
				this.renderSgB("borderBottom",s,div);
			}
		}
		else
		{
			//不在范围
			this.renderSgB("borderBottom",s,div);
		}
		if(this.inWorldView(x+1,y))
		{
			var s1 = this.getBlockByPos(x+1, y).data.ownBy;
			if(s1==s)
			{
				div.style.borderRight = "";
				let d = this.getBorder(x+1,y);
				d.style.borderLeft = "";
			}
			else
			{
				this.renderSgB("borderRight",s,div);
			}
		}
		else
		{
			//不在范围
			this.renderSgB("borderRight",s,div);
		}
		if(this.inWorldView(x-1,y))
		{
			var s1 = this.getBlockByPos(x-1, y).data.ownBy;
			if(s1==s)
			{
				div.style.borderLeft = "";
				let d = this.getBorder(x-1,y);
				d.style.borderRight = "";
			}
			else
			{
				this.renderSgB("borderLeft",s,div);
			}
		}
		else
		{
			//不在范围
			this.renderSgB("borderLeft",s,div);
		}
	}

	renderSgB(b,s,el)
	{
		if(s==$ply.side())
		{
			el.style[b]="1px solid green";
		}
		else if(s==0)
		{
			el.style[b]="";
		}
		else
		{
			el.style[b]="1px solid red";
		}
	}

	renderWorld()
	{
		var img;
		var m;
		var startx = this.WorldViewCenter.x - centerx + 1;
		var starty = this.WorldViewCenter.y - centery + 1;
		var x,y;
		var id;

		for(var i=0;i<maxx;i++)
		{
			for(var j=0;j<maxy;j++)
			{
				x = startx+i;
				y = starty+j;
				m = this.getBlockByPos(x, y);
				id = m.data.id;
				img = document.getElementById("tile_img_"+i+"_"+j);
				img.src = "/static/img/mlGame/tile_"+$block[id].img+".png"
				this.renderBuildPos(x,y);
				this.renderBorderPos(x,y);
			}
		}
	}

	renderBuildPos(x,y)
	{

	}

	posInWorld(px,py)
	{
		if(px<0||py<0||px>=MAXCELL||py>=MAXCELL)
			return false;
		return true;
	}

	//传入坐标是否在当前世界视图
	inWorldView(px,py)
	{
		if(px<0||py<0||px>=MAXCELL||py>=MAXCELL)
			return false;
		let xmin = this.WorldViewCenter.x - centerx + 1;
		let ymin = this.WorldViewCenter.y - centery + 1;
		let xmax = xmin + (maxx-1);
		let ymax = ymin + (maxy-1);
		if(px>=xmin&&px<=xmax&&py>=ymin&&py<=ymax)
			return true;
		return false;
	}

	renderBorder()
	{
		let startx = this.WorldViewCenter.x - centerx + 1;
		let starty = this.WorldViewCenter.y - centery + 1;
		let x,y;
		for(var i=0;i<maxx;i++)
		{
			for(var j=0;j<maxy;j++)
			{
				x = startx+i;
				y = starty+j;
				this.renderBorderPos(x,y);
			}
		}
	}

	setworldSelect(x,y,pi,pj)
	{
		let i=pi||(x-(this.WorldViewCenter.x - centerx + 1));
		let j=pj||(y-(this.WorldViewCenter.y - centery + 1));
		this.lastWorldSel.x = this.worldSelect.x;
		this.lastWorldSel.y = this.worldSelect.y;
		this.lastWorldSel.i = this.worldSelect.i;
		this.lastWorldSel.j = this.worldSelect.j;
		this.worldSelect.x = x;
		this.worldSelect.y = y;
		this.worldSelect.i = i;
		this.worldSelect.j = j;	
	}

	setCurBlock(x,y)
	{
		this.curBlock.x = this.worldSelect.x;
		this.curBlock.y = this.worldSelect.y;
	}

	onLeftClickTile(i,j)
	{
		let startx = this.WorldViewCenter.x - centerx + 1;
		let starty = this.WorldViewCenter.y - centery + 1;
		let x = startx + i;
		let y = starty + j;
		this.setworldSelect(x,y,i,j)
		refreshAcB()
		renderSel();
	}
}

function showMapTip()
{
	let tip = document.getElementById("mapInfo");
	tip.style.visibility = "visible";
	if(mapCtrl.viewMode==0)
	{
		let x = mapCtrl.worldSelect.x;
		let y = mapCtrl.worldSelect.y;
		let m = mapCtrl.getBlockByPos(x, y);
		let id = m.data.id;
		let own = m.data.ownBy;
		let name= $block[id].name;

		tip.innerText = name+"( "+x+","+y+" )";

		if(own==$ply.side())
		{
			tip.innerText = tip.innerText + "，领土属于您";
		}
		else if(own==0)
		{
			//tip.innerText = tip.innerText + "，无主";
		}
		else
		{
			tip.innerText = tip.innerText + "，被占";
		}
	}
	else
	{

	}
}

function hideMapTip()
{
	let tip = document.getElementById("mapInfo");
	tip.style.visibility = "hidden";	
}

function hideWorldTiles()
{
	let mapRoot = document.getElementById("world");
	mapRoot.style.visibility = "hidden";
}

function showWorldTiles()
{
	let mapRoot = document.getElementById("world");
	mapRoot.style.visibility = "visible";
}

function createWorldTiles()
{
	let mapRoot = document.getElementById("world");
	for(let i=0;i<maxx;i++)
	{
		for(let j=0;j<maxy;j++)
		{
			let left = i*width+leftGap;
			let top = (maxy-j-1)*width+topGap;
			let div = document.createElement("div");
			let bk = document.createElement("img");
			//let pos = document.createElement("div");
			let bd = document.createElement("img");
			let border = document.createElement("div");
			bk.id = "tile_img_"+i+"_"+j;
			bk.src="";
			bk.classList.add("mapTile");
			bd.id = "tile_build_"+i+"_"+j;
			bd.src="";
			bd.classList.add("mapTileNo");
			border.id = "border_"+i+"_"+j;
			border.classList.add("border");
			border.style.opacity = "0.5";
			div.appendChild(bk);
			div.appendChild(border);
			div.appendChild(bd);
			//div.appendChild(pos);
			//pos.id = "tilePos_"+i+"_"+j;
			//pos.classList.add("tilePos");
			//div.innerHTML="<img class=\"mapTile\" id=\""+"tile_img_"+i+"_"+j+"\" src=\"\">"
			//div.innerText=i+","+j;
			div.classList.add("map");
			div.id = "tile_"+i+"_"+j;
			div.style.top = top+"px";
			div.style.left = left+"px";

			//禁用chrome的拖拽图片
			div.onmousedown = (e)=>{
			    e.preventDefault()
			}
			//响应左键事件
			div.onmouseup = (e)=>{
			    mapCtrl.onLeftClickTile(i,j);
			}
			/*
			div.addEventListener("mouseup", (e) => {
				mapCtrl.onLeftClickTile(i,j);
			})
			*/
			mapRoot.appendChild(div);
		}
	}	
}

function onBlockView()
{
	mapCtrl.switchView(1);
}

function onWorldView()
{
	mapCtrl.switchView(0);
}

function onClickExplore()
{
	if(mapCtrl.showBorder)
	{
		mapCtrl.showBorder = false;
		document.getElementById("explore").innerText="显示边界";
	}
	else
	{
		mapCtrl.showBorder = true;
		document.getElementById("explore").innerText="隐藏边界";
	}

	let startx = mapCtrl.WorldViewCenter.x - centerx + 1;
	let starty = mapCtrl.WorldViewCenter.y - centery + 1;
	let x,y;
	for(var i=0;i<maxx;i++)
	{
		for(var j=0;j<maxy;j++)
		{
			x = startx+i;
			y = starty+j;
			mapCtrl.renderBorderPos(x,y);
		}
	}
}

function onClickBuy()
{

}

function conquer()
{
	let x = mapCtrl.worldSelect.x;
	let y = mapCtrl.worldSelect.y;
	mapCtrl.capturePosByUnit(x,y,$ply);
}

function refreshAcB()
{

}

function renderSel()
{
	if(mapCtrl.viewMode==0)
	{
		let px = mapCtrl.worldSelect.x;
		let py = mapCtrl.worldSelect.y;

		if(!mapCtrl.inWorldView(px,py))
			return;

		let xmin = mapCtrl.WorldViewCenter.x - centerx + 1;
		let ymin = mapCtrl.WorldViewCenter.y - centery + 1;
		let xmax = xmin + (maxx-1);
		let ymax = ymin + (maxy-1);
		if(px>=xmin&&px<=xmax&&py>=ymin&&py<=ymax)
		{
			let i = px - xmin;
			let j = py - ymin;
			//console.log(i+","+j);
			let div = document.getElementById("tile_"+i+"_"+j);
			let left = div.offsetLeft;
			let top = div.offsetTop;
			let flag = document.getElementById("sel");
			flag.style.border = "solid 1px yellow";
			flag.style.visibility="visible";
			//console.log(top+","+left);
			flag.style.top = top+"px";
			flag.style.left = left+"px";
		}
		showMapTip();
	}
	else
	{

	}
}

function hideSel()
{
	let flag = document.getElementById("sel");
	flag.style.visibility="hidden";
}

function initMapActBtn()
{
	let rt = document.getElementById("mapAct");
	if(mapCtrl.viewMode==0)
	{
		adMpAcBtn("建设地块","build",onBlockView,false);
		adMpAcBtn("显示边界","explore",onClickExplore,false);
	}
	else
	{
		adMpAcBtn("回到世界","build",onWorldView,false);
	}
}

function refreshBtn()
{
	let rt = document.getElementById("mapAct");
	while (rt.firstChild) {
    	rt.removeChild(rt.firstChild);
	}
	initMapActBtn();
}

function adMpAcBtn(name,id,fun,f)
{
	let rt = document.getElementById("mapAct");
	let btn = document.createElement("button");
	btn.classList.add("mapActBtn");
	btn.innerText = name;
	btn.id=id;
	btn.disabled=f;
	btn.addEventListener("click", () => {fun()})
	rt.appendChild(btn);
}


document.onkeydown = ()=>{
	var oEvent = window.event;
	if(oEvent.keyCode ==27) 
	{
		hideSel();
		hideMapTip();
	}
}


var mapCtrl = new _mapCtrl();

export default { mapCtrl,mapUI,maps };