
const MAX_STAFF = 32;

//初始化船员数据
function initStaff(cap)
{
    playerData.staff = new Array(MAX_STAFF);   //可拥有的最大船员数

    for(let i=0;i<MAX_STAFF;i++)
    {
        cap.staff[i] = {};
        cap.staff[i].idx = i;
        cap.staff[i].id = -1;
        cap.staff[i].name = "";
        cap.staff[i].type = -1;
        cap.staff[i].at = -1;
        cap.staff[i].owner = cap;
    }
}

//初始化舰长数据
function initCaptainData(cap,data)
{
    initStaff(cap);
    playerData.name = data.name;
    playerData.type = data.type;
    playerData.side = 0;
}

//添加船员
function addStaff(cap,data)
{
    
}