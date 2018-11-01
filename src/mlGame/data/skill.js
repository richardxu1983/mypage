

var FSKL = 
[
{"id":0,"name":"重击","icon":"a.png","desc":"对敌军单体发动一次强力的攻击（伤害率<>）和一次仙法攻击（伤害率<>，受仙法影响），2次攻击独立计算","base":"100<>90","":"4<>4","maxLvl":10,"type":1,"eff":"[0,2]","prob":0.3,"probAdd":0.015,"target":2,"range":2,"targetNum":1},
{"id":1,"name":"鼓舞","icon":"a.png","desc":"鼓舞士气，持续3回合","base":"","":"","maxLvl":10,"type":0,"eff":"[1]","prob":0,"probAdd":0,"target":1,"range":2,"targetNum":2}
]

var FSC = 
[
{"id":0,"name":"重击","target":2,"range":2,"targetNum":1,"eff":"[]","src":"atk","numType":0,"basic":2,"add":0.04},
{"id":1,"name":"鼓舞","target":1,"range":2,"targetNum":2,"eff":"[0]","src":0,"numType":0,"basic":0,"add":0},
{"id":2,"name":"重击","target":2,"range":2,"targetNum":1,"eff":"[]","src":"mtk","numType":1,"basic":3.5,"add":0.04},
]

var EFF = 
[
{"id":0,"name":"鼓舞","round":3,"attr":"atkp","base":40,"psrc":0.2,"source":"spd","badd":3,"padd":3}
]


export default { FSKL,FSC,EFF};