import ktrl from '../../mlGame/core/kuangchang.js'
import UB from '../../mlGame/core/unit.js'
import TI from '../../mlGame/core/gTime.js'
import SCE from '../../mlGame/core/sceneCtrl.js'
import MX from '../../mlGame/core/maoxianCtrl.js'
import ZXModule from '../../mlGame/core/zhenxing.js'
var $kctrl = ktrl.kcCtrl;
var $ti = TI.gtime;
var $scene = SCE.scene;
var $ply = UB.Player;
var $maoxian = MX.maoxianCtrl;
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
        $maoxian.new();
        $scene.new();
        $zxCtrl.new();
	},

	load:function()
	{
		console.log("load");
        $ti.load();
        $ply.load();
        $zxCtrl.load();
        $maoxian.load();
        $scene.load();
        $kctrl.load();
	},

	refresh:function()
	{
		$scene.refresh();
		$maoxian.refresh();
	},
}

export default { c}; 