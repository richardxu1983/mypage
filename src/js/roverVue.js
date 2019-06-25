var app = new Vue({
    el: '#app',
    data: {
        playerMainShip: playerData.mainShip,
        mainShipInfo:false,
        rightSel:1,
        msg:infoMsg,
        ftMsg:fightMsg,
        dayTime:day,
        hr:hour,
    },
    updated:function(){
        this.scrollToBottom();
    },

    methods: {
        switchMainShipInfo(){
            this.mainShipInfo = !this.mainShipInfo;
        },
        unloadWp(pos)
        {
            this.playerMainShip.unLoadWpByIdx(playerData.mainShip,pos);
        },
        clickRightMenu(sel)
        {
            this.rightSel = sel;
        },
        tryToLoadWp(idx)
        {
            this.playerMainShip.tryToLdWpByItemIdx(idx);
        },
        timeS()
        {
            return timeStr();
        },
        scrollToBottom(){
            this.$nextTick(() => {
               var container = document.getElementById("info");
               container.scrollTop = container.scrollHeight;
        })},
        fight(){
            //printMsg("aabb");
            testFight();
        }
    }
})