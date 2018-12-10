
const $dft = require('../../mlGame/data/gData.js').default.dft;
const $cons = require('../../mlGame/core/consCtrl.js').default.conSide;
const $condt = require('../../mlGame/data/construct.js').default.construct;

var propList= [];

class prop
{
	constructor()
	{
		this.data = 
		{
			name:"",
			gold:0,
			wood:0,
			food:0,
			iron:0,
			center:0,	//中心据点数量
			centerMax:3	//初始最大中心据点数量
		};
		this.add = 
		{
			wood:0,
			food:0,
			iron:0,
		};
	}

	gold(v)
	{
		if(v!=undefined)
            this.data.gold = v;
        else
            return this.data.gold;
	}

	iron(v)
	{
		if(v!=undefined)
            this.data.iron = v;
        else
            return this.data.iron;
	}

	food(v)
	{
		if(v!=undefined)
            this.data.food = v;
        else
            return this.data.food;
	}

	wood(v)
	{
		if(v!=undefined)
            this.data.wood = v;
        else
            return this.data.wood;
	}

	ad(k,v)
	{
		let n = this.data[k];
		n+=v;
		this.data[k] = n;
	}

	month()
	{
		this.data.wood += this.add.wood;
		this.data.food += this.add.food;
		this.data.iron += this.add.iron;
	}

	recal(s)
	{
		let con = $cons[s];
		if(con==undefined)
			return;

		this.add.wood = 0;
		this.add.food = 0;
		this.add.iron = 0;

		let len = c.length;
		let c;
		let id;
		let work;
		let dt;
		let t;
		let n;
		for(let i=0;i<len;i++)
		{
			c = con[i];
			id = c.data.id;
			if(c.data.ownBy == s)
			{
				dt = $condt[id];
				if(dt.type == 2)		//需要工人的类型
				{
					work = c.data.num1;
					t = dt.work.type;
					n = Math.ceil((work/dt.work.worker)*dt.work.max);
					this.add[t]+=n;
				}
			}
		}
	}
}

class _propCtrl
{
	constructor()
	{

	}

	create(side)
	{
		if(propList[side]==undefined)
		{
			let p = new prop();
			propList[side] = p;
		}
	}

	month()
	{
		let len = propList.length;
		for(let i=0;i<len;i++)
		{
			if(propList[i]!=undefined)
				propList[i].month();
		}
	}

	get(side)
	{
		return propList[side];
	}
}

var propCtrl = new _propCtrl();



function init()
{
	let plySide = $dft.plySide;
	propCtrl.create(plySide);
	let p = propCtrl.get(plySide);
	p.gold(50);
}
init();

export default {propCtrl,propList};