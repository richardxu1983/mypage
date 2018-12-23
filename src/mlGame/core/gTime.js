
const MAX_MONTH = 12;
const MAX_DAY = 10;

var gT = 
{
	day:1,
	year:1,
	month:1,
	day:0,
}

let timeThread;

var $prop = require('../../mlGame/core/propCtrl.js').default.propCtrl;

var gtime = {

	init:function()
	{
		gT.day = 1;
		gT.year = 1;
		gT.month = 1;
		gT.day = 0;

		timeThread=window.setInterval(gtime.refresh, 1000);
	},

	refresh:function()
	{
		gT.day++;
		var add = Math.floor(gT.day/MAX_DAY);
		if(add>0)
		{
			gT.day = 0;
			gtime.addMonth(add);
		}
	},

	remain:function()
	{
		return (MAX_DAY-gT.day)/MAX_DAY;
	},

	getTick:function()
	{
		return gT.year*MAX_MONTH + gT.month;
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
		$prop.month();
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