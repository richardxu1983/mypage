

/*
武器类型：
1：匕首
2：弓箭
 */

var wp = [
{ 'id':0,	'type':0, 'name':"拳头", 	startWrd:"",			atkWord:'出拳攻击', 			'atkDis':2,		'idx':2, 'aspd':2, 'atk':10   ,ka:'str',kaa:0.01,},
{ 'id':1,	'type':1, 'name':"匕首", 	startWrd:"",			atkWord:'挥动匕首，刺了出去', 'atkDis':2,		'idx':2, 'aspd':2, 'atk':30   ,ka:'str',kaa:0.01,},
{ 'id':2,	'type':2, 'name':"弓箭",		startWrd:"开始蓄力拉弓", atkWord:'射出了一箭',		'atkDis':40,	'idx':0, 'aspd':5, 'atk':55   ,ka:'str',kaa:0.01,},
]

function Weapon(id)
{
    this.id = id;
}

export default { Weapon,wp }; 