
const MAX_HOUR = 12;

var gT = {
	year:1,
	month:1,
}

var gtime = {

	init:function()
	{
		gT.year = 1;
		gT.month = 1;
	},

	addMonth:function(v)
	{
		gT.month = gT.month + v;
		var add = Math.floor(gT.month/MAX_HOUR);
		if(add>0)
		{
			gT.month = gT.month%MAX_HOUR;
			gT.year = gT.year + add;
		}
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