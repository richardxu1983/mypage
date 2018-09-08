
var plyAsk = [];
plyAsk[0] = [];
plyAsk[0][0] = [{w:"你好",once:false},{w:"打扰了",once:false}];
plyAsk[0][1] = [{w:"请问，你知道恶龙在哪里吗",once:true},{w:"请问，你知道哪里有旅馆吗",once:true},{w:"我没问题了，再见",once:false}];
plyAsk[0][2] = [{w:"太感谢了，我还有个问题",once:false},{w:"非常感谢，再见了，我的朋友",once:false}];

plyAsk[1] = [];
plyAsk[1][0] = [{w:"我将代表圣光制裁你！",once:false}];

var npcAns = [];
npcAns[0] = [];
npcAns[0][0] = {expr:"友善地看着你",t:0};
npcAns[0][1] = {expr:"担心的眼神",dlg:["你要去找恶龙吗？这太危险了。让我想想...","听说恶龙在北边的幽暗城，你也许应该问问酒馆老板。"],i:"(关于恶龙，也许要去问问旅馆老板？)",t:2};
npcAns[0][2] = {expr:"友善地看着你",dlg:["镇中心就有酒馆，叫“最后的酒馆”，很容易找"],i:"(唔，酒馆在镇中心么...)",t:2};
npcAns[0][3] = {expr:"友善地看着你",dlg:["什么问题？"],t:1};
npcAns[0][4] = {expr:"友善地看着你",dlg:["你好"],t:1};
npcAns[0][5] = {expr:"挥了挥手",dlg:["再见"],t:-1};

npcAns[1] = [];
npcAns[1][0] = {expr:"凶狠地看着你",dlg:["这个矿是我的，去死吧！"],t:0};

var npcDlg = [];
npcDlg[0] = {
	start:0,
	step:0,
	pair:{
		"00":4,
		"01":5,
		"10":1,
		"11":2,
		"12":5,
		"20":3,
		"21":5,
	}
};

npcDlg[1] = {
	start:0,
	step:0,
	pair:{
		"00":-1,
	}
};


export default { plyAsk,npcAns,npcDlg}; 