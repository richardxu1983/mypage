const $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;
const $block = require('../../mlGame/data/area.js').default.block;
const $areaType = require('../../mlGame/data/area.js').default.typeName;

//世界地图
var maps = [];
const MAXCELL = 50;

//世界地图展开后的每个地块，用于建设建筑物
class cell
{
	constructor(data)
	{
		this.data = {};
		this.data.x = data.x;
		this.data.y = data.y;
		this.data.idx = data.x*data.width+data.y;
		this.data.id = data.id;
		this.data.build = -1;
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
    	this.data.ownBy = 0;							//被谁占领
    	this.data.cells = -1;					
    	this.data.idx = data.x*MAXCELL+data.y;			//世界地图数组中的位置
    	this.data.width = $block[this.data.id].width;	//宽度
    	this.data.type = $block[data.id].type;
    	this.data.pop = 0;
        this.data.hasCell = $block[this.data.id].cell;
        this.data.worker = 0;
        this.data.product = 0;
    }

    captureByUnit(u)
    {
    	let s = u.side();
    	this.captureBySide(s);
    }

    calProd()
    {
        let worker = this.data.worker;
        let type = this.data.type;
        let add = $areaType[type].workerAdd;
        let pd;
        pd = worker*add;
        return pd;
    }

    addWorker(v)
    {
        let max = $areaType[this.data.type].maxWorker;
        this.data.worker+=v;
        this.data.worker = this.data.worker<0?0:this.data.worker;
        this.data.worker = this.data.worker>max?max:this.data.worker;
    }

    captureBySide(s)
    {
    	if(s==this.data.ownBy)
    		return;

    	if($prop.getV(s,'block')>=$prop.getV(s,'maxBlock'))
    		return;

    	let oldSide = this.data.ownBy;
    	if(oldSide!=0)
    	{
    		let oldProp = $prop.get(oldSide);
    		oldProp.delBlock(this.data.idx);
    	}
    	
    	let newProp = $prop.get(s)
    	newProp.addBlock(this.data.idx);
    	this.data.ownBy = s;
    }

    build(i,j,id)
    {

    	if(this.data.cells==-1)
			this.createCell();

    	let $conCtrl = require('../../mlGame/core/consCtrl.js').default.conCtrl;

    	let c = this.data.cells[i*this.data.width+j];
    	if(c.data.build!=-1)
    		return;

    	$conCtrl.Build(this.data.idx,i,j,this.data.ownBy,id);
    }

    createCell()
    {
    	if(this.data.cells!=-1)
    		return;

        if(!this.data.hasCell)
            return;

    	this.data.cells = [];

    	let w = this.data.width;
    	let id;

    	for(let i=0;i<w;i++)
    	{
    		for(let j=0;j<w;j++)
    		{
    			this.data.cells[i*w+j] = new cell({x:i,y:j,'id':0,width:w});
    		}
    	}
    }
}

class _mapCtrl 
{
    constructor()
    {

    }

    getBlockByPos(x,y)
    {
        return maps[x*MAXCELL+y];
    }

    setBlockType(x,y,t)
    {
        let m = this.getBlockByPos(x,y)
        if(m.data.type ==0)
            m.data.type = t;
    }

    getCellByPos(b,i,j)
    {
        let w = b.data.width;
        let idx = i*w+j;
        if(b.data.cells==-1)
            return -1;
        return b.data.cells[idx];
    }

    getBlockByIdx(idx)
    {
        return maps[idx];
    }

    build(x,y,i,j,id)
    {
        let m = this.getBlockByPos(x,y);
        m.build(i,j,id);
    }

    buildByBlock(m,i,j,id)
    {
        m.build(i,j,id);
    }

    genMapAtPos(x,y,type)
    {
        let v=0;
        let p = Math.random()*100;
        if(p>80)
        {
            v = 2;
        }
        else if(p>35&&p<=80)
        {
            v = 1;
        }
        else if(p>9&&p<=35)
        {
            v = 0;
        }
        else if(p>2&&p<=9)
        {
            v = 4;
        }
        else if(p<=2&&p>=0)
        {
            v = 6;
        }
        else
        {
        }
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
}

var mapCtrl = new _mapCtrl();

export default { mapCtrl };