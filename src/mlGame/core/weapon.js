

/*
武器类型：
1：匕首
2：弓箭
 */

var wp = [
{ 'id':0,	'type':0,	quality:0, 'name':"拳头", 	rg:false,	startWrd:"",			atkWord:'出拳攻击', 			'atkDis':2,		'idx':2, 'aspd':2, 'atk':5   ,ka:'str',kaa:0.02,},
{ 'id':1,	'type':1,	quality:0, 'name':"匕首", 	rg:false,	startWrd:"",			atkWord:'挥动匕首，刺了出去', 'atkDis':2,		'idx':2, 'aspd':2, 'atk':25   ,ka:'str',kaa:0.01,},
{ 'id':2,	'type':2,	quality:0, 'name':"弓箭",		rg:true,	startWrd:"开始蓄力拉弓", atkWord:'射出了一箭',		'atkDis':50,	'idx':0, 'aspd':7, 'atk':20   ,ka:'str',kaa:0.01,},
]

const wpType = ["无","匕首","弓箭"];
const wpL = ["无","把","把"];
const wpQ = ["劣质的","普通的","精致的"];

function Weapon(id)
{
    this.id = id;
}

export default { Weapon,wp,wpType,wpL,wpQ }; 