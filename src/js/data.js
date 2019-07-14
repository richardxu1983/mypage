var SHIP_DATA = 
{
  "1": {
    "id": "1",
    "name": "民用侦查舰",
    "strc": 50,
    "shd": 20,
    "store": 50,
    "cost": 20,
    "costLv": 5,
    "shdLv": 5,
    "strcLv": 5,
    "maxLv": 10,
    "shdRec": 10,
    "shdBtRec": 3,
    "maxWpNum": 5,
    "wpOpen": 2,
    "maxMdNum": 10,
    "mdOpen": 3
  },
  "2": {
    "id": "2",
    "name": "海盗船突击舰",
    "strc": 20,
    "shd": 10,
    "store": 50,
    "cost": 20,
    "costLv": 5,
    "shdLv": 5,
    "strcLv": 5,
    "maxLv": 1,
    "shdRec": 0,
    "shdBtRec": 1,
    "maxWpNum": 2,
    "wpOpen": 2,
    "maxMdNum": 2,
    "mdOpen": 2
  }
};

var SPECITES_DATA = 
{
    "1": {
      "id": "1",
      "name": "人类",
      "wp_paoPer": 10,
      "wp_msPer": null,
      "wp_lsPer": null,
      "shdBtRecPerAdd": null,
      "strcPerAdd": 10,
      "shdRecPerAdd": null
    },
    "2": {
      "id": "2",
      "name": "智械",
      "wp_paoPer": null,
      "wp_msPer": 15,
      "wp_lsPer": null,
      "shdBtRecPerAdd": 20,
      "strcPerAdd": null,
      "shdRecPerAdd": null
    }
}

var ITEM_DATA = 
{
  "1": {
    "id": "1",
    "name": "普晶体",
    "desc": "这篇宇宙中最常见的合成晶体，可以用来制造和修补",
    "type": 1,
    "subId": null,
    "stack": 100
  },
  "10000": {
    "id": "10000",
    "name": "民用弹射炮",
    "desc": "这是一种常见的民用炮",
    "type": 100,
    "subId": 1,
    "stack": 8
  },
  "10001": {
    "id": "10001",
    "name": "轻型快速炮",
    "desc": "一般无人海盗船上的常见炮类",
    "type": 100,
    "subId": 2,
    "stack": 8
  },
  "20000": {
    "id": "20000",
    "name": "民用护盾扩充系统",
    "desc": "一种常见的护盾扩充系统",
    "type": 101,
    "subId": 1,
    "stack": 8
  },
  "20001": {
    "id": "20001",
    "name": "民用结构强化系统",
    "desc": "一种常见的结构扩充系统",
    "type": 101,
    "subId": 2,
    "stack": 8
  },
  "20002": {
    "id": "20002",
    "name": "民用炮弹增幅",
    "desc": "增加炮类伤害",
    "type": 101,
    "subId": 3,
    "stack": 8
  },
  "20003": {
    "id": "20003",
    "name": "民用护盾战斗回冲",
    "desc": "战斗时护盾回冲增加",
    "type": 101,
    "subId": 4,
    "stack": 8
  }
};
var WP_DATA = 
{
  "1": {
    "id": "1",
    "name": "民用弹射炮",
    "type": 1,
    "cost": 5,
    "atk": 25,
    "spd": 2000,
    "start": 2500,
    "aim": 40
  },
  "2": {
    "id": "2",
    "name": "轻型快速炮",
    "type": 1,
    "cost": 5,
    "atk": 10,
    "spd": 1000,
    "start": 1000,
    "aim": 35
  }
};

var MD_DATA = 
{
  "1": {
    "id": "1",
    "name": "民用护盾扩充",
    "type": 1,
    "cost": 5,
    "shdAdd": 10,
    "shdPer": null,
    "strcAdd": null,
    "strcPer": null,
    "paoAtkAdd": null,
    "paoAtkPer": null,
    "shdBtRecAdd": null,
    "shdBtRecPer": null,
    "shdRecAdd": null,
    "shdRecPer": null
  },
  "2": {
    "id": "2",
    "name": "民用结构强化",
    "type": 1,
    "cost": 5,
    "shdAdd": null,
    "shdPer": null,
    "strcAdd": 10,
    "strcPer": null,
    "paoAtkAdd": null,
    "paoAtkPer": null,
    "shdBtRecAdd": null,
    "shdBtRecPer": null,
    "shdRecAdd": null,
    "shdRecPer": null
  },
  "3": {
    "id": "3",
    "name": "民用炮弹增幅",
    "type": 1,
    "cost": 5,
    "shdAdd": null,
    "shdPer": null,
    "strcAdd": null,
    "strcPer": null,
    "paoAtkAdd": 15,
    "paoAtkPer": null,
    "shdBtRecAdd": null,
    "shdBtRecPer": null,
    "shdRecAdd": null,
    "shdRecPer": null
  },
  "4": {
    "id": "4",
    "name": "民用护盾战斗回冲",
    "type": 1,
    "cost": 5,
    "shdAdd": null,
    "shdPer": null,
    "strcAdd": null,
    "strcPer": null,
    "paoAtkAdd": null,
    "paoAtkPer": null,
    "shdBtRecAdd": 15,
    "shdBtRecPer": null,
    "shdRecAdd": null,
    "shdRecPer": null
  }
};