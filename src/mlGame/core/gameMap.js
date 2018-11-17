
const $ply = require('../../mlGame/core/role.js').default.role;

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
}

function initMaps()
{
	for(var i=0;i<MAXCELL;i++)
	{
		for(var j=0;j<MAXCELL;j++)
		{
			var m = new map({'x':i,'y':j,'type':0});
			maps[m.idx] = m;
		}
	}
}
initMaps();

class _mapCtrl 
{
	constructor()
	{
		this.cutPos = {'x':0,'y':0};
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
		maps[map.idx] = map;
	}

	genMapAtPos(x,y,type)
	{
		var m = new map({'x':x,'y':y,'type':type});
		this.insertMap(m);
	}

	addUnitToPos(x,y,u)
	{
		var m = this.getMapByPos(x, y);
		if(m==undefined)
			return -1;
		return m.addUnitToPos(u.idx());
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

	createEl()
	{
		createTiles();
		this.render();
	}

	render()
	{
		this.renderTile();
		this.reanderPly();
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
			}
		}
	}

	reanderPly()
	{
		let px = $ply.pos().x;
		let py = $ply.pos().x;
		let xmin = this.cutPos.x - centerx + 1;
		let ymin = this.cutPos.y - centery + 1;
		let xmax = xmin + (maxx-1);
		let ymax = ymin + (maxy-1);
		if(px>=xmin&&px<=xmax&&py>=ymin&&py<=ymax)
		{
			console.log(px+","+py+","+ymin);
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

	onLeftClickTile(i,j)
	{
		var startx = this.cutPos.x - centerx + 1;
		var starty = this.cutPos.y - centery + 1;
		var x = startx + i;
		var y = starty + j;
		console.log(x+","+y);
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

var mapCtrl = new _mapCtrl();

export default { mapCtrl };