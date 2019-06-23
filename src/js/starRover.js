
var playerData = {};

var infoMsg = [];
var fightMsg = [];
function printMsg(str)
{
    infoMsg.push(">&emsp; "+str);
    checkArray(infoMsg);
}

function addFightMsg(str)
{
    fightMsg.push(">&emsp; "+str);
    checkArray(fightMsg);
}

function checkArray(array)
{
    if(array.length>=300)
    {
        array.splice(0,100);
    }
}

var day = 1;
var hour = 0;
var hourStr = ["早晨","上午","下午","晚上","半夜"];
function timeStr()
{
    return "第"+day+"天"+hourStr[hour];
}
function addHour()
{
    var step=2;
    hour+=step;
    if(hour>=5)
    {
        hour-=5;
        day++;
    }
}

/**
 * 武器类型：
 * 1：炮类
 * 2：导弹类
 * 3：激光类
 */
var wpData = [];
wpData[0] = {
    id:0,
    name:"弹射炮",
    desc:"一种基本的炮类武器，宇宙中大多数的军火设施都可以造这种炮。",
    type:1,     //类型为1
    atk:15,     //基本伤害15
    speed:1500, //武器速度1.5秒
    start:1000, //装填速度1秒
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

    ship.colorName = function()
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
    ship.fightInit = function()
    {
        let wpId = 0;
        for(let i=0; i<ship.weapon.length;i++)
        {
            wpId = ship.weapon[i].id;
            if(wpId>=0)
            {
                ship.weapon[i].ft = wpData[wpId].start;
            }
        }
    }
    ship.takeDmg = function(dmg)
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
                //console.log(ship.name+"被击毁了");
            }
        }
    }
    ship.atkEnmy = function(t,enmy)
    {
        let dmg = 0;
        for(let wp of ship.weapon)
        {
            if(wp.id>=0&&t>=wp.ft)
            {
                wp.ft = t + wpData[wp.id].speed;
                dmg = wpData[wp.id].atk;
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
    ship.changeName = function(str)
    {
        this.name = str;
    }
    return ship;
}

function loadWpByIdIdx(id,ship,idx)
{
    var pos = idx-1;
    if(ship.weapon[pos].id!=-1)
    {
        return;
    }
    ship.weapon[pos].id = id;
    ship.weapon[pos].name = wpData[id].name;
}

function unLoadWpByIdx(ship,idx)
{
    var pos = idx-1;
    ship.weapon[pos].id = -1;
    ship.weapon[pos].name = "空";
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
    
    loadWpByIdIdx(0,test,1);

    playerShipFightWith(test);

    addHour();
}

function gameInit()
{
    playerData.mainShip = createShip({
        name:"佛尔斯特号",
        maxStructure:1000,
        maxShield:100,
        weaponNum:1,
        moduleNum:2,
        roomSize:50,
    },0);
    
    loadWpByIdIdx(0,playerData.mainShip,1);
}

gameInit();