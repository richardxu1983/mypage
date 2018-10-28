import ktrl from '../../mlGame/core/kuangchang.js'
import RO from '../../mlGame/core/role.js'
import TI from '../../mlGame/core/gTime.js'
import SCE from '../../mlGame/core/sceneCtrl.js'
import ZXModule from '../../mlGame/core/zhenxing.js'
var $kctrl = ktrl.kcCtrl;
var $ti = TI.gtime;
var $scene = SCE.scene;
var $ply = RO.role;
var $zxCtrl = ZXModule.zxCtrl;

var c = {

	start:function()
	{
		c.load();
	},

	new:function()
	{
		$kctrl.new();
		$ti.reSet();
        $ply.new();
        $scene.new();
        $zxCtrl.new();
	},

	load:function()
	{
        $ti.load();
        $ply.load();
        $zxCtrl.load();
        $scene.load();
        $kctrl.load();
	},

	refresh:function()
	{
		$scene.refresh();
	},
}

export default { c}; 