
const MAX_STAFF = 32;

const SPECIES = [];
SPECIES[0] = "人类";
SPECIES[1] = "智械";

const CAREER = [];
CAREER[0] = "军人";
CAREER[1] = "工程师";

const GENDER = [];
GENDER[0] = "男";
GENDER[1] = "女";

const vowels = "a,a,a,a,a,e,e,e,e,e,e,e,i,i,i,i,i,o,o,o,o,o,u,y,io,io,ei,ei,ee,ee,ea,ea,ey,ei,oa,oo,ou,ou,or,or,ay".split(',');
const commonConsonants = "s,s,s,s,t,t,t,j,j,j,j,n,n,n,n,r,r,l,d,sm,sl,sh,sh,th,ry,ry,ry".split(',');
const averageConsonants = "sh,sh,st,st,b,b,b,c,c,c,f,g,h,k,l,m,p,p,ph,wh".split(',');
const middleConsonants = "x,ss,ss,ch,ch,ck,ck,dd,kn,rt,gh,nd,nd,pp,ps,tt,ry,ry,ff,rr,rk,mp,ll,b,b,c,c,c,f,g,h".split(','); //Can't start
const rareConsonants = "j,j,j,v,v,w,w,w,z,qu,qu".split(',');
const lengthArray = [1,1,1,1,2,2,2,2,3,3, 3, 3, 4, 4];
const allName = [1,1,1,1,1,2, 2, 2,2];
const ageArray = [2,2,2,3,3,3,4,4,5]

//随机英文名字
function randomName()
{
    let current=-1;
    let name = "";
    let length = lengthArray[Math.floor((Math.random()*lengthArray.length))];
    //console.log("length="+length);
    let rnd = 0;
    let con;
    let vow;
    for (let i = 0; i < length; i++)
    {
        rnd = Math.random()*1000;

        if (rnd < 775) current = commonConsonants;
        else if (rnd < 875 && i > 0) current = middleConsonants;
        else if (rnd < 985) current = averageConsonants;
        else current = rareConsonants;
        //console.log("i="+i);
        //console.log(current);
        con = current[Math.floor((Math.random()*current.length))];
        vow = vowels[Math.floor((Math.random()*vowels.length))];
        name += con+vow;
        //console.log("con="+con);
        //console.log("vow="+vow);
        if (name.length > 2 && Math.random()*1000 < 800) break; //Getting long, must roll to save
        if (name.length > 3 && Math.random()*1000 < 950) break; //Really long, roll again to save
        if (name.length > 4) break; //Probably ridiculous, stop building and add ending
        //console.log("name="+name+",length="+name.length);
    }

    rnd = Math.random()*1000;
    if(rnd>250)
    {
        if (rnd < 775) current = commonConsonants;
        else if (rnd < 875) current = middleConsonants;
        else if (rnd < 985) current = averageConsonants;
        else current = rareConsonants;   
        con = current[Math.floor((Math.random()*current.length))];
        name += con;
    }
 
    name = name.slice(0, 1).toUpperCase() + name.slice(1)
    return name;
}

//创造一个人物
function createPerson()
{
    let p = {};
    let name="";
    let an = allName[Math.floor((Math.random()*allName.length))];
    console.log(an);
    for(let i=0;i<an;i++)
    {
        name += randomName();
        if(an>(i+1))
        {
            name += " ";
        }
    }

    let species = Math.floor((Math.random()*SPECIES.length));
    let career = Math.floor((Math.random()*CAREER.length));
    p.gender = Math.floor((Math.random()*GENDER.length));
    p.age = ageArray[Math.floor((Math.random()*ageArray.length))]*10 + Math.floor(Math.random()*10);
    p.name = name;
    p.species = species;
    p.career = career;
    p.id = 1;
    p.type = 1;
    return p;
}

//初始化船员数据
function initStaff(cap,num)
{
    cap.maxStaff = num;
    cap.staffNum = 0;
    cap.validStaff = 0;

    if(num<=0) return;
    cap.staff = new Array(num);   //可拥有的最大船员数

    for(let i=0;i<num;i++)
    {
        cap.staff[i] = {};
        cap.staff[i].idx = i;
        StaffInit(cap,i);
        cap.staff[i].owner = cap;
    }
}

function StaffInit(cap,idx)
{
    cap.staff[idx].id = -1;
    cap.staff[idx].name = "";
    cap.staff[idx].career = -1;
    cap.staff[idx].type = -1;
    cap.staff[idx].species = -1;
    cap.staff[idx].potential = -1;
    cap.staff[idx].jobType = -1;
    cap.staff[idx].jobIdx = -1;
    cap.staff[idx].gender = -1;
    cap.staff[idx].age = -1;
    cap.staff[idx].salary = 100;
}

//添加船员
function addStaff(cap,data)
{
    if(cap.maxStaff<=0||(cap.staffNum>=cap.maxStaff)) return;

    let idx = -1;
    for(let i=0;i<cap.maxStaff;i++)
    {
        if(cap.staff[i].species==-1)
        {
            idx = i;
            break;
        }
    }
    if(idx==-1) return;
    cap.staffNum++;
    cap.validStaff++;
    cap.staff[idx].id = data.id;
    cap.staff[idx].career = data.career;
    cap.staff[idx].name = data.name;
    cap.staff[idx].type = data.type;
    cap.staff[idx].gender = data.gender;
    cap.staff[idx].species = data.species;
    cap.staff[idx].age = data.age;
    printMsg(printTimeC()+data.name+"加入了你的舰队");
}

function AssignJob(cap,job,jobIdx,staffIdx)
{
    let ship = cap.ship;
    if(staffIdx==-1) return -1;
    if(job=="wp")
    {
        if(ship.wp[jobIdx].staff!=-1) return -1;
        ship.wp[jobIdx].staff = staffIdx;
        ship.wp[jobIdx].check();
    }
    cap.validStaff--;
    cap.staff[staffIdx].jobType = job;
    cap.staff[staffIdx].jobIdx = jobIdx;
    return 0;
}

function deAssign(cap,staffIdx)
{
    let ship = cap.ship;
    if(staffIdx==-1) return -1;
    let job = cap.staff[staffIdx].jobType;
    if(job==-1) return -1;
    let jobIdx = cap.staff[staffIdx].jobIdx;
    if(job=='wp')
    {
        ship.wp[jobIdx].staff = -1;
        ship.wp[jobIdx].check();
    }
    cap.staff[staffIdx].jobType = -1;
    cap.staff[staffIdx].jobIdx = -1;
    cap.validStaff++;
    return 0;
}

function staffLeave(cap,idx)
{
    if(cap.staff[idx].species==-1) return;
    let n = cap.staff[idx].name;
    deAssign(cap,idx);
    StaffInit(cap,idx);
    cap.staffNum--;
    cap.validStaff--;
    printMsg(printTimeC()+n+"离开了你的舰队");
}

//计算工资
function checkSalary(cap)
{
    let gold;
    let salary;

    for(let i=0;i<cap.maxStaff;i++)
    {
        if(cap.staff[i].species!=-1)
        {
            salary = cap.staff[i].salary;
            gold = cap.gold;
            if(gold>=salary)
            {
                cap.addGold(-1*salary);
                printMsg(printTimeC()+"你支付了"+cap.staff[i].name+"薪水"+salary+"星际币");
            }
            else
            {
                printMsg(printTimeC()+"你无法支付"+cap.staff[i].name+"的薪水");
                staffLeave(cap,i)
            }
        }
    }    
}