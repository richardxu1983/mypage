var app = new Vue({
    el: '#app',
    data: {
        playerMainShip: playerData.mainShip
    },
    methods: {
        change: function () {
            this.playerMainShip.changeName("new name");
        }
    }
})