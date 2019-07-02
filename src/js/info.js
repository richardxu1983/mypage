
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
    if(array.length>=500)
    {
        array.splice(0,250);
    }
}