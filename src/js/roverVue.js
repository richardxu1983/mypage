var app = new Vue({
    el: '#app',
    data: {
        playerShip: playerData.ship,
        player:playerData,
        shipInfo:true,
        staffInfo:true,
        shipTip:false,
        wpTip:false,
        mdTip:false,
        itemTip:false,
        modal:false,
        staffTip:false,
        assignDiv:false,
        midModuleCur:'test',
        midModule:{
            adv:{name:"冒险",open:true},
            test:{name:"测试",open:true},
        },
        wpTipIdx:-1,
        mdTipIdx:-1,
        itemTipIdx:-1,
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
            return this.playerShip.wp[this.wpTipIdx-1].aim();
        }
    },
    methods: {
        getTipWpId(){
            return this.playerShip.wp[this.wpTipIdx-1].id;
        },
        switchMainShipInfo(){
            this.shipInfo = !this.shipInfo;
        },
        unloadWp(pos)
        {
            this.playerShip.unload('wp',pos);
        },
        clickRightMenu(sel)
        {
            this.rightSel = sel;
        },
        tryToLoadWp(idx)
        {
            this.playerShip.tryToLdWpByItemIdx(idx);
        },
        tryToLoadMd(idx)
        {
            this.playerShip.tryToLdMdByItemIdx(idx);
        },
        unloadMd(pos)
        {
            this.playerShip.unload('md',pos);
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
        deAssign(staffIdx)
        {
            this.playerShip.deAssign(staffIdx);
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
        wpBetter(attr,idx)
        {
            let id = this.playerShip.wp[idx-1].id;
            if(attr=='aim')
            {
                return (this.playerShip.wp[idx-1].aim()>itemData[id].aim)?true:false;
            }
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
                left = rect.left+50;
                this.wpTip=true;
                $("#wpTip").css({'left':left+"px",'top':top+"px"});
            }
            else if(str=="md")
            {
                this.mdTipIdx = idx;
                left = rect.left+50;
                this.mdTip=true;
                $("#mdTip").css({'left':left+"px",'top':top+"px"});
            }
            else if(str=="item")
            {
                this.itemTip=true;
                this.itemTipIdx = idx;
                left = rect.left+10;
                $("#itemTip").css({'left':left+"px",'top':top+"px"});
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
        testAddHour()
        {
            addHour();
        },
        testAddwpOpen()
        {
            this.playerShip.OpenAdd('wp',1);
        },
        testAddmdOpen()
        {
            this.playerShip.OpenAdd('md',1);
        },
        minNavClass(key)
        {
            if(key==this.midModuleCur)
            {
                return "underline";
            }
        },
        minNavClick(index)
        {
            this.midModuleCur = index;
        },
        jobDesc(idx)
        {
            let jobType = this.player.staff[idx].jobType;
            let jobIdx = this.player.staff[idx].jobIdx;

            if(jobType=='wp')
            {
                return "操作"+playerData.ship.wp[jobIdx].posName;
            }
        },
        onmouseleave(str,$event)
        {
            this[str+"Tip"] = false;
        },
        fight(){
            //printMsg("aabb");
            testFight();
        }
    }
})