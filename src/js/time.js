

var time = {
    dCount:1,
    day:1,
    hour:0,
    week:1,
}
const MAX_DAY = 5;
var MAX_HOUR = 24;
var lastTime = "";

function timeInit()
{
    time.dCount = 1;
    time.day = 1;
    time.hour = 0;
    time.week = 1;
}

function timeStr()
{
    return "第"+time.week+"周，第"+time.day+"天";
}

function timeStrDay()
{
    return "第"+time.week+"周，第"+time.day+"天";
}

function printTimeC()
{
    let ts = timeStrDay();
    if(ts!=lastTime)
    {
        if(lastTime!="")
        {
            printMsg("");
        }
        lastTime = ts;
        printMsg(ts);
    }
    return "";
}

function addHour(step)
{
    time.hour+=step;
    if(time.hour>=MAX_HOUR)
    {
        time.hour-=MAX_HOUR;
        time.day++;
        time.dCount++;
        playerData.ship.recShield();
        checkSalary(playerData);
        stgStep();
        if(time.day>MAX_DAY)
        {
            time.week++;
            time.day = 1;
        }
    }
}