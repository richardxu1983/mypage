import RO from '../../mlGame/core/role.js'
import TI from '../../mlGame/core/gTime.js'
import ZX from '../../mlGame/core/zhenxing.js'

var $ti = TI.gtime;
var $ply = RO.role;
var $zxCtrl = ZX.zxCtrl;


const $dft = require('../../mlGame/data/gData.js').default.dft;




var c = {

	start:function()
	{
		const $mapView = require('../../mlGame/view/mapView.js').default.mapView;
		const $mapCtrl = require('../../mlGame/core/map.js').default.mapCtrl;
		
		c.new();

		//创建地图
		$mapCtrl.genMapArea(25,25,15);
		$ply.side($dft.plySide);
		$mapView.setWorldViewCenter(25,25);
		$mapCtrl.capturePosBySide(25,25,$dft.plySide);
		$mapCtrl.setBlockType(25,25,1);
		$mapCtrl.build(25,25,1,1,0);
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
		const $mapView = require('../../mlGame/view/mapView.js').default.mapView;
		$mapView.createEl();
		$mapView.render();
	},
}

export default {c}; 