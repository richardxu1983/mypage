

var time = {
    day:1,
    hour:0,
    week:1,
}
const MAX_DAY = 5;
var hourStr = ["早晨","上午","下午","晚上","半夜"];
var MAX_HOUR = hourStr.length;
var lastTime = "";

function timeStr()
{
    return "第"+time.week+"周，第"+time.day+"天"+hourStr[time.hour];
}

function printTime()
{
    let timeStr = "第"+time.week+"周，第"+time.day+"天"+hourStr[time.hour];
    if(timeStr!=lastTime)
    {
        lastTime = timeStr;
        return timeStr;
    }
    else
    {
        return "";
    }
}

function printTimeC()
{
    let timeStr = "第"+time.week+"周，第"+time.day+"天"+hourStr[time.hour];
    if(timeStr!=lastTime)
    {
        if(lastTime!="")
        {
            printMsg("");
        }
        lastTime = timeStr;
        printMsg(timeStr);
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
        playerData.ship.recShield();
        if(time.day>MAX_DAY)
        {
            time.week++;
            time.day = 1;
            checkSalary(playerData);
        }
    }
}