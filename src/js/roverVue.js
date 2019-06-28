var app = new Vue({
    el: '#app',
    data: {
        playerShip: playerData.ship,
        playerStaff:playerData.staff,
        shipInfo:false,
        staffInfo:false,
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
            this.shipInfo = !this.shipInfo;
        },
        unloadWp(pos)
        {
            this.playerShip.unLoadWpByIdx(playerData.ship,pos);
        },
        clickRightMenu(sel)
        {
            this.rightSel = sel;
        },
        tryToLoadWp(idx)
        {
            this.playerShip.tryToLdWpByItemIdx(idx);
        },
        switchStaffInfo()
        {
            this.staffInfo = !this.staffInfo;
        },
        tryToFix()
        {
            this.playerShip.tryToFix();
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