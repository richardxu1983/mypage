
const MAX_MONTH = 12;

var gT = 
{
	day:1,
	year:1,
	month:1,
}

const MAX_DAY = 31;
const $ply = require('../../mlGame/core/role.js').default.role;
var $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;

var gtime = {

	init:function()
	{
		gT.day = 1;
		gT.year = 1;
		gT.month = 1;
	},

	remain:function()
	{
		return (MAX_DAY-gT.day);
	},

	act:function(v)
	{
		if(gT.day+v>MAX_DAY)
			return false;

		gT.day += v;
		return true;
	},

	addMonth:function(v)
	{
		
		gT.month = gT.month + v;
		var add = Math.floor(gT.month/MAX_MONTH);
		if(add>0)
		{
			gT.month = 1;
			gT.year = gT.year + 1;
		}
		gT.day = 1;
		$prop.month();
		$ply.onMonthStep();
	},

	load:function()
	{
		try
	    {
	        var gameTime = JSON.parse(localStorage.gameTime);
	        if(gameTime) 
	        {
	            gT.day = gameTime.day;
	            gT.hour = gameTime.hour;
	        }
        } 
        catch(e) 
        {
        	gtime.init();
        }
	},

	new:function()
	{
		gtime.init();
	},

	save:function()
	{
		localStorage.gameTime = JSON.stringify(gT);
	},
}

export default { gtime,gT}; 