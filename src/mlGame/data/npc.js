var npc = [];

npc[0] = {
	desc:"这人看起来破破烂烂的",
	wp:0,
	name:"路人",
	frd:2,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:0,ply:0,ans:[0,0,0,0],},
	loot:{gold:5,exp:500},
	lvl:1,
	head:"goutouren_head.png",
};

npc[100] = {
	desc:"",
	wp:0,
	name:"狗头人",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	loot:{gold:5,exp:500},
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
	loot:{gold:5,exp:500},
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
	loot:{gold:5,exp:500},
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
	loot:{gold:5,exp:500},
	lvl:35,
};
npc[104] = {
	type:0,
	desc:"",
	wp:0,
	name:"地穴强盗",
	frd:0,//0:仇恨,1:冷淡，2:友善,3:崇敬
	dlg:{dlg:1,ply:1,ans:[1,1,1,1],},
	loot:{gold:5,exp:500},
	lvl:60,
	head:"goutouren_head.png",
};
export default { npc}; 