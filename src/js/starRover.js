
var playerData = {};

const STAFF_ADD_TO_AIM = 15;

//side:0:玩家,999:野怪
function createShip(data,cap)
{
    var ship = new Object;
    ship.name = data.name;
    ship.cap = cap;
    ship.side = cap.side;
    ship.structure = data.bMaxStrc;
    ship.bMaxStrc = data.bMaxStrc
    ship.maxStrc = 0;
    ship.shield = data.bMaxShld;
    ship.shieldRec = data.shieldRec||0;
    ship.bMaxShld = data.bMaxShld;
    ship.maxShld = 0;
    ship.wpNum = data.wpNum;
    ship.wpOpen = data.wpOpen||2;
    ship.mdOpen = data.mdOpen||2;
    ship.mdNum = data.mdNum;
    ship.cost = -1;
    ship.lvl = data.lvl;
    ship.initCost = data.initCost;
    ship.maxLvl = data.maxLvl;
    ship.lvlup = {
        cost:5,
        shld:10,
        strc:10,
    };
    ship.roomSize = data.roomSize;
    ship.add = {
        shldAdd:0,
        shldMulti:0,
        strcAdd:0,
        strcMulti:0,
    };
    ship.maxElc = data.maxElc;  //最大电量
    ship.roomOccupy = 0;
    ship.md = new Array(ship.mdNum);
    ship.wp = new Array(ship.wpNum);
    ship.room = new Array(ship.roomSize);

    ship.lvlUp = ()=>
    {
        if(ship.lvl>=ship.maxLvl) return;
        ship.lvl++;
        ship.check();
    }

    ship.curCost = ()=>
    {
        let c = 0;
        for(wp of ship.wp)
        {
            if(wp.open==true&&wp.id!=-1)
            {
                c+=itemData[wp.id].cost;
            }
        }
        for(md of ship.md)
        {
            if(md.open==true&&md.id!=-1)
            {
                c+=itemData[md.id].cost;
            }
        }
        return c;
    }

    ship.check = ()=>
    {
        let v;
        let mdId;
        for(k in ship.add)
        {
            ship.add[k] = 0;
        }
        for(md of ship.md)
        {
            mdId = md.id;
            if(mdId!=-1)
            {
                if(itemData[mdId].subType==5001)
                {
                    for(k in itemData[mdId].shipAdd)
                    {
                        v = itemData[mdId].shipAdd[k];
                        ship.add[k] += v;
                    }
                }
            }
        }
        ship.cost = ship.initCost + (ship.lvl-1)*ship.lvlup.cost;
        ship.maxShld = Math.floor((ship.bMaxShld + (ship.lvl-1)*ship.lvlup.shld + ship.add.shldAdd)*((100+ship.add.shldMulti)/100));
        ship.maxStrc = Math.floor((ship.bMaxStrc + (ship.lvl-1)*ship.lvlup.strc+ ship.add.strcAdd)*((100+ship.add.strcMulti)/100));
    }

    ship.OpenAdd = (str,n)=>
    {
        if(ship[str+"Open"]+n>ship[str+"Num"])
        {
            printMsg("您的飞船已经无法再增加这个位置了");
            return;
        }
        ship[str+"Open"]+=n;
        for(let i=0; i<ship[str].length;i++)
        {
            if(i<ship[str+"Open"])
            {
                ship[str][i].open = true;
            }
        }
    }

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

    ship.recShield = ()=>
    {
        if(ship.shield>ship.maxShld) return;
        ship.shield += ship.shieldRec;
        if(ship.shield>ship.maxShld) ship.shield = ship.maxShld;
    }

    ship.tryToFix = ()=>
    {

        let stToFix = ship.maxStrc - ship.structure;
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

    ship.tryToLdMdByItemIdx = (idx)=>
    {
        if(ship.room[idx]==undefined) return;
        if(ship.room[idx].id<0) return;
        let mdId = ship.room[idx].id;
        if(itemData[mdId].type!=2) return;

        if(ship.loadMd(mdId)==1)
        {
            ship.delItemAtIdx(idx,1);
        }
    }

    ship.loadWp = (WpId)=>
    {
        let WpIdx = -1;
        for(let i=0; i<ship.wp.length;i++)
        {
            if(ship.wp[i].open==true&&ship.wp[i].id==-1)
            {
                WpIdx = i;
                break;
            }
        }
        if(WpIdx==-1) return 0;
        if(checkCost(ship,WpId)==-1)
        {
            printMsg("电力不足：无法装配"+itemData[WpId].name);
            return;
        }
        ship.wp[WpIdx].id = WpId;
        ship.wp[WpIdx].name = itemData[WpId].name;
        ship.wp[WpIdx].check();
        return 1;
    }

    ship.loadMd = (MdId)=>
    {
        let Idx = -1;
        for(let i=0; i<ship.md.length;i++)
        {
            if(ship.md[i].open==true&&ship.md[i].id==-1)
            {
                Idx = i;
                break;
            }
        }
        if(Idx==-1) return 0;
        if(checkCost(ship,MdId)==-1)
        {
            printMsg("电力不足：无法装配"+itemData[MdId].name);
            return;
        }
        ship.md[Idx].id = MdId;
        ship.md[Idx].name = itemData[MdId].name;
        if(itemData[MdId].subType==5001)
        {
            ship.check();
        }
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
        if(ship.side==0)
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
        if(ship.side==0)
        {
            return "<font color=blue>"+ship.name+"</font>";
        }
        else
        {
            return "<font color=red>"+ship.name+"</font>";
        }
    }

    ship.fightInit = ()=>
    {
        let wpId = 0;
        for(let i=0; i<ship.wp.length;i++)
        {
            wpId = ship.wp[i].id;
            if(wpId>=0)
            {
                ship.wp[i].ft = itemData[wpId].start;
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
            if(ship.structure<=0)
            {
                ship.structure = 0;
                if(ship.side==0)
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
        let tip = false;
        let ran;
        for(let wp of ship.wp)
        {
            if(wp.id>=0&&t>=wp.ft)
            {
                wp.ft = t + itemData[wp.id].speed;
                if(!tip)
                {
                    addFightMsg(ship.brcName()+"发动攻击");
                    tip = true;
                }
                addFightMsg(ship.brcName() + "的"+wp.posName+"[<font color=#6B8E23>"+wp.name  +"</font>]对"+enmy.brcName()+"发动攻击");

                ran = Math.random() * 100;
                //addFightMsg("ran="+ran+",aim="+wp.aim());
                if(ran > wp.aim())
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
        if(ship.wp[pos].id!=-1)
        {
            return;
        }
        ship.wp[pos].id = id;
        ship.wp[pos].name = itemData[id].name;
    }

    ship.unload = (t,idx)=>
    {
        let pos = idx-1;
        let id = ship[t][pos].id;
        ship[t][pos].id = -1;
        ship[t][pos].name = "空";
        ship.addItem(id,1);
        if(t=='md')
        {
            if(itemData[id].subType==5001)
            {
                ship.check();
            }
        }
    }

    ship.changeName = (str)=>
    {
        this.name = str;
    }

    initShipAry(ship);
    ship.check();

    return ship;
}

function initShipAry(ship)
{

    //初始化武器
    for(let i=0; i<ship.wp.length;i++)
    {
        ship.wp[i] = {
            posName:"武器"+(i+1),
            idx:i+1,
            id:-1,
            name:"空",
            staff:-1,
            aimAdd:0,
            open:false,
        };
        if(i<ship.wpOpen)
        {
            ship.wp[i].open = true;
        }
        ship.wp[i].aim=()=>
        {
            let self = ship.wp[i];
            let id = self.id;
            if(id==-1) return 0;
            return self.aimAdd + itemData[id].aim;
        }
        ship.wp[i].check=()=>
        {
            let self = ship.wp[i];
            let staffId = self.staff;
            if(staffId==-1)
            {
                self.aimAdd=0;
            }
            else
            {
                self.aimAdd = STAFF_ADD_TO_AIM;
            }
        }
    }

    for(let i=0; i<ship.md.length;i++)
    {
        ship.md[i] = {
            idx:i+1,
            id:-1,
            name:"空",
            open:false,
        };
        if(i<ship.mdOpen)
        {
            ship.md[i].open=true;
        }
    }
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

    printFtMsg01(playerData.ship,enmy);

    var t = 0; 
    let dmg = 0;

    playerData.ship.fightInit();
    enmy.fightInit();

    while((playerData.ship.structure>0)&&(enmy.structure>0))
    {
        if(t>=60000)
        {
            addFightMsg("战斗时间过长，胜负未分，双方已离开战场");
            printMsg("胜负未分，双方离开战场");
            return;
        }

        if(playerData.ship.atkEnmy(t,enmy)==1 || enmy.atkEnmy(t,playerData.ship)==1)
        {
            return;
        }
        t += 200;//每次步进200毫秒
    }
    addFightMsg("");
}

function printFtMsg01(plyShip,enmy)
{
    printMsg(printTimeC()+"你的"+plyShip.brcName()+"与"+enmy.brcName()+"发生了战斗");
    addFightMsg("");
    addFightMsg(timeStr()+"，你的"+plyShip.brcName()+"与"+enmy.brcName()+"发生了战斗");
    addFightMsg("-------------------------------");
    printShip(plyShip);
    printShip(enmy);
    addFightMsg("-------------------------------");
    //打印武器信息
}

function printShip(ship)
{
    let cap = ship.cap;
    let staffName = "";
    addFightMsg("<b>"+ship.colorName()+"</b>：[结构："+ship.structure+",护盾："+ship.shield+"]");
    if(cap!=-1)
    {
        addFightMsg("&emsp;&emsp;舰长:"+cap.name);
    }
    else
    {
        addFightMsg("&emsp;&emsp;这艘飞船没有舰长，处于自动状态");
    }

    for(let i=0; i<ship.wp.length;i++)
    {
        staffName = "";
        if(ship.wp[i].open==true&&ship.wp[i].id!=-1)
        {
            let staffIdx = ship.wp[i].staff;
            if(staffIdx!=-1)
            {
                staffName = "（"+cap.staff[staffIdx].name+"）";
            }
            addFightMsg("&emsp;&emsp;"+ship.wp[i].posName+":"+ship.wp[i].name+staffName);
        }
    }

    for(let i=0; i<ship.md.length;i++)
    {
        if(ship.md[i].open==true&&ship.md[i].id!=-1)
        {
            addFightMsg("&emsp;&emsp;模块"+ship.md[i].idx+":"+ship.md[i].name);
        }
    }
}

function checkCost(ship,itemId)
{
    let cLeft = ship.cost - ship.curCost();
    console.log("itemId="+itemId);
    if(cLeft<itemData[itemId].cost)
    {
        return -1;
    }
    return 0;
}