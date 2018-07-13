

var time = {

	day:600,
	hour:8,
	min:0,
	mc:60,
	timer:null,

	init:function()
	{
		time.day = 600;
		time.hour = 8;
		time.min = 0;
	},

	start:function()
	{
		time.timer = setInterval(time.step,1000);
	},

	step:function()
	{
		time.min++;
		if(time.min>=1)
		{
			time.min=0;
			time.hour++;
			if(time.hour>=24)
			{
				time.hour=0;
				time.day--;
				if(time.day<=0)
				{
					time.day=0;
					time.stop();
				}
			}
		}
		$SM.set('time.'+min , time.min);
		$SM.set('time.'+hour , time.hour);
		$SM.set('time.'+day , time.day);
	},

	stop:function()
	{
		clearInterval(time.timer);
	}
}