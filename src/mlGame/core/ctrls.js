import ktrl from '../../mlGame/core/kuangchang.js'
import UB from '../../mlGame/core/unit.js'
import TI from '../../mlGame/core/gTime.js'
import SCE from '../../mlGame/core/sceneCtrl.js'
var $kctrl = ktrl.kcCtrl;
var $ti = TI.gtime;
var $scene = SCE.scene;
var $ply = UB.Player;

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
        $scene.new();
	},

	load:function()
	{
        $ti.load();
        $ply.load();
        $scene.load();
        $kctrl.load();
	},
}

export default { c}; 