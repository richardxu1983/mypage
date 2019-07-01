
var day = 1;
var hour = 0;
var hourStr = ["早晨","上午","下午","晚上","半夜"];
var lastTime = "";

function timeStr()
{
    return "第"+day+"天"+hourStr[hour];
}

function printTime()
{
    let timeStr = "第"+day+"天"+hourStr[hour];
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
    let timeStr = "第"+day+"天"+hourStr[hour];
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

function addHour()
{
    var step=2;
    hour+=step;
    if(hour>=5)
    {
        hour-=5;
        day++;
        playerData.ship.recShield();
    }
}