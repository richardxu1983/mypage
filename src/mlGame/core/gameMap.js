
const $ply = require('../../mlGame/core/role.js').default.role;
const $tileType = require('../../mlGame/data/area.js').default.tileType;
const $mapTile = require('../../mlGame/data/area.js').default.mapTile;

var maps = [];
const MAXCELL = 50;
const maxx=9;
const maxy=7;
const centerx = (maxx+1)/2;
const centery = (maxy+1)/2;
const topGap=55;
const leftGap=175;
const width = 62;

class map
{ 
    constructor(data)
    { 
    	this.data = {};
    	this.data.x = data.x;
    	this.data.y = data.y;
    	this.data.type = data.type;
    	this.data.units = [];
    	this.data.lv = 1;
    	this.data.ownBy = 0;	//1:玩家,0：无主
    	this.data.idx = data.x*MAXCELL+data.y;
    }

    addUnit(v)
    {
    	return (this.data.units.push(v)-1);
    }

    delUnitByIdx(idx)
    {
    	this.data.units.splice(idx,1);
    }

    captureByUnit(u)
    {
    	let s = u.side();
    	this.data.ownBy = s;
    	mapCtrl.renderBorderPos(this.data.x,this.data.y);
    }
}

class _mapCtrl 
{
	constructor()
	{
		this.cutPos = {'x':0,'y':0};
		this.cutSel = {'x':-1,'y':-1,'i':-1,'j':-1};
		this.lastSel = {'x':-1,'y':-1,'i':-1,'j':-1};
	}

	getMax()
	{
		return MAXCELL;
	}

	new()
	{

	}

	load()
	{

	}

	getCutPos()
	{
		return this.cutPos;
	}

	setCutPos(x,y)
	{
		this.cutPos.x = x;
		this.cutPos.y = y;
	}

	getMapByPos(x,y)
	{
		return maps[x*MAXCELL+y];
	}

	insertMap(map)
	{
		maps[map.data.idx] = map;
	}

	genMapAtPos(x,y,type)
	{
		var m = new map({'x':x,'y':y,'type':type});
		maps[m.data.idx] = m;
	}

	addUnitToPos(x,y,u)
	{
		var m = this.getMapByPos(x, y);
		if(m==undefined)
			return -1;
		return m.addUnit(u.idx());
	}

	delUnitAtByIdx(x,y,idx)
	{
		var m = this.getMapByPos(x, y);
		m.delUnitByIdx(idx);
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
		var m = this.getMapByPos(x, y);
		m.captureByUnit(u);
	}

	createEl()
	{
		createTiles();
		createUI();
		this.render();
	}

	render()
	{
		this.renderTile();
		this.reanderPly();
	}

	getTileByPos(x,y)
	{
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let xi = x - xmin;	//绘图坐标
		let xj = y - ymin;	//绘图坐标
		var div = document.getElementById("tile_"+xi+"_"+xj);
		return div;
	}

	renderBorderPos(x,y)
	{
		if(!this.inRange(x,y))
			return;

		let div = this.getTileByPos(x,y);
		var m = this.getMapByPos(x, y);
		var s = m.data.ownBy;
		
		//判断上边
		if(this.inRange(x,y+1))
		{
			var s1 = this.getMapByPos(x, y+1).data.ownBy;
			if(s1==s)
			{
				div.style.borderTop = "2px solid #503810";
				let d = this.getTileByPos(x,y+1);
				d.style.borderBottom = "2px solid #503810";
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
		
		if(this.inRange(x,y-1))
		{
			var s1 = this.getMapByPos(x, y-1).data.ownBy;
			if(s1==s)
			{
				div.style.borderBottom = "2px solid #503810";
				let d = this.getTileByPos(x,y-1);
				d.style.borderTop = "2px solid #503810";
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
		if(this.inRange(x+1,y))
		{
			var s1 = this.getMapByPos(x+1, y).data.ownBy;
			if(s1==s)
			{
				div.style.borderRight = "2px solid #503810";
				let d = this.getTileByPos(x+1,y);
				d.style.borderLeft = "2px solid #503810";
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
		if(this.inRange(x-1,y))
		{
			var s1 = this.getMapByPos(x-1, y).data.ownBy;
			if(s1==s)
			{
				div.style.borderLeft = "2px solid #503810";
				let d = this.getTileByPos(x-1,y);
				d.style.borderRight = "2px solid #503810";
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
		if(s==1)
		{
			el.style[b]="2px solid green";
		}
		else if(s==0)
		{
			el.style[b]="2px solid #503810";
		}
		else
		{
			el.style[b]="2px solid red";
		}
	}

	renderTile()
	{
		var tile;
		var img;
		var m;
		var startx = this.cutPos.x - centerx + 1;
		var starty = this.cutPos.y - centery + 1;
		var x,y;
		var pos;

		for(var i=0;i<maxx;i++)
		{
			for(var j=0;j<maxy;j++)
			{
				x = startx+i;
				y = starty+j;
				m = this.getMapByPos(x, y);
				tile = document.getElementById("tile_"+i+"_"+j);
				img = document.getElementById("tile_img_"+i+"_"+j);
				pos = document.getElementById("tilePos_"+i+"_"+j);
				img.src = "/static/img/mlGame/tile_00.png"
				pos.innerText = i + "," + j+"\n"+x + "," + y;
				//tile.innerText = x + "," + y;
				this.renderBorderPos(x,y);
			}
		}
	}

	//传入实际坐标
	inRange(px,py)
	{
		if(px<0||py<0||px>=MAXCELL||py>=MAXCELL)
			return false;
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let xmax = xmin + (maxx-1);
		let ymax = ymin + (maxy-1);
		if(px>=xmin&&px<=xmax&&py>=ymin&&py<=ymax)
			return true;
		return false;
	}

	reanderPly()
	{
		let px = $ply.pos().x;
		let py = $ply.pos().y;
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let xmax = xmin + (maxx-1);
		let ymax = ymin + (maxy-1);
		if(px>=xmin&&px<=xmax&&py>=ymin&&py<=ymax)
		{
			let i = px - xmin;
			let j = py - ymin;
			let div = document.getElementById("tile_"+i+"_"+j);
			let left = div.offsetLeft+10;
			let top = div.offsetTop+10;
			let flag = document.getElementById("flag");
			flag.style.position = "absolute";
			flag.style.top = top+"px";
			flag.style.left = left+"px";
		}
	}

	setCutSel(x,y,pi,pj)
	{
		let i=pi||(x-(this.cutPos.x - centerx + 1));
		let j=pj||(y-(this.cutPos.y - centery + 1));
		this.lastSel.x = this.cutSel.x;
		this.lastSel.y = this.cutSel.y;
		this.lastSel.i = this.cutSel.i;
		this.lastSel.j = this.cutSel.j;
		this.cutSel.x = x;
		this.cutSel.y = y;
		this.cutSel.i = i;
		this.cutSel.j = j;		
	}

	onLeftClickTile(i,j)
	{
		let startx = this.cutPos.x - centerx + 1;
		let starty = this.cutPos.y - centery + 1;
		let x = startx + i;
		let y = starty + j;
		let px = $ply.pos().x;
		let py = $ply.pos().y;
		this.setCutSel(x,y,i,j)
		let div = this.getTileByPos(x,y);
		let m = this.getMapByPos(px, py);
		let own = m.data.ownBy;
		//document.getElementById("move").disabled=(Math.abs(x-px)+Math.abs(y-py)==1)?false:true;
		refreshAcB()
		renderSel();
		
	}
}

function showMapTip()
{
	let tip = document.getElementById("mapInfo");
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let m = mapCtrl.getMapByPos(x, y);
	let type = m.data.type;
	let own = m.data.ownBy;
	let lv = m.data.lv;

	let name = $tileType[type].name;
	tip.innerText = "";
	if($tileType[type].showLv)
	{
		tip.innerText = lv+"级";
	}

	tip.innerText = tip.innerText + name;

	if(own==1)
	{
		tip.innerText = tip.innerText + "，已占领";
	}
	else if(own==0)
	{
		tip.innerText = tip.innerText + "，无主";
	}
	else
	{
		tip.innerText = tip.innerText + "，被占";
	}
}

function createTiles()
{
	let mapRoot = document.getElementById("maps");
	for(let i=0;i<maxx;i++)
	{
		for(let j=0;j<maxy;j++)
		{
			let left = i*width+leftGap;
			let top = (maxy-j-1)*width+topGap;
			let div = document.createElement("div");
			let img = document.createElement("img");
			let pos = document.createElement("div");
			img.id = "tile_img_"+i+"_"+j;
			img.src="";
			img.classList.add("mapTile");
			div.appendChild(img);
			div.appendChild(pos);
			pos.id = "tilePos_"+i+"_"+j;
			pos.classList.add("tilePos");
			//div.innerHTML="<img class=\"mapTile\" id=\""+"tile_img_"+i+"_"+j+"\" src=\"\">"
			//div.innerText=i+","+j;
			div.classList.add("map");
			div.id = "tile_"+i+"_"+j;
			div.style.top = top+"px";
			div.style.left = left+"px";
			div.addEventListener("click", () => {mapCtrl.onLeftClickTile(i,j);})

			mapRoot.appendChild(div);
		}
	}	
}

function onClickMove()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	let m = mapCtrl.getMapByPos(x, y);
	let own = m.data.ownBy;
	if((Math.abs(x-px)+Math.abs(y-py)!=1))
		return;
	$ply.moveTo(x,y);
	mapCtrl.reanderPly();
	//document.getElementById("move").disabled=true;
	refreshAcB()
	renderSel();
}

function onMove(x,y)
{
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	console.log(x+","+y);
	console.log(px+","+py);
	let tox = x+px;
	let toy = y+py;
	console.log(tox+","+toy);
	if(tox<0||toy<0||tox>=MAXCELL||toy>=MAXCELL)
		return;
	$ply.moveTo(tox,toy);
	//mapCtrl.setCutSel(tox,toy);
	mapCtrl.reanderPly();
	refreshAcB()
	//renderSel();
}


function conquer()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	let m = mapCtrl.getMapByPos(x, y);
	if((x==px&&y==py)||(x==px&&py==y)||(Math.abs(x-px)+Math.abs(y-py)==1))
	{
		let m = mapCtrl.getMapByPos(x, y);
		if(m.data.ownBy!=1)
			mapCtrl.capturePosByUnit(x,y,$ply);
	}
	
	refreshAcB()
	renderSel();
}

function refreshAcB()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	let m1 = mapCtrl.getMapByPos(x, y);
	let own1 = m1.data.ownBy;
	document.getElementById("buy").disabled=(own1!=1&&((x==px&&py==y)||(Math.abs(x-px)+Math.abs(y-py)==1)))?false:true;
	document.getElementById("build").disabled=(own1==1&&(x==px&&py==y))?false:true;
	document.getElementById("conquer").disabled=(own1!=1&&((x==px&&py==y)||(Math.abs(x-px)+Math.abs(y-py)==1)))?false:true;
}

function renderSel()
{
	mapCtrl.renderBorderPos(mapCtrl.lastSel.x,mapCtrl.lastSel.y);
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let div = mapCtrl.getTileByPos(x,y);
	div.style.border = "2px solid #00CCFF";
	showMapTip();
}

function createUI()
{
	let rt = document.getElementById("mapAct");

	let btn4 = document.createElement("button");
	btn4.classList.add("mapActBtn");
	btn4.innerText = "攻占";
	btn4.id="conquer";
	btn4.disabled=true;
	btn4.addEventListener("click", () => {conquer();})
	rt.appendChild(btn4);

	let btn3 = document.createElement("button");
	btn3.classList.add("mapActBtn");
	btn3.innerText = "买地";
	btn3.id="buy";
	btn3.disabled=true;
	btn3.addEventListener("click", () => {})
	rt.appendChild(btn3);

	let btn2 = document.createElement("button");
	btn2.classList.add("mapActBtn");
	btn2.innerText = "探索";
	btn2.id="explore";
	btn2.disabled=true;
	btn2.addEventListener("click", () => {})
	rt.appendChild(btn2);

	let btn1 = document.createElement("button");
	btn1.classList.add("mapActBtn");
	btn1.innerText = "建设";
	btn1.id="build";
	btn1.disabled=true;
	btn1.addEventListener("click", () => {})
	rt.appendChild(btn1);

	/*
	let btn = document.createElement("button");
	btn.classList.add("mapActBtn");
	btn.innerText = "前往";
	btn.id="move";
	btn.disabled=true;
	btn.addEventListener("click", () => {onClickMove()})
	rt.appendChild(btn);
	*/
}


document.onkeyup=function(e){  
	e=e||window.event;  
	e.preventDefault(); 
	switch(e.keyCode){
		case 37:
			//左
			onMove(-1,0);
			break;
		case 38: 
			onMove(0,1);
			break;
		case 39:
			//右
			onMove(1,0);
			break;
		case 40:
			onMove(0,-1);
			break;
	}

}

var mapCtrl = new _mapCtrl();

export default { mapCtrl };