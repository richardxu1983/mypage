

var data = {
    timeLimit:200,
    npcTkTime:0.5,
    plyBeginExp:75,
    plyMaxLevel:30,
    plyLvlupPnts:3,
    plyLvlUpAdd:{
    	'hp':3,
    	'mp':1,
        'atk':2,
        'mtk':1,
    },
    plyInit:{
	    hp : 500,
	    maxhp:500,
	    mp: 20,
	    atkBase : 50,
        mtkBase : 20,
	    def : 0,
	    agi : 3,
	    spd : 90,
	    gold : 10,
	    lvl:1,
        exp:75,
	    name:"冒险者",
    },
    currentScene:0,
};

export default { data }; 