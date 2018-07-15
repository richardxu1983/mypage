
const MAX_HOUR = 24;

var gtime = {

	day:600,
	hour:8,
	min:0,
	mc:60,
	timer:null,

	init:function()
	{
		gtime.day = 1;
		gtime.hour = 8;
		gtime.min = 0;
	},

	addHour:function(v)
	{
		gtime.hour = gtime.hour + v;
		var add = Math.floor(gtime.hour/MAX_HOUR);
		if(add>0)
		{
			gtime.hour = gtime.hour%MAX_HOUR;
			gtime.day = gtime.day + add;
		}
	}
}

export default { gtime}; 