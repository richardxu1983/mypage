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
typeStr[1] = "物品";
typeStr[100] = "武器";
typeStr[101] = "挂件";

const sbWpTpStr = [];
sbWpTpStr[1] = "炮类";
sbWpTpStr[2] = "导弹类";
sbWpTpStr[3] = "激光类";

itemDesc = (id)=>
{
    let str = ITEM_DATA[id].desc;
    let regex1 = "\\{(.+?)\\}";   //
    let sub = str.match(regex1);
    if(sub==null)
    {
        return str;
    }
    else
    {
        let pat = /\{.*?}/;
        let rep = ITEM_DATA[id][sub[1]];
        let res = str.replace(pat,rep);
        return res;
    }
}

itemType = (id)=>
{
    let t = ITEM_DATA[id].type;
    let str = typeStr[t];
    if(t==100)
    {
        str+="（"+wpTypeStrByItm(id)+"）";
    }
    return str;
}

wpIdbyItem = (itemId)=>
{
    let type = ITEM_DATA[itemId].type;
    if(type!=100) return;
    return ITEM_DATA[itemId].subId;
}

wpTypeStrByItm = (itemId)=>
{
    return sbWpTpStr[WP_DATA[wpIdbyItem(itemId)].type];
}

mdTypeBtItem = (itemId)=>
{
    if(!ITEM_DATA[itemId]) return -2;
    let type = ITEM_DATA[itemId].type;
    if(type!=-1) return -1;
    let subId = ITEM_DATA[itemId].subId;
    return MD_DATA[subId].type;
}

subIdByItem = (itemId)=>
{
    if(!ITEM_DATA[itemId]) return -2;
    let subId = ITEM_DATA[itemId].subId;
    return subId;
}

itemCost = (itemId)=>
{
    if(!ITEM_DATA[itemId]) return -2;
    let type = ITEM_DATA[itemId].type;
    let subId = ITEM_DATA[itemId].subId;
    if(type==100)
    {
        return WP_DATA[subId].cost;
    }
    else if(type==101)
    {
        return MD_DATA[subId].cost;
    }
    else
    {
        return -1;
    }
}