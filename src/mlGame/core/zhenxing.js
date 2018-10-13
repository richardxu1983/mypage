import RO from '../../mlGame/core/role.js'
import FT from '../../mlGame/core/fight.js'
var $fight = FT.Fight;
var $ply = RO.role;

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
			return;
		}
		$fight.start({left:[zhenxing[0].u,zhenxing[1].u,zhenxing[2].u],right:enemy,plySide:1},callback);
	}
}

export default {zhenxing,zxCtrl};