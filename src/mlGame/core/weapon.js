

var wp = [
{ 'id':0,	'type':"匕首", 'name':"一般的匕首", atkWord:'挥动匕首，刺了出去', 'atkDis':2,	'idx':2, 'aspd':1, 'atk':10 },
{ 'id':1,	'type':"弓箭", 'name':"一般的弓箭", atkWord:'射出了一箭','atkDis':20,	'idx':0, 'aspd':4, 'atk':20 },
]

function Weapon(id)
{
	this.atk = wp[id].atk || 0;
    this.aspd = wp[id].aspd || 0;
	this.name = wp[id].name || "";
	this.type = wp[id].type || "";
    this.atkDis = wp[id].atkDis || 0;
    this.idx = wp[id].idx || 0;
    this.atkWord = wp[id].atkWord || "";
}

export default { Weapon }; 