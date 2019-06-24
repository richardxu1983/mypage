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