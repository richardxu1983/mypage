
const $dft = require('../../mlGame/data/gData.js').default.dft;
const $bdData = require('../../mlGame/data/construct.js').default.construct;
//const $map = require('../../mlGame/core/gameMap.js').default.mapCtrl;

var propList= [];

class prop
{
	constructor(v)
	{
		this.data = 
		{
			side:v.side,
			name:"",
			gold:v.gold,
			wood:v.wood,
			food:v.food,
			iron:v.iron,
			stone:v.stone,
			pop:0,
			maxBlock:5,
			block:0,
			blockList:[],
		};
	}

	addBlock(block_idx)
	{
		this.data.blockList.push(block_idx);
	}

	delBlock(block_idx)
	{
		var index = this.data.blockList.indexOf(block_idx);
		if (index > -1) {
		    this.data.blockList.splice(index, 1);
		}
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

	stone(v)
	{
		if(v!=undefined)
            this.data.stone = v;
        else
            return this.data.stone;		
	}

	ad(k,v)
	{
		let n = this.data[k];
		n+=v;
		this.data[k] = n;
	}

	onMonth()
	{

		let block_num = this.data.blockList.length;
		if(block_num<=0)
			return;

		let $build = require('../../mlGame/core/consCtrl.js').default.builds;
		let $map = require('../../mlGame/core/gameMap.js').default.mapCtrl;

		let pop = 0;	//总人数
		let block_idx;	//地块下标
		let m;			//地块
		let cell_num;	//地皮数量
		let c;			//地皮
		let build_idx;	//建筑idx

		this.data.pop = 0;

		for(let i=0;i<block_num;i++)
		{
			block_idx = this.data.blockList[i];
			m = $map.getBlockByIdx(block_idx);

			if(m.data.cells!=-1)
			{
				//人数置0
				m.data.pop=0;
				cell_num = m.data.cells.length;

				//遍历地皮
				for(let j=0;j<cell_num;j++)
				{
					c = m.data.cells[j];//地皮
					build_idx = c.data.build;
					if(build_idx!=-1)
					{
						this.procBuild($build[this.data.side][build_idx],m);
					}
				}
			}
		}

		$map.renderSelTip();
	}

	procBuild(b,block)
	{
		let render=false;

		//如果是民居
		if($bdData[b.data.id].type==0)
		{
			render = this.procMinJu(b,block);
		}

		if(render)
		{
			b.render();
		}
	}

	procMinJu(b,block)
	{
		let lvl = b.data.lv;
		let bid = b.data.id;
		let wholeLvl = $bdData[bid].lvl;
		let render=false;
		let satisfy = true;

		//先看消耗
		for(let j=0;j<wholeLvl[lvl].consume.length;j++)
		{
			let key = wholeLvl[lvl].consume[j].type;
			let num = wholeLvl[lvl].consume[j].num;
			if(this.data[key]>=num*b.data.pop)
			{
				//消耗对应资源
				this.ad(key,-1*num*b.data.pop);
			}
			else
			{
				satisfy = false;
				break;
			}
		}

		//如果满意
		if(satisfy)
		{
			//如果之前不满意
			if(!b.data.satisfy)
				b.data.satisfy_time = 0;
			else
				b.data.satisfy_time++;

			b.data.satisfy = satisfy;
			let pop = b.data.pop;
			let max = $bdData[bid].lvl[lvl].max;

			//人口没到上限，考虑加人口
			if(pop<max)
			{
				let add = Math.floor(Math.random()*(max-pop+1));
				b.data.pop+=add;
			}
			else
			{
				//到上限，考虑升级？
				if(lvl<(wholeLvl.length-1)&&b.data.satisfy_time>=wholeLvl[lvl].upg_wait)
				{
					let r = Math.random()*100;
					if(r<=wholeLvl[lvl].upg_prop)
					{
						let meet=true;
						//检验资源
						for(let kk=0;kk<wholeLvl[lvl].upgrade.length;kk++)
						{
							let key = wholeLvl[lvl].upgrade[kk].type;
							let num = wholeLvl[lvl].upgrade[kk].num;
							if(this.data[key]<num)
							{
								meet=false;
								break;
							}
						}
						//资源满足
						if(meet)
						{
							//扣除资源
							for(let kk=0;kk<wholeLvl[lvl].upgrade.length;kk++)
							{
								let key = wholeLvl[lvl].upgrade[kk].type;
								let num = wholeLvl[lvl].upgrade[kk].num;
								this.ad(key,-1*num);
							}

							//升级
							b.data.lv++;
							render=true;
						}
					}
				}
			}
		}
		else
		{
			//之前满意
			if(b.data.satisfy)
				b.data.satisfy_time = 0;
			else
				b.data.satisfy_time++;
			b.data.satisfy = false;

			//开始掉人口
			if(b.data.satisfy_time>=2)
			{
				//如果人口还在降级线以上
				if(b.data.pop>wholeLvl[lvl].down_pop)
				{
					b.data.pop--;
				}
				else
				{
					b.data.lv--;
					render=true;
				}
			}

		}

		//地块人口累加
		block.data.pop+=b.data.pop;

		//人口累加
		this.data.pop += b.data.pop;

		//交税
		this.ad('gold',wholeLvl[lvl].tax*b.data.pop);
		return render;
	}

	recal(s)
	{

	}
}

class _propCtrl
{
	constructor()
	{

	}

	create(side,v)
	{
		if(propList[side]==undefined)
		{
			let p = new prop(v);
			propList[side] = p;
		}
	}

	month()
	{
		let len = propList.length;
		for(let i=0;i<len;i++)
		{
			if(propList[i]!=undefined)
				propList[i].onMonth();
		}
	}

	getV(s,k)
	{
		return propList[s].data[k];
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
	propCtrl.create(plySide,$dft.res);
}
init();

export default {propCtrl,propList};