

/*
武器类型：
1：匕首
2：弓箭
 */

const wpType = ["无","匕首","弓箭"];
const wpL = ["无","把","把"];
const wpQ = ["劣质的","普通的","精致的"];

function Weapon(id)
{
    this.id = id;
}

export default { Weapon,wpType,wpL,wpQ }; 