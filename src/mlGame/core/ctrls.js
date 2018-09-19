import ktrl from '../../mlGame/core/kuangchang.js'
import UB from '../../mlGame/core/unit.js'
import TI from '../../mlGame/core/gTime.js'
import SCE from '../../mlGame/core/sceneCtrl.js'
import MX from '../../mlGame/core/maoxianCtrl.js'
var $kctrl = ktrl.kcCtrl;
var $ti = TI.gtime;
var $scene = SCE.scene;
var $ply = UB.Player;
var $maoxian = MX.maoxianCtrl;

var c = {

	start:function()
	{
		c.load();
	},

	new:function()
	{
		$kctrl.new();
		$ti.reSet();
        $ply.load();
        $maoxian.new();
        $scene.new();
	},

	load:function()
	{
        $ti.load();
        $ply.load();
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