
import kk from '../../mlGame/data/kuangchang.js'
var $kc = kk.kc;

var kcCtrl = {

	at:function()
	{
		return $kc.at;
	},

	maxlvl:function()
	{
		return $kc.lvls.length;
	},

}

export default {kcCtrl};