import RO from '../../mlGame/core/role.js'
import TI from '../../mlGame/core/gTime.js'
import ZX from '../../mlGame/core/zhenxing.js'
import MAP from '../../mlGame/core/gameMap.js'
var $ti = TI.gtime;
var $ply = RO.role;
var $zxCtrl = ZX.zxCtrl;
var $map = MAP.mapCtrl;

var c = {

	start:function()
	{
		c.new();
		$map.genNew();
		$ply.setPos(25,25);
	},

	new:function()
	{
		$ti.new();
        $ply.new();
        $zxCtrl.new();
	},

	load:function()
	{
        $ti.load();
        $ply.load();
        $zxCtrl.load();
	},

	refresh:function()
	{

	},
}

export default {c}; 