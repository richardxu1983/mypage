
var State = {};

var StateManager = {

    MAX_STORE: 99999999999999,

    //create all parents and then set state
    createState: function(stateName, value) {
        var words = stateName.split(/[.\[\]'"]+/);
        //for some reason there are sometimes empty strings
        for (var i = 0; i < words.length; i++) {
            if (words[i] == '') {
                words.splice(i, 1);
                i--;
            }
        }
        var obj = State;
        var w = null;
        for(var i=0, len=words.length-1;i<len;i++){
            w = words[i];
            if(obj[w] === undefined ) obj[w] = {};
            obj = obj[w];
        }
        obj[words[i]] = value;
        return obj;
    },

    //set single state
    //if noEvent is true, the update event won't trigger, useful for setting multiple states first
    set: function(stateName, value, noEvent) {

        var fullPath = $SM.buildPath(stateName);
        try{
            eval('('+fullPath+') = value');
        } catch (e) {
            //parent doesn't exist, so make parent
            $SM.createState(stateName, value);
        }

        StateManager.save();
    },

    setArray:function(k,id)
    {
        var j,len;
        if(State[k]==undefined)
            State[k]=[];
        State[k].push(id);
        Engine.saveGame();
    },

    //return state, undefined or 0
    get: function(stateName, requestZero) {
        var whichState = null;
        var fullPath = $SM.buildPath(stateName);

        //catch errors if parent of state doesn't exist
        try{
            eval('whichState = ('+fullPath+')');
        } catch (e) {
            whichState = undefined;
        }

        //prevents repeated if undefined, null, false or {}, then x = 0 situations
        if((!whichState || whichState == {}) && requestZero) return 0;
        else return whichState;
    },

    buildPath: function(input){
        var dot = (input.charAt(0) == '[')? '' : '.'; //if it starts with [foo] no dot to join
        return 'State' + dot + input;
    },

    load:function()
    {
        try 
        {
            var savedState = JSON.parse(localStorage.gameState);
            if(savedState) 
            {
                State = savedState;
            }
        } 
        catch(e) 
        {
            State = {};
        }
    },

    save: function() 
    {
        if(typeof Storage != 'undefined' && localStorage) 
        {
            if(Engine._saveTimer != null) {
                clearTimeout(Engine._saveTimer);
            }
            if(typeof Engine._lastNotify == 'undefined' || Date.now() - Engine._lastNotify > Engine.SAVE_DISPLAY){
                Engine._lastNotify = Date.now();
            }
            localStorage.gameState = JSON.stringify(State);
        }
    },

    new:function()
    {
        State = {};
        localStorage.clear();
    }
};


var $SM = StateManager;

var Engine = 
{
    ready:false,
    gameInit:function()
    {
        Engine.load();
    },

    load:function()
    {
        $SM.load();
    },

    new:function()
    {
        $SM.new();
    }
};

var info={
    txt:{
        v:"",
        last:"",
    },
    addInfo:function(v)
    {
        //info.txt.v=info.txt.v+v+"\n";
       // info.txt.last = v;
        var element=document.getElementById("info");
        if(!element.hasChildNodes())
        {
            var para=document.createElement("label");
            element.appendChild(para);
            var oDivText = document.createTextNode(v);//创建一个文本节点内容是“666”，因为是document对象的方法。  
            para.appendChild(oDivText);//父级.appendChild(子节点);在div元素中添加“666” 
            para.style.opacity = 1; 
            para.style.transition="opacity 1s";
            para.addEventListener('webkitTransitionEnd', function(){
                    document.getElementById("info").removeChild(para);
                });
            setTimeout(()=>{
                para.style.opacity = 0 ;
            } , 1000);
        }
        //if(info.txt.v.length>1000)
        //{
        //    info.txt.v.slice(-500);
        //}
    }
};

export default { Engine , StateManager , info,State }; 