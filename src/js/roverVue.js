var app = new Vue({
    el: '#app',
    data: {
        playerShip: playerData.ship,
        player:playerData,
        shipInfo:true,
        staffInfo:true,
        shipTip:false,
        wpTip:false,
        modal:false,
        staffTip:false,
        assignDiv:false,
        wpTipIdx:-1,
        staffTipIdx:-1,
        wpAssignIdx:-1,
        currentJobType:"",
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
        assign(job,idx)
        {
            this.modal = true;
            this.assignDiv=true;
            this.currentJobType = job;
            if(job=='wp')
            {
                this.wpAssignIdx = idx;
            }
        },
        deAssign(job,idx)
        {
            this.playerShip.deAssign(job,idx);
        },
        closeAssign()
        {
            this.modal = false;
            this.assignDiv=false;
        },
        assignStaff(staffIdx)
        {
            if(this.currentJobType=='wp')
            {
                let wpIdx = this.wpAssignIdx;
                if(wpIdx==-1) return;
                this.playerShip.assign(this.currentJobType,wpIdx,staffIdx);
            }
            this.closeAssign();
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
            else if(str=="staff")
            {
                this.staffTip=true;
                this.staffTipIdx = idx;
                left = rect.left+10;
                $("#staffTip").css({'left':left+"px",'top':top+"px"});
            }
        },
        testAddStaff()
        {
            let p = createPerson();
            addStaff(this.player,p);
        },
        jobDesc(idx)
        {
            let jobType = this.player.staff[idx].jobType;
            let jobIdx = this.player.staff[idx].jobIdx;

            if(jobType=='wp')
            {
                return "操作"+playerData.ship.weapon[jobIdx].posName;
            }
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
            else if(str=="staff")
            {
                this.staffTip=false;
            }
        },
        fight(){
            //printMsg("aabb");
            testFight();
        }
    }
})