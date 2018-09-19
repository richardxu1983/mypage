
import sdt from '../../mlGame/data/scene.js'
var sData = {};
var scene = {

    to:function(n)
    {
        sdt.dt.cnt = n;
        sData.cnt = sdt.dt.cnt;
        scene.save();
        scene.refresh();
    },

    new:function()
    {
    	sdt.dt.cnt = 0;
        sData.cnt = sdt.dt.cnt;
        scene.save();
    	scene.refresh();
    },

    load:function()
    {
        try
        {
            var sc = JSON.parse(localStorage.scene);
            if(sc)
            {
                sdt.dt.cnt = sc.cnt;
            }
        }
        catch(e)
        {
            sdt.dt.cnt = 0;
        }
        sData.cnt = sdt.dt.cnt;
        scene.save();
    },

    save:function()
    {
        localStorage.scene = JSON.stringify(sData);
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