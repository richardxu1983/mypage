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
            unLoadWpByIdx(playerData.mainShip,pos);
        },
        clickRightMenu(sel)
        {
            this.rightSel = sel;
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