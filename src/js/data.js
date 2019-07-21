var SHIP_DATA = 
{
  "1": {
    "id": "1",
    "name": "民用侦查舰",
    "strc": 50,
    "shd": 100,
    "store": 50,
    "cost": 20,
    "wp": [
      10000,
      10000
    ],
    "md": null,
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
    "wp": [
      10001,
      10001
    ],
    "md": null,
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
  },
  "20004": {
    "id": "20004",
    "name": "轻型火炮激发",
    "desc": "炮类武器攻击之后，35%概率发动，造成一次额外攻击，伤害值为当前护盾的15%，每次战斗最多发动3次",
    "type": 101,
    "subId": 5,
    "stack": 8
  },
  "20005": {
    "id": "20005",
    "name": "轻型充能器",
    "desc": "战斗开始时，随机使一个武器的填充时间降低50%",
    "type": 101,
    "subId": 6,
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
    "add": {
      "shdAdd": 10
    },
    "tgSrc": null,
    "tgSrcP": null,
    "tgMax": null,
    "tgProb": null,
    "tgEff": null,
    "tgTgt": null,
    "tgNumSrc": null,
    "tgNum": null,
    "tgNumPer": null,
    "tgNumMax": null
  },
  "2": {
    "id": "2",
    "name": "民用结构强化",
    "type": 1,
    "cost": 5,
    "add": {
      "strcAdd": 10
    },
    "tgSrc": null,
    "tgSrcP": null,
    "tgMax": null,
    "tgProb": null,
    "tgEff": null,
    "tgTgt": null,
    "tgNumSrc": null,
    "tgNum": null,
    "tgNumPer": null,
    "tgNumMax": null
  },
  "3": {
    "id": "3",
    "name": "民用炮弹增幅",
    "type": 1,
    "cost": 5,
    "add": {
      "paoAtkAdd": 15
    },
    "tgSrc": null,
    "tgSrcP": null,
    "tgMax": null,
    "tgProb": null,
    "tgEff": null,
    "tgTgt": null,
    "tgNumSrc": null,
    "tgNum": null,
    "tgNumPer": null,
    "tgNumMax": null
  },
  "4": {
    "id": "4",
    "name": "民用护盾战斗回冲",
    "type": 1,
    "cost": 5,
    "add": {
      "shdBtRecAdd": 15
    },
    "tgSrc": null,
    "tgSrcP": null,
    "tgMax": null,
    "tgProb": null,
    "tgEff": null,
    "tgTgt": null,
    "tgNumSrc": null,
    "tgNum": null,
    "tgNumPer": null,
    "tgNumMax": null
  },
  "5": {
    "id": "5",
    "name": "轻型火炮激发",
    "type": 2,
    "cost": 5,
    "add": null,
    "tgSrc": 3,
    "tgSrcP": 1,
    "tgMax": 3,
    "tgProb": 100,
    "tgEff": 1,
    "tgTgt": null,
    "tgNumSrc": 1,
    "tgNum": null,
    "tgNumPer": 35,
    "tgNumMax": -1
  },
  "6": {
    "id": "6",
    "name": "轻型充能器",
    "type": 2,
    "cost": 5,
    "add": null,
    "tgSrc": 1,
    "tgSrcP": null,
    "tgMax": 1,
    "tgProb": 45,
    "tgEff": 3,
    "tgTgt": 1,
    "tgNumSrc": 0,
    "tgNum": 45,
    "tgNumPer": null,
    "tgNumMax": null
  }
};