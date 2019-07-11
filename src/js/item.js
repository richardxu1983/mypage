/**
 * 道具类型
 * 0:不可使用、装载类道具
 * 1:武器
 * 2:模块
 */

/**
 * 武器类型：
 * 1：炮类
 * 2：导弹类
 * 3：激光类
 */

 /**
 * 模块类型：
 * 1：可使用（维修）
 * 5001：不可使用，被动类，用于船体增强
 */

const typeStr = [];
typeStr[0] = "一般物品";
typeStr[1] = "武器";
typeStr[2] = "升级模块";

const sbWpTpStr = [];
sbWpTpStr[1] = "炮类";
sbWpTpStr[2] = "导弹类";
sbWpTpStr[3] = "激光类";

var itemData = [];
itemData[0] = {
    id:0,
    name:"弹射炮",
    desc:"一种基本的炮类武器，宇宙中大多数的军火设施都可以造这种炮。",
    type:1,     //类型为1
    subType:1,  //子类型为1
    stack:100,  //最大堆叠数100
    atk:15,     //基本伤害15
    speed:1500, //武器速度1.5秒
    start:1250, //装填速度1秒
    aim:45,     //命中率65
    cost:5,     //电力消耗5
};

itemData[1] = {
    id:0,
    name:"矿石",
    desc:"宇宙中常见的矿物，可以用来制造、修补",
    type:0,     //类型为1
    subType:0,  //子类型为1
    stack:10000,
};

itemData[2] = {
    id:0,
    name:"慢速弹射炮",
    desc:"一种基本的炮类武器，宇宙中大多数的军火设施都可以造这种炮。",
    type:1,     //类型为1
    subType:1,  //子类型为1
    stack:100,  //最大堆叠数100
    atk:15,     //基本伤害15
    speed:2500, //武器速度1.5秒
    start:1000, //装填速度1秒
    aim:45,     //命中率65
    cost:5,
};

itemData[100] = {
    id:100,
    name:"基础维修系统",
    desc:"消耗矿石修复飞船（每{data1}矿石维修1结构）",
    type:2,     //类型为1
    subType:1,  //子类型为1
    stack:25,
    data1:2,   //每2矿石维修1点结构
    cost:5,
};

itemData[101] = {
    id:101,
    name:"护盾扩容系统",
    desc:"护盾容量增加10%",
    type:2,         //类型为1
    subType:5001,  //子类型为5001
    stack:25,
    shipAdd:{
        shldMulti:10,
    },
    cost:5,
};

itemDesc = (id)=>
{
    let str = itemData[id].desc;
    let regex1 = "\\{(.+?)\\}";   //
    let sub = str.match(regex1);
    if(sub==null)
    {
        return str;
    }
    else
    {
        let pat = /\{.*?}/;
        let rep = itemData[id][sub[1]];
        let res = str.replace(pat,rep);
        return res;
    }
}

itemType = (id)=>
{
    let t = itemData[id].type;
    let str = typeStr[t];
    if(t==1)
    {
        str+="（"+sbWpTpStr[itemData[id].subType]+"）";
    }
    return str;
}