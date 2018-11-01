var npc = [];
/*
怪物
 */
npc[100] = {
	desc:"",
	wp:0,
	name:"狗头人",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:100,spd:80,atk:20,def:5,mtk:10},
	head:"goutouren_head.png",
};
npc[101] = {
	desc:"",
	wp:0,
	name:"僵尸",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:100,spd:80,atk:20,def:5,mtk:10},
	head:"goutouren_head.png",
};
npc[102] = {
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:100,spd:80,atk:20,def:5,mtk:10},
	head:"goutouren_head.png",
};
npc[103] = {
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:20,spd:80,atk:20,def:5,mtk:10},
	head:"goutouren_head.png",
};
npc[104] = {
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:20,spd:80,atk:20,def:5,mtk:10},
	head:"goutouren_head.png",
};

/*
伙伴
 */
npc[900] = {
	desc:"",
	wp:0,
	name:"老张",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	attr:{hp:20,spd:80,atk:20,def:5},
	head:"laozhang_head.png",
};

export default { npc};