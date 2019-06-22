var app = new Vue({
    el: '#app',
    data: {
        playerMainShip: playerData.mainShip,
        mainShipInfo:false,
    },
    methods: {
        switchMainShipInfo: function () {
            this.mainShipInfo = !this.mainShipInfo;
        },
        unloadWp:function(pos)
        {
            unLoadWpByIdx(playerData.mainShip,pos);
        },
        fight:function()
        {

        }
    }
})