import UB from '../../mlGame/core/unit.js'
import FT from '../../mlGame/core/fight.js'
import EB from '../../mlGame/core/engine.js'
var $addinfo = EB.info.addInfo;
var $fight = FT.Fight;
var $ply = UB.Player;

//玩家阵型数据
var zhenxing = [
{u:0,ply:false,},
{u:0,ply:false,},
{u:0,ply:false,},
];

var zxCtrl = {

	new:function()
	{
		zhenxing[0].u = $ply;
		zhenxing[0].ply = true;
	},

	load:function()
	{
		try 
        {
			var k = JSON.parse(localStorage.zhenxing);
			if(k)
			{
				for(var i=0;i<zhenxing.length;i++)
				{
					zhenxing[i].u = k[i].u;
					zhenxing[i].ply = k[i].ply;
				}
			}
		}
		catch(e)
		{
			zxCtrl.new();
		}
	},

	save:function()
	{
		localStorage.zhenxing = JSON.stringify(zhenxing);
	},

	fight:function(enemy,callback)
	{
		if($ply.hp()<=0)
		{
			$addinfo("你已经挂了，无法出战");
			return;
		}
		$fight.start([zhenxing[0].u,zhenxing[1].u,zhenxing[2].u],enemy,callback);
	}
}

export default {zhenxing,zxCtrl};