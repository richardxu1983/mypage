var app = new Vue({
    el: '#app',
    data: {
        playerShip: playerData.ship,
        player:playerData,
        shipInfo:false,
        staffInfo:false,
        shipTip:false,
        wpTip:false,
        wpTipIdx:-1,
        rightSel:1,
        msg:infoMsg,
        ftMsg:fightMsg,
        dayTime:day,
        hr:hour,
    },
    updated:function(){
        this.scrollToBottom();
    },
    computed:
    {
        wpTipDmg(){
            return itemData[this.getTipWpId()].atk;
        },
        wpTipSpeed()
        {
            return itemData[this.getTipWpId()].speed;
        },
        wpTipIT()
        {
            return itemData[this.getTipWpId()].start;
        },
        wpAim()
        {
            return itemData[this.getTipWpId()].aim;
        }
    },
    methods: {
        getTipWpId(){
            return this.playerShip.weapon[this.wpTipIdx-1].id;
        },
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
        onmouseover(str,$event,idx)
        {
            let dom = $event.target;
            let rect = dom.getBoundingClientRect();
            let left = 0;
            let top = rect.top+rect.height/2;
            //console.log(dom);
            if(str=="ship")
            {
                left = rect.left+30;
                this.shipTip=true;
                $("#shipTip").css({'left':left+"px",'top':top+"px"});
            }
            else if(str=="wp")
            {
                this.wpTipIdx = idx;
                left = rect.left+10;
                this.wpTip=true;
                $("#wpTip").css({'left':left+"px",'top':top+"px"});
            }
            
        },
        testAddStaff()
        {
            addStaff(this.player,{id:1,name:"Mary",type:1});
        },
        onmouseleave(str,$event)
        {
            //printMsg("mouseLeave");
            if(str=="ship")
            {
                this.shipTip=false;
            }
            else if(str=="wp")
            {
                this.wpTip=false;
            }
        },
        fight(){
            //printMsg("aabb");
            testFight();
        }
    }
})