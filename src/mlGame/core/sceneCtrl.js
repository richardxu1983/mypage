
import sdt from '../../mlGame/data/scene.js'
var scene = {

    to:function(n)
    {
        sdt.dt.cnt = n;
        scene.refresh();
    },

    new:function()
    {
    	sdt.dt.cnt = 0;
    	scene.refresh();
    },

    init:function()
    {
    	sdt.dt.cnt = 0;
    	scene.refresh();
    },

    refresh:function()
    {
        var index = sdt.dt.cnt;
        var maxIndex = sdt.dt.tab.length;
        var e;
        for(var i=0;i<maxIndex;i++)
        {
            if(i!=index)
            {
                e=document.getElementById("nav_"+i);
                e.style.backgroundColor="#8B8B7A";
                e.style.color="white";
                e.style.borderStyle="outset";
            }
        }
        var element=document.getElementById("nav_"+index);
		element.style.backgroundColor="#F5F5DC";
		element.style.color="black";
		element.style.borderStyle="ridge";
    },
}

export default { scene }; 