
const $ply = require('../../mlGame/core/role.js').default.role;
const $tileType = require('../../mlGame/data/area.js').default.tileType;
const $ti = require('../../mlGame/core/gTime.js').default.gtime;
const $condt = require('../../mlGame/data/construct.js').default.construct;
const $mtName = require('../../mlGame/data/construct.js').default.names;
const $cons = require('../../mlGame/core/consCtrl.js').default.conCtrl;

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
    	this.data.ownBy = 0;	//被谁占领
    	this.data.in = 0;		//在谁的据点范围内
    	this.data.idx = data.x*MAXCELL+data.y;
    	this.data.con = -1;		//土地上的建设
    	this.data.captureAt = -1;
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

    	if(s==this.data.ownBy)
    		return;

    	if(s!=this.data.in&&this.data.captureAt==-1)
    	{
    		this.data.captureAt = $ti.getTick();
    	}
    	this.data.ownBy = s;
    	mapCtrl.renderBorderPos(this.data.x,this.data.y);
    }

    inBySide(s)
    {
    	this.data.in = s;
    	if(s==this.data.ownBy&&this.data.captureAt!=-1)
    	{
    		this.data.captureAt = -1;
    	}
    }
}

class _mapCtrl 
{
	constructor()
	{
		this.cutPos = {'x':0,'y':0};
		this.cutSel = {'x':-1,'y':-1,'i':-1,'j':-1};
		this.lastSel = {'x':-1,'y':-1,'i':-1,'j':-1};
		this.showBorder = false;
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
		let v=0;
		let p = Math.random();
		v = p>0.15?0:2;
		var m = new map({'x':x,'y':y,'type':v});
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

	getBorderByPos(x,y)
	{
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let xi = x - xmin;	//绘图坐标
		let xj = y - ymin;	//绘图坐标
		var div = document.getElementById("border_"+xi+"_"+xj);
		return div;
	}

	renderBorderPos(x,y)
	{
		if(!this.inRange(x,y))
			return;

		let div = this.getBorderByPos(x,y);
		if(!div)
			return;

		if(this.showBorder==false)
		{
			div.style.visibility="hidden";
			return;
		}
		else
			div.style.visibility="visible";

		var m = this.getMapByPos(x, y);
		var s = m.data.in;

		div.style.backgroundColor="";
		if(m.data.ownBy==$ply.side())
		{
			div.style.backgroundColor="green";
		}
		
		//判断上边
		if(this.inRange(x,y+1))
		{
			var s1 = this.getMapByPos(x, y+1).data.in;
			if(s1==s)
			{
				div.style.borderTop = "";
				let d = this.getBorderByPos(x,y+1);
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
		
		if(this.inRange(x,y-1))
		{
			var s1 = this.getMapByPos(x, y-1).data.in;
			if(s1==s)
			{
				div.style.borderBottom = "";
				let d = this.getBorderByPos(x,y-1);
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
		if(this.inRange(x+1,y))
		{
			var s1 = this.getMapByPos(x+1, y).data.in;
			if(s1==s)
			{
				div.style.borderRight = "";
				let d = this.getBorderByPos(x+1,y);
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
		if(this.inRange(x-1,y))
		{
			var s1 = this.getMapByPos(x-1, y).data.in;
			if(s1==s)
			{
				div.style.borderLeft = "";
				let d = this.getBorderByPos(x-1,y);
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

	renderTile()
	{
		var img;
		var m;
		var startx = this.cutPos.x - centerx + 1;
		var starty = this.cutPos.y - centery + 1;
		var x,y;
		var t;

		for(var i=0;i<maxx;i++)
		{
			for(var j=0;j<maxy;j++)
			{
				x = startx+i;
				y = starty+j;
				m = this.getMapByPos(x, y);
				t = m.data.type;
				img = document.getElementById("tile_img_"+i+"_"+j);
				//pos = document.getElementById("tilePos_"+i+"_"+j);
				img.src = "/static/img/mlGame/tile_"+$tileType[t].img+".png"
				//pos.innerText = i + "," + j+"\n"+x + "," + y;
				//tile.innerText = x + "," + y;
				this.renderBuildPos(x,y);
				this.renderBorderPos(x,y);
			}
		}
	}

	renderBuildPos(x,y)
	{
		let m = this.getMapByPos(x, y);
		let idx = m.data.con;
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let i = x - xmin;	//绘图坐标
		let j = y - ymin;	//绘图坐标
		let conImg = document.getElementById("tile_build_"+i+"_"+j);
		if(idx==-1)
		{
			conImg.src = "";
			conImg.style.visibility = "hidden";
		}
		else
		{
			let cons = $cons.getConByIdx(idx);
			let id = cons.data.id;
			let imgSrc = $condt[id].img;
			conImg.src = "/static/img/mlGame/"+imgSrc+".png";
			conImg.style.visibility = "visible";
		}
	}

	inMap(px,py)
	{
		if(px<0||py<0||px>=MAXCELL||py>=MAXCELL)
			return false;
		return true;
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

	renderBorder()
	{
		let startx = this.cutPos.x - centerx + 1;
		let starty = this.cutPos.y - centery + 1;
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
	let cons = m.data.con;
	let con;
	let conId;

	let name;

	if(cons!=-1)
	{
		con = $cons.getConByIdx(m.data.con);
		conId = con.data.id;
		name = "【"+$condt[conId].name+"】";
	}
	else
	{
		name = $tileType[type].name;
	}

	if($tileType[type].showLv)
	{
		tip.innerText = lv+"级";
	}

	tip.innerText = name+"( "+x+","+y+" )";

	if(own==$ply.side())
	{
		if(cons!=-1)
		{
			if($condt[conId].type==2)
			{
				tip.innerText = tip.innerText + " , 劳工("+con.data.num1+"/"+$condt[conId].work.worker+") , "+$mtName[$condt[conId].work.type]+"+"+Math.ceil((con.data.num1/$condt[conId].work.worker)*$condt[conId].work.max)
			}
		}
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
	if(con==-1)
		s+="目前还没有被建设。"
	else
	{
		let cons = $cons.getConByIdx(con);
		let id = cons.data.id;
		s+="这里被建设为了【"+$condt[id].name+"】。"
	}
	if(own==$ply.side())
	{
		s += "这块领土属于您。";
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
	let own = m.data.ownBy;
	let border = m.data.in;
	let con = m.data.con;

	if(own==$ply.side()&&border==$ply.side())
	{
		if(con==-1)
		{
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
					sel.addEventListener("click", () => {
						onBuildRaw(i);
						closeBuild();
					})
				}
				rt.appendChild(sel);	
			}
		}
	}

	let btn = document.createElement("button");
	btn.classList.add("close");
	btn.innerText="关闭";
	btn.addEventListener("click", () => {
		closeBuild();
	})
	rt.appendChild(btn);
	rt.style.visibility = "visible";
}

function closeBuild()
{
	let rt = document.getElementById("construct");
	rt.innerHTML="";
	rt.style.visibility = "hidden";	
}

function onBuildRaw(id)
{
	let v = $condt[id];
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let m = mapCtrl.getMapByPos(x, y);
	let own = m.data.ownBy;

	if(own!=1)
		return;
	if(m.data.con!=-1)
		return;
	let type = m.data.type;
	if(type!=v.area||$ply.gold()<v.gold)
		return;
	$cons.BuildCon(x,y,id,$ply.side());
	if(mapCtrl.inRange(x,y))
		mapCtrl.renderBuildPos(x,y);
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

	let startx = mapCtrl.cutPos.x - centerx + 1;
	let starty = mapCtrl.cutPos.y - centery + 1;
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

	let xmin = mapCtrl.cutPos.x - centerx + 1;
	let ymin = mapCtrl.cutPos.y - centery + 1;
	let toI = x - xmin;	//绘图坐标
	let toJ = y - ymin;	//绘图坐标

	//const maxx=9;
	//const maxy=7;
	$ply.moveTo(x,y);

	if(toI==0&&x>=0)
	{
		mapCtrl.cutPos.x--;
		mapCtrl.render();
	}
	else if(toI==(maxx-1)&&x<MAXCELL)
	{
		mapCtrl.cutPos.x++;
		mapCtrl.render();
	}
	else if(toJ==0&&y>=0)
	{
		mapCtrl.cutPos.y--;
		mapCtrl.render();
	}
	else if(toJ==(maxy-1)&&y<MAXCELL)
	{
		mapCtrl.cutPos.y++;
		mapCtrl.render();
	}
	else
	{
		mapCtrl.reanderPly();
	}
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
	let px = $ply.pos().x;
	let py = $ply.pos().y;
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
	if((x==px&&y==py)||(x==px&&py==y)||(Math.abs(x-px)<=1&&Math.abs(y-py)<=1))
	{

		let m = mapCtrl.getMapByPos(x, y);
		if(m.data.ownBy!=1)
			mapCtrl.capturePosByUnit(x,y,$ply);
		refreshAcB()
		renderSel();
	}
}

function refreshAcB()
{
	let x = mapCtrl.cutSel.x;
	let y = mapCtrl.cutSel.y;
	let px = $ply.pos().x;
	let py = $ply.pos().y;
	let m1 = mapCtrl.getMapByPos(x, y);
	let own1 = m1.data.ownBy;
	let border = m1.data.in;

	document.getElementById("buy").disabled=(own1!=$ply.side()&&((x==px&&py==y)||(Math.abs(x-px)<=1&&Math.abs(y-py)<=1)))?false:true;
	document.getElementById("build").disabled=false;
	document.getElementById("conquer").disabled=(own1!=$ply.side()&&((x==px&&py==y)||(Math.abs(x-px)<=1&&Math.abs(y-py)<=1)))?false:true;
}

function renderSel()
{
	let px = mapCtrl.cutSel.x;
	let py = mapCtrl.cutSel.y;

	if(!mapCtrl.inRange(px,py))
		return;

	let xmin = mapCtrl.cutPos.x - centerx + 1;
	let ymin = mapCtrl.cutPos.y - centery + 1;
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

function initMapActBtn()
{
	let rt = document.getElementById("mapAct");
	adMpAcBtn("显示边界","explore",onClickExplore,false);
	adMpAcBtn("攻占","conquer",conquer,true);
	adMpAcBtn("买地","buy",onClickBuy,true);
	adMpAcBtn("查看/建设","build",onClickBuild,true);
	adMpAcBtn("前往","move",onClickMove,true);
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