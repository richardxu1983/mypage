
/*
tg（触发）类型：
1.开始战斗时触发（单次）
2.普攻时触发
3.移动时触发
4.随时触发
5.对方普攻后触发
6.成功防御后触发
7.动作后触发
 */

/*
st（状态）类型
1.倒地
 */

/*
nd（武器）类型：
0:无需求
1：近战武器
2：远程武器
 */

/*
wp（武器）类型：
 */

/*
ac（动作）类型：
0：扑倒
1：后跳
2：推开
3：躲闪
4：重击
5：瞬移靠近
6:快速攻击
7：格挡
8：连击
9：快速移动
10：增强自身
 */

var AC = [
{id:0,	name:"扑倒",		str:""},
{id:1,	name:"后跳",		str:"向后跳走"},
{id:2,	name:"推开",		str:""},
{id:3,	name:"躲闪",		str:"躲过了这次攻击"},
{id:4,	name:"重击",		str:"产生了重击效果!!"},
{id:5,	name:"瞬移靠近",		str:"迅速靠近"},
{id:6,	name:"快速攻击",		str:"发动了一次快速攻击"},
];

var SKL = [
{id:0,	name:"闪避",		tg:5,	ac:3,	cd:3,	fc:75,	chance:10,	nd:0,	wp:0,	oac:-1,	dt1:0,	dt2:0},
{id:1,	name:"后跳",		tg:4,	ac:1,	cd:16,	fc:100,	chance:100,	nd:2,	wp:0,	oac:-1,	dt1:8,	dt2:15},
{id:2,	name:"瞬步",		tg:4,	ac:5,	cd:16,	fc:80,	chance:10,	nd:1,	wp:0,	oac:-1,	dt1:15,	dt2:2},
{id:3,	name:"重击",		tg:2,	ac:4,	cd:3,	fc:80,	chance:30,	nd:0,	wp:0,	oac:-1,	dt1:2,	dt2:0},
{id:4,	name:"快速攻击",		tg:7,	ac:6,	cd:3,	fc:100,	chance:100,	nd:0,	wp:0,	oac:1,	dt1:1,	dt2:0},
];

export default { SKL,AC}; 