import AREA from '../../mlGame/data/area.js'
var $area = AREA.AreaData;

//unit 类
function Area(data)
{
	this.name = data.name || "未知区域";
	this.pos = data.pos || {'x':0,'y':0};
}

var Gmap = {

	pickPsby:function(area)
	{
		var ran = Math.random();
		var p,pos=-1;
		for(var i=0,len=$area[area].passerbyProb.length;i<len;i++)
		{
			p=$area[area].passerbyProb[i];
			if(ran<p)
			{
				pos = i;
				break;
			}
			else
			{
				ran-=p;
			}
		}
		if(pos>=0)
		{
			return $area[area].passerby[pos];
		}
		else
		{
			return -1;
		}
	}
}

export default { Gmap }; 