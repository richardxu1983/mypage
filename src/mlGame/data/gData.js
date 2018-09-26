

var data = {
    timeLimit:200,
    npcTkTime:0.5,
    plyBeginExp:75,
    plyBeginGold:10,
    plyBeginWp:0,
    plyMaxLevel:30,
    plyLvlupPnts:3,
    plyLvlUpAdd:{
    	'hp':3,
        'atk':2,
        'mtk':1,
        'spd':1,
        'def':0,
    },
    plyInit:{
	    hp : 100,
        hpmax : 100,
	    atkBase : 50,
        mtkBase : 20,
	    defBase : 0,
	    agi : 3,
	    spdBase : 60,
	    lvl:1,
        exp:75,
	    name:"冒险者",
    },
    currentScene:0,
};

export default { data }; 