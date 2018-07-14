
const MAX_HOUR = 24;

var time = {

	day:600,
	hour:8,
	min:0,
	mc:60,
	timer:null,

	init:function()
	{
		time.day = 1;
		time.hour = 8;
		time.min = 0;
	},

	addHour:function(v)
	{
		time.hour = time.hour + v;
		var add = Math.floor(time.hour/MAX_HOUR);
		if(add>0)
		{
			time.hour = time.hour%MAX_HOUR;
			time.day = time.day + add;
		}
	}
}