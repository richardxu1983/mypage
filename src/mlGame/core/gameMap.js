
const $ply = require('../../mlGame/core/role.js').default.role;
const $tileType = require('../../mlGame/data/area.js').default.tileType;
const $ti = require('../../mlGame/core/gTime.js').default.gtime;
const $condt = require('../../mlGame/data/construct.js').default.construct;

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
    	this.data.con = -1;		//土地上的建设
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
		initMapActBtn();
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
			el.style[b]="2px solid #3CB371";
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
		document.getElementById("move").disabled=(Math.abs(x-px)+Math.abs(y-py)==1)?false:true;
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
	tip.innerText = "( "+x+","+y+" ) ，";
	if($tileType[type].showLv)
	{
		tip.innerText = lv+"级";
	}

	tip.innerText = tip.innerText + name;

	if(own==1)
	{
		tip.innerText = tip.innerText + "，领土属于您";
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

function genMapDesc()
{
	let s="";
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let m = mapCtrl.getMapByPos(x, y);
	let con = m.data.con;
	let type = m.data.type;
	let own = m.data.ownBy;

	s = $tileType[type].desc;
	if(con=-1)
		s+="目前还没有被建设。"
	if(own==1)
	{
		s += "您已经占领这块领土。";
	}
	else if(own==0)
	{
		s += "这里没有被占领，这里住着一些山野之人和强盗土匪。";
	}
	else
	{
		s += "已被占领。";
	}
	return s;
}

function onClickBuild()
{
	let rt = document.getElementById("construct");
	let desc = document.createElement("div");
	desc.classList.add("desc");
	desc.innerText = genMapDesc();
	rt.appendChild(desc);

	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let m = mapCtrl.getMapByPos(x, y);
	let type = m.data.type;
	let len = $condt.length;
	let v;
	for(let i=0;i<len;i++)
	{
		v = $condt[i];
		let sel = document.createElement("div");
		sel.innerText = "-> 建设 【"+v.name+"】（"+v.need+"，建设资金："+v.gold+"） \n （"+v.desc+"）";
		sel.style.top = (7+i*3.5)+"em";

		if(type!=v.area||$ply.gold()<v.gold)
		{
			sel.classList.add("selno");
			sel.style.color = "gray";
		}
		else
		{
			sel.classList.add("sel");
			sel.style.color = "black";
		}

		rt.appendChild(sel);
	}

	rt.style.visibility = "visible";
	let btn = document.createElement("button");
	btn.classList.add("close");
	btn.innerText="关闭";
	btn.addEventListener("click", () => {
		let rt = document.getElementById("construct");
		rt.innerHTML="";
		rt.style.visibility = "hidden";
	})
	rt.appendChild(btn);
}

function onClickExplore()
{

}

function onClickBuy()
{

}

function TryMoveTo(x,y,v)
{
	if(!$ti.act(v))
		return;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	if(x<0||y<0||x>=MAXCELL||y>=MAXCELL)
		return;
	if((Math.abs(x-px)+Math.abs(y-py)!=1))
		return;
	$ply.moveTo(x,y);
	mapCtrl.reanderPly();
	document.getElementById("move").disabled=true;
	refreshAcB()
	renderSel();
}

function onClickMove()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	TryMoveTo(x,y,1);
}

function onHitMove(x,y)
{
	let tox = x+px;
	let toy = y+py;
	TryMoveTo(tox,toy,1);
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
		if(!canHave(x,y))
			return;
		let m = mapCtrl.getMapByPos(x, y);
		if(m.data.ownBy!=1)
			mapCtrl.capturePosByUnit(x,y,$ply);
		refreshAcB()
		renderSel();
	}
}

function canHave(x,y)
{
	let own = false;
	for(let i=x-1;i<=x+1;i++)
	{
		for(let j=y-1;j<=y+1;j++)
		{
			if(i>=0&&i<=MAXCELL&&j>=0&&j<=MAXCELL&&(i!=x||j!=y))
			{
				let tm = mapCtrl.getMapByPos(i,j).data.ownBy;
				//console.log("x="+x+",y="+y+",i="+i+",j="+j+",tm="+tm);
				if(tm==1)
				{
					own = true;
					break;
				}
			}
		}
	}
	return own;
}

function refreshAcB()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	let m1 = mapCtrl.getMapByPos(x, y);
	let own1 = m1.data.ownBy;
	let have = canHave(x,y);
	document.getElementById("buy").disabled=(have&&own1!=1&&((x==px&&py==y)||(Math.abs(x-px)<=1&&Math.abs(y-py)<=1)))?false:true;
	document.getElementById("build").disabled=(own1==1)?false:true;
	document.getElementById("conquer").disabled=(have&&own1!=1&&((x==px&&py==y)||(Math.abs(x-px)<=1&&Math.abs(y-py)<=1)))?false:true;
}

function renderSel()
{
	mapCtrl.renderBorderPos(mapCtrl.lastSel.x,mapCtrl.lastSel.y);
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let div = mapCtrl.getTileByPos(x,y);
	div.style.border = "2px solid #EEE685";
	showMapTip();
}

function initMapActBtn()
{
	let rt = document.getElementById("mapAct");
	adMpAcBtn("攻占","conquer",conquer);
	adMpAcBtn("买地","buy",onClickBuy);
	adMpAcBtn("探索","explore",onClickExplore);
	adMpAcBtn("查看/建设","build",onClickBuild);
	adMpAcBtn("前往","move",onClickMove);
}

function adMpAcBtn(name,id,fun)
{
	let rt = document.getElementById("mapAct");
	let btn = document.createElement("button");
	btn.classList.add("mapActBtn");
	btn.innerText = name;
	btn.id=id;
	btn.disabled=true;
	btn.addEventListener("click", () => {fun()})
	rt.appendChild(btn);	
}

document.onkeyup=function(e)
{  

	e=e||window.event;  
	e.preventDefault(); 
	switch(e.keyCode)
	{
		case 37:
			onHitMove(-1,0);
			break;
		case 38: 
			onHitMove(0,1);
			break;
		case 39:
			onHitMove(1,0);
			break;
		case 40:
			onHitMove(0,-1);
			break;
	}
}

document.ondblclick = function()
{
	onClickMove();
}

var mapCtrl = new _mapCtrl();

export default { mapCtrl,mapUI,maps };