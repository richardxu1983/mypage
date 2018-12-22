
const $dft = require('../../mlGame/data/gData.js').default.dft;
const $bdData = require('../../mlGame/data/construct.js').default.construct;

var propList= [];

class prop
{
	constructor(v)
	{
		this.data = 
		{
			name:"",
			gold:v.gold,
			wood:v.wood,
			food:v.food,
			iron:v.iron,
			stone:v.stone,
			pop:0,
			maxBlock:5,
			block:0,
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
		let $build = require('../../mlGame/core/consCtrl.js').default.builds;

		let side = $dft.plySide;
		let b_list = $build[side];
		let len = b_list.length;
		let i=0;
		let b;
		let lvl;
		let pop = 0;
		let satisfy = true;
		let wholeLvl;
		let render=false;
		let bid;

		for(i=0;i<len;i++)
		{
			b = b_list[i];
			render=false;

			//如果是民居
			if($bdData[b.data.id].type==0)
			{
				lvl = b.data.lv;
				bid = b.data.id;
				wholeLvl = $bdData[bid].lvl;

				//先看消耗
				for(let j=0;j<wholeLvl[lvl].consume.length;j++)
				{
					let key = wholeLvl[lvl].consume[j].type;
					let num = wholeLvl[lvl].consume[j].num;
					if(this.data[key]>=num*b.data.pop)
					{
						//消耗满足
						this.ad(key,-1*num*b.data.pop);
					}
					else
					{
						satisfy = false;
						break;
					}
				}

				//如果满意，则添加时间，人口
				if(satisfy)
				{
					//之前不满意
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
								for(let kk=0;kk<wholeLvl[lvl].upgrade;kk++)
								{
									let key = wholeLvl[lvl].upgrade[kk].type;
									let num = wholeLvl[lvl].upgrade[j].num;
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
									for(let kk=0;kk<wholeLvl[lvl].upgrade;kk++)
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
				pop+=b.data.pop;
				//交税
				this.ad('gold',wholeLvl[lvl].tax*b.data.pop);
			}

			if(render)
			{
				b.render();
			}
		}
		this.data.pop = pop;
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