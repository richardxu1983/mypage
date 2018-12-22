import RO from '../../mlGame/core/role.js'
import TI from '../../mlGame/core/gTime.js'
import ZX from '../../mlGame/core/zhenxing.js'
import MAP from '../../mlGame/core/gameMap.js'
var $ti = TI.gtime;
var $ply = RO.role;
var $zxCtrl = ZX.zxCtrl;
var $map = MAP.mapCtrl;

const $dft = require('../../mlGame/data/gData.js').default.dft;
const $cons = require('../../mlGame/core/consCtrl.js').default.conCtrl;

var c = {

	start:function()
	{
		c.new();

		//创建地图
		$map.genMapArea(25,25,15);
		$ply.side($dft.plySide);
		$map.setWorldViewCenter(25,25);
		$map.capturePosBySide(25,25,$dft.plySide);
		$map.build(25,25,1,1,0);
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

	mounted:function()
	{
		$map.createEl();
		$map.render();
	},
}

export default {c}; 