
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

const vowels = "a,a,a,a,a,e,e,e,e,e,e,e,i,i,i,i,i,o,o,o,o,o,u,y,an,an,an,on,on,io,io,ei,ei,ee,ee,ea,ea,ey,ei,oa,oo,ou,ou,ay".split(',');
const commonConsonants = "s,s,s,s,t,t,t,j,j,j,j,n,n,n,r,r,l,d,sm,sl,sh,sh,th,th,th".split(',');
const averageConsonants = "sh,sh,st,st,b,c,f,g,h,k,l,m,p,p,ph,wh".split(',');
const middleConsonants = "x,ss,ss,ch,ch,ck,ck,dd,kn,rt,gh,mm,nd,nd,nn,pp,ps,tt,ff,rr,rk,mp,ll".split(','); //Can't start
const rareConsonants = "j,j,j,v,v,w,w,w,z,qu,qu".split(',');
const lengthArray = [1,1,1,1,2,2,2,2,3,3, 3, 3, 4, 4];
const allName = [1,1,1,2, 2, 2,2];
const ageArray = [2,2,2,3,3,3,4,4,5]

//随机英文名字
function randomName()
{
    let current=-1;
    let name = "";
    let length = lengthArray[Math.floor((Math.random()*lengthArray.length))];
    console.log("length="+length);
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
        console.log("con="+con);
        console.log("vow="+vow);
        if (name.length > 3 && Math.random()*1000 < 800) break; //Getting long, must roll to save
        if (name.length > 4 && Math.random()*1000 < 950) break; //Really long, roll again to save
        if (name.length > 5) break; //Probably ridiculous, stop building and add ending
        console.log("name="+name+",length="+name.length);
    }
    name = name.slice(0, 1).toUpperCase() + name.slice(1)
    return name;
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
        cap.staff[i].id = -1;
        cap.staff[i].name = "";
        cap.staff[i].career = -1;
        cap.staff[i].type = -1;
        cap.staff[i].species = -1;
        cap.staff[i].potential = -1;
        cap.staff[i].jobType = -1;
        cap.staff[i].jobIdx = -1;
        cap.staff[i].gender = -1;
        cap.staff[i].age = -1;
        cap.staff[i].owner = cap;
    }
}

//初始化舰长数据
function initCaptain(cap,data)
{
    cap.name = data.name;
    cap.type = data.type;
    cap.side = 0;
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
        if(an>i)
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

//添加船员
function addStaff(cap,data)
{
    if(cap.maxStaff<=0||(cap.staffNum>=cap.maxStaff)) return;

    let idx = -1;
    for(let i=0;i<cap.maxStaff;i++)
    {
        if(cap.staff[i].type==-1)
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