
var playerData = {};

/**
 * 道具类型
 * 0:不可使用、装载类道具
 * 1:武器
 * 2:升级模块
 */

/**
 * 武器类型：
 * 1：炮类
 * 2：导弹类
 * 3：激光类
 */
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
    aim:65,     //命中率65
};

itemData[1] = {
    id:0,
    name:"矿石",
    desc:"宇宙中常见的矿物，可以用来制造、修补",
    type:0,     //类型为1
    subType:0,  //子类型为1
    stack:10000,
    atk:0, 
    speed:0,
    start:0,
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
    aim:85,     //命中率65
};

//side:0:玩家,999:野怪
function createShip(data,side,cap)
{
    var ship = new Object;
    ship.name = data.name;
    ship.owner = side;
    ship.cap = cap;
    ship.structure = data.maxStructure;
    ship.maxStructure = data.maxStructure;
    ship.shield = data.maxShield;
    ship.maxShield = data.maxShield;
    ship.weaponNum = data.weaponNum;
    ship.moduleNum = data.moduleNum;
    ship.roomSize = data.roomSize;
    ship.roomOccupy = 0;
    ship.module = new Array(ship.moduleNum);
    ship.weapon = new Array(ship.weaponNum);
    ship.room = new Array(ship.roomSize);

    ship.addItem = (id,num)=>{
        //满了
        if(ship.roomOccupy>=ship.roomSize) return;

        let NumToAdd = num;

        //寻找同样的
        for(let it=0; it<ship.room.length;it++)
        {
            if(ship.room[it]!=undefined)
            {
                if(ship.room[it].id==id && ship.room[it].num<itemData[id].stack)
                {
                    if((ship.room[it].num+NumToAdd)>itemData[id].stack)
                    {
                        NumToAdd = NumToAdd - (itemData[id].stack-ship.room[it].num);
                        ship.room[it].num = itemData[id].stack;
                    }
                    else
                    {
                        ship.room[it].num+=NumToAdd;
                        NumToAdd = 0;
                    }
                }
            }
        }

        //如果已经和同样的堆叠完了
        if(NumToAdd==0) return;
        
        //寻找空位
        for(let it=0; it<ship.room.length;it++)
        {
            if(ship.room[it]==undefined||ship.room[it].id==-1)
            {
                ship.room[it] = {
                    idx:it,
                    'id':id,
                    num:0,
                    name:itemData[id].name,
                }
                if(NumToAdd>itemData[id].stack)
                {
                    ship.room[it].num = itemData[id].stack;
                    NumToAdd -= itemData[id].stack;
                }
                else
                {
                    ship.room[it].num = NumToAdd;
                    NumToAdd = 0;
                }
                ship.roomOccupy++;
                if(ship.roomOccupy>=ship.roomSize) return;
            }
            if(NumToAdd==0) return;
        }
    }

    ship.tryToFix = ()=>
    {

        let stToFix = ship.maxStructure - ship.structure;
        if(stToFix==0) return;
        let fixMatIdx = getItemIdx(ship,1);
        if(fixMatIdx==-1)
        {
            printMsg("你没有足够的矿石");
            return;
        }
        let num = ship.room[fixMatIdx].num;
        let ToUse = 0;
        if(stToFix*2>num)
        {
            ToUse = num - num%2;
            if(ToUse==0)
            {
                printMsg("你没有足够的矿石");
                return
            };
        }
        else
        {
            ToUse = stToFix*2;
        }
        let fix = Math.floor(ToUse/2);
        ship.structure += fix;
        ship.delItemAtIdx(fixMatIdx,ToUse);
        printMsg("你使用了"+ToUse+"的矿石修复了["+ship.colorName()+"]"+fix+"的结构");
    }

    ship.tryToLdWpByItemIdx = (idx)=>
    {
        if(ship.room[idx]==undefined) return;
        if(ship.room[idx].id<0) return;
        let WpId = ship.room[idx].id;
        if(itemData[WpId].type!=1) return;

        if(ship.loadWp(WpId)==1)
        {
            ship.delItemAtIdx(idx,1);
        }
    }

    ship.loadWp = (WpId)=>
    {
        let WpIdx = -1;
        for(let i=0; i<ship.weapon.length;i++)
        {
            if(ship.weapon[i].id==-1)
            {
                WpIdx = i;
                break;
            }
        }
        if(WpIdx==-1) return 0;
        ship.weapon[WpIdx].id = WpId;
        ship.weapon[WpIdx].name = itemData[WpId].name;
        return 1;
    }

    ship.delItemAtIdx = (idx,num)=>
    {
        if(ship.room[idx]==undefined) return;
        if(ship.room[idx].id<0) return;
        ship.room[idx].num-=num;
        if(ship.room[idx].num<=0)
        {
            ship.room[idx].id = -1;
            ship.room[idx].num = 0;
            ship.room[idx].name = "";
            ship.roomOccupy--;
        }
    }
    ship.brcName = ()=>
    {
        if(ship.owner==0)
        {
            return "[<font color=blue>"+ship.name+"</font>]";
        }
        else
        {
            return "[<font color=red>"+ship.name+"</font>]";
        }
    }
    ship.colorName = ()=>
    {
        if(ship.owner==0)
        {
            return "<font color=blue>"+ship.name+"</font>";
        }
        else
        {
            return "<font color=red>"+ship.name+"</font>";
        }
    }
    for(let i=0; i<ship.weapon.length;i++)
    {
        ship.weapon[i] = {
            posName:"武器"+(i+1),
            idx:i+1,
            id:-1,
            name:"空",
            staff:-1,
        };
    }
    for(let i=0; i<ship.module.length;i++)
    {
        ship.module[i] = {
            idx:i+1,
            id:-1,
            name:"空",
        };
    }
    ship.fightInit = ()=>
    {
        let wpId = 0;
        for(let i=0; i<ship.weapon.length;i++)
        {
            wpId = ship.weapon[i].id;
            if(wpId>=0)
            {
                ship.weapon[i].ft = itemData[wpId].start;
            }
        }
    }
    ship.takeDmg = (dmg)=>
    {
        if(ship.shield>dmg)
        {
            ship.shield-=dmg;
            addFightMsg(ship.brcName()+"的护盾减少了<font color=#FF6600>"+dmg +"</font>("+ship.shield+")");
        }
        else
        {
            let s = ship.shield;
            if(s>0)
            {
                ship.shield = 0;
                addFightMsg(ship.brcName()+"的护盾减少了<font color=#FF6600>"+s +"</font>("+ship.shield+")");
            }
            ship.structure -= (dmg - s);
            addFightMsg(ship.brcName()+"的结构减少了<font color=#FF6600>"+(dmg - s)+"</font>("+ship.structure+")");
            if(ship.structure<0)
            {
                ship.structure = 0;
                if(ship.owner==0)
                {
                    printMsg("你的"+ship.brcName()+"被击毁了");
                    addFightMsg("你的"+ship.brcName()+"被击毁了");
                }
                else
                {
                    printMsg(ship.brcName()+"被击毁了");
                    addFightMsg(ship.brcName()+"被击毁了");
                }
            }
        }
    }
    ship.atkEnmy = (t,enmy)=>
    {
        let dmg = 0;
        let aim = 0;
        let tip = false;
        for(let wp of ship.weapon)
        {
            if(wp.id>=0&&t>=wp.ft)
            {
                wp.ft = t + itemData[wp.id].speed;
                if(!tip)
                {
                    addFightMsg("--------------------------");
                    addFightMsg(ship.brcName()+"发动攻击");
                    tip = true;
                }
                addFightMsg(ship.brcName() + "的"+wp.posName+"[<font color=#6B8E23>"+wp.name  +"</font>]对"+enmy.brcName()+"发动攻击");
                aim = itemData[wp.id].aim;
                if(Math.random()*100 > aim)
                {
                    addFightMsg(ship.brcName() + "的" +wp.posName+"[<font color=#6B8E23>"+wp.name  +"</font>]攻击<font color=#FF6600>未命中</color>");
                }
                else
                {
                    dmg = itemData[wp.id].atk;
                    enmy.takeDmg(dmg);
                    if(enmy.structure<=0)
                    {
                        return 1;
                    }
                }
            }
        }
        return 0;
    }

    ship.loadWpByIdIdx = (id,idx)=>
    {
        var pos = idx-1;
        if(ship.weapon[pos].id!=-1)
        {
            return;
        }
        ship.weapon[pos].id = id;
        ship.weapon[pos].name = itemData[id].name;
    }

    ship.unLoadWpByIdx = (ship,idx)=>
    {
        let pos = idx-1;
        let id = ship.weapon[pos].id;
        ship.weapon[pos].id = -1;
        ship.weapon[pos].name = "空";
        ship.addItem(id,1);
    }

    ship.changeName = (str)=>
    {
        this.name = str;
    }
    return ship;
}

function getItemIdx(ship,id)
{
    let idx = -1;
    //寻找
    for(let it=0; it<ship.room.length;it++)
    {
        if(ship.room[it]!=undefined&&ship.room[it].id==id)
        {
            return it;
        }
    }
    return idx;
}

function playerShipFightWith(enmy)
{
    if(playerData.ship.structure<=0)
    {
        return;
    }

    printMsg(timeStr()+"，你的"+playerData.ship.brcName()+"与"+enmy.brcName()+"发生了战斗");
    addFightMsg("");
    addFightMsg(timeStr()+"，你的"+playerData.ship.brcName()+"与"+enmy.brcName()+"发生了战斗");

    var t = 2000;    //时间为0开始，每次步进250毫秒
    let dmg = 0;

    playerData.ship.fightInit();
    enmy.fightInit();

    while((playerData.ship.structure>0)&&(enmy.structure>0))
    {
        if(playerData.ship.atkEnmy(t,enmy)==1 || enmy.atkEnmy(t,playerData.ship)==1)
        {
            return;
        }
        t += 200;
    }
    addFightMsg("");
}

function createCapWithShip(shipdata,capdata)
{
    var cap = {};
    cap.ship = createShip(shipdata,0,cap);
    initCaptain(cap,capdata);
    initStaff(cap,capdata.stuffNum);
    for(const wpId of shipdata.wp)
    {
        cap.ship.loadWp(wpId);
    }
    cap.money = capdata.money;
    return cap;
}