
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
    start:1000, //装填速度1秒
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

function createShip(data,side)
{
    var ship = new Object;
    ship.name = data.name;
    ship.owner = side;
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

    ship.tryToLdWpByItemIdx = (idx)=>
    {
        if(ship.room[idx]==undefined) return;
        if(ship.room[idx].id<0) return;
        let WpId = ship.room[idx].id;
        if(itemData[WpId].type!=1) return;

        let WpIdx = -1;
        for(let i=0; i<ship.weapon.length;i++)
        {
            if(ship.weapon[i].id==-1)
            {
                WpIdx = i+1;
                break;
            }
        }
        if(WpIdx==-1) return;
        ship.delItemAtIdx(idx,1);
        ship.loadWpByIdIdx(WpId,WpIdx);
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

    ship.colorName = ()=>
    {
        if(ship.owner==0)
        {
            return "<font color=blue>"+ship.name+"</font>";
        }
        else
        {
            return "<font color=#D2691E>"+ship.name+"</font>";
        }
    }
    for(let i=0; i<ship.weapon.length;i++)
    {
        ship.weapon[i] = {
            idx:i+1,
            id:-1,
            name:"空",
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
            addFightMsg(ship.colorName()+"的护盾减少了"+dmg +"("+ship.shield+")");
        }
        else
        {
            let s = ship.shield;
            if(s>0)
            {
                ship.shield = 0;
                addFightMsg(ship.colorName()+"的护盾减少了"+s +"("+ship.shield+")");
            }
            ship.structure -= (dmg - s);
            addFightMsg(ship.colorName()+"的结构减少了"+(dmg - s)+"("+ship.structure+")");
            if(ship.structure<0)
            {
                ship.structure = 0;
                if(ship.owner==0)
                {
                    printMsg("你的["+ship.colorName()+"]被击毁了");
                    addFightMsg("你的["+ship.colorName()+"]被击毁了");
                }
                else
                {
                    printMsg("["+ship.colorName()+"]被击毁了");
                    addFightMsg("["+ship.colorName()+"]被击毁了");
                }
            }
        }
    }
    ship.atkEnmy = (t,enmy)=>
    {
        let dmg = 0;
        for(let wp of ship.weapon)
        {
            if(wp.id>=0&&t>=wp.ft)
            {
                wp.ft = t + itemData[wp.id].speed;
                dmg = itemData[wp.id].atk;
                addFightMsg(ship.colorName() + "的" +wp.name  +"对"+enmy.colorName()+"发动攻击");
                enmy.takeDmg(dmg);
                if(enmy.structure<=0)
                {
                    return 1;
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

function playerShipFightWith(enmy)
{
    if(playerData.mainShip.structure<=0)
    {
        return;
    }

    printMsg(timeStr()+"，你的["+playerData.mainShip.colorName()+"]与["+enmy.colorName()+"]发生了战斗");
    addFightMsg("");
    addFightMsg(timeStr()+"，你的["+playerData.mainShip.colorName()+"]与["+enmy.colorName()+"]发生了战斗");

    var t = 2000;    //时间为0开始，每次步进250毫秒
    let dmg = 0;

    playerData.mainShip.fightInit();
    enmy.fightInit();

    while((playerData.mainShip.structure>0)&&(enmy.structure>0))
    {
        if(playerData.mainShip.atkEnmy(t,enmy)==1 || enmy.atkEnmy(t,playerData.mainShip)==1)
        {
            return;
        }
        t += 200;
    }
    addFightMsg("");
}

function testFight()
{
    var test = createShip({
        name:"海盗号",
        maxStructure:50,
        maxShield:50,
        weaponNum:1,
        moduleNum:0,
        roomSize:0,
    },999);
    
    test.loadWpByIdIdx(0,1);

    playerShipFightWith(test);

    addHour();
}

function gameInit()
{
    playerData.mainShip = createShip({
        name:"佛尔斯特号",
        maxStructure:1000,
        maxShield:100,
        weaponNum:2,
        moduleNum:2,
        roomSize:50,
    },0);
    
    playerData.mainShip.loadWpByIdIdx(0,1);
    playerData.mainShip.loadWpByIdIdx(0,2);
    playerData.mainShip.addItem(1,100);
}

gameInit();