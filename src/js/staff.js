
const MAX_STAFF = 32;

//初始化船员数据
function initStaff(cap,num)
{
    cap.maxStaff = num;
    cap.staffNum = 0;

    if(num<=0) return;
    cap.staff = new Array(num);   //可拥有的最大船员数

    for(let i=0;i<num;i++)
    {
        cap.staff[i] = {};
        cap.staff[i].idx = i;
        cap.staff[i].id = -1;
        cap.staff[i].name = "";
        cap.staff[i].type = -1;
        cap.staff[i].potential = -1;
        cap.staff[i].at = -1;
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
    cap.staff[idx].id = data.id;
    cap.staff[idx].name = data.name;
    cap.staff[idx].type = data.type;
}