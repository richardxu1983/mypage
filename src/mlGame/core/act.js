
import MpB from '../../mlGame/core/gameMap.js'
var $area = MpB.AreaList;
var $dist = MpB.district;
var $plc = MpB.plc;

var areAct=[
{
	id:0,
	name:'前往',
	desc:'选择前往的地点',
	t:0,
},
{
	id:1,
	name:'休息一下',
	desc:'也许我需要休息一下了...',
	t:2,
},
{
	id:2,
	name:'睡觉',
	desc:'也许我需要睡一下了...',
	t:8,
},
]


function AreaDoAct(act,area)
{
}

export default { areAct,AreaDoAct }; 