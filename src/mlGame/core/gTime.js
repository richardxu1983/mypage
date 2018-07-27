
const MAX_HOUR = 24;

var gT = {
	day:600,
	hour:8,
}

var gtime = {

	init:function()
	{
		gT.day = 1;
		gT.hour = 8;
		gtime.set();
	},

	addHour:function(v)
	{
		gT.hour = gT.hour + v;
		var add = Math.floor(gT.hour/MAX_HOUR);
		if(add>0)
		{
			gT.hour = gT.hour%MAX_HOUR;
			gT.day = gT.day + add;
		}
		gtime.set();
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

	reSet:function()
	{
		gtime.init();
	},

	set:function()
	{
		localStorage.gameTime = JSON.stringify(gT);
	},
}

export default { gtime,gT}; 