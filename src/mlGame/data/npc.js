var npc = [];

npc[0] = {
	desc:"这人看起来破破烂烂的",
	wp:0,
	name:"路人",
	frd:2,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:0,ply:0,ans:[0,0,0,0],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:1,
	head:"goutouren_head.png",
};

/*
怪物
 */
npc[100] = {
	desc:"",
	wp:0,
	name:"狗头人",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:5,
	head:"goutouren_head.png",
};
npc[101] = {
	type:0,
	desc:"",
	wp:0,
	name:"僵尸",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:15,
	head:"goutouren_head.png",
};
npc[102] = {
	type:0,
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:25,
	head:"goutouren_head.png",
};
npc[103] = {
	type:0,
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:35,
};
npc[104] = {
	type:0,
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:60,
	head:"goutouren_head.png",
};

/*
伙伴
 */
npc[900] = {
	type:0,
	desc:"",
	wp:0,
	name:"老张",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{base:{hp:20,mp:20,spd:80,atk:20,mtk:20,def:5},up:{hp:2,mp:2,spd:2,atk:2,mtk:2,def:0}},
	lvl:60,
	head:"laozhang_head.png",
};

export default { npc}; 