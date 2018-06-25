
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

        //make sure the value isn't over the engine maximum
        if(typeof value == 'number' && value > $SM.MAX_STORE) value = $SM.MAX_STORE;

        try{
            eval('('+fullPath+') = value');
        } catch (e) {
            //parent doesn't exist, so make parent
            $SM.createState(stateName, value);
        }

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
};
//alias
var $SM = StateManager;

var State = {};

var Engine = 
{
    data:
    {
        newGame:true,
        ready:false
    },

    saveGame: function() 
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

    loadGame: function() 
    {
        try 
        {
            var savedState = JSON.parse(localStorage.gameState);
            if(savedState) 
            {
                State = savedState;
                Engine.newGame = false;
            }
        } 
        catch(e) 
        {
            State = {};
            Engine.newGame = true;
            $SM.set('version', Engine.VERSION);
        }
    },
};