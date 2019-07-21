// 这种复杂的补间动画逻辑可以被复用
// 任何整数都可以执行动画
// 组件化使我们的界面十分清晰
// 可以支持更多更复杂的动态过渡
// 策略。
Vue.component('animated-integer', {
    template: '<span>{{ tweeningValue }}</span>',
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    data: function () {
      return {
        tweeningValue: 0
      }
    },
    watch: {
      value: function (newValue, oldValue) {
        this.tween(oldValue, newValue)
      }
    },
    mounted: function () {
      this.tween(0, this.value)
    },
    methods: {
      tween: function (startValue, endValue) {
        var vm = this
        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
  
        new TWEEN.Tween({ tweeningValue: startValue })
          .to({ tweeningValue: endValue }, 500)
          .onUpdate(function () {
            vm.tweeningValue = this.tweeningValue.toFixed(0)
          })
          .start()
  
        animate()
      }
    }
  })
  






var app = new Vue({
    el: '#app',
    data: {
        playerShip: {},
        player:-1,
        plyStore:[],
        shipInfo:true,
        staffInfo:true,
        shipTip:false,
        wpTip:false,
        mdTip:false,
        itemTip:false,
        modal:false,
        staffTip:false,
        assignDiv:false,
        stg:stage,
        midModuleCur:'adv',
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
        stfTp:-1,
        rightSel:1,
        msg:infoMsg,
        ftMsg:fightMsg,
        t:time,
    },
    updated:function(){
        this.scrollToBottom();
    },
    mounted:function()
    {
        this.$nextTick(function () {
            // Code that will run only after the
            // entire view has been re-rendered
            gameInit();
          })
        /**
        setTimeout(() => {
            gameInit();
        }, 500);
         */

    },
    computed:
    {
        wpTipDmg(){
            return this.playerShip.wp[this.wpTipIdx].atk();
        },
        wpTipSpeed()
        {
            return WP_DATA[wpIdbyItem(this.getTipWpId())].spd;
        },
        wpTipIT()
        {
            return WP_DATA[wpIdbyItem(this.getTipWpId())].start;
        },
        wpAim()
        {
            return this.playerShip.wp[this.wpTipIdx].aim();
        },
        timeS()
        {
            return timeStr();
        },
    },
    methods: {
        getTipWpId(){
            return this.playerShip.wp[this.wpTipIdx].id;
        },
        testAddLv()
        {
            this.player.addGold(100);
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
        assign(job,idx,p)
        {
            this.modal = true;
            this.assignDiv=true;
            this.currentJobType = job;
            this.wpAssignIdx = idx;
            this.stfTp = p;
        },
        deAssign(staffIdx)
        {
            if(deAssign(this.player,staffIdx)==0)
            {
                printMsg(printTimeC()+"你取消了"+ship.cap.staff[staffIdx].name+"的指派");
            }
        },
        closeAssign()
        {
            this.modal = false;
            this.assignDiv=false;
            this.wpAssignIdx = -1;
        },
        assignStaff(staffIdx)
        {
            let idx = this.wpAssignIdx;
            if(idx==-1) return;
            if(AssignJob(this.player,this.currentJobType,idx,staffIdx)==0)
            {
                if(this.playerShip[this.currentJobType][idx].id>=0)
                {
                    printMsg(printTimeC()+"你安排"+this.player.staff[staffIdx].name+"操作"+this.playerShip[this.currentJobType][idx].name);
                }
                else
                {
                    printMsg(printTimeC()+"你安排"+this.player.staff[staffIdx].name+"操作"+this.playerShip[this.currentJobType][idx].posName);
                }
            }
            this.closeAssign();
        },
        wpBetter(attr,idx)
        {
            let id = this.playerShip.wp[idx].id;
            let wpId = wpIdbyItem(id);
            if(attr=='aim')
            {
                return (this.playerShip.wp[idx].aim()>WP_DATA[wpId].aim)?true:false;
            }
            else if(attr=='atk')
            {
                return (this.playerShip.wp[idx].atk()>WP_DATA[wpId].atk)?true:false;
            }
            return false;
        },
        shipBetter(attr,w)
        {
            let id = this.playerShip.id;
            if(w==1)
                return (this.playerShip[attr]>SHIP_DATA[id][attr])?true:false;
            else
                return (this.playerShip[attr]<SHIP_DATA[id][attr])?true:false;
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
            let p = RanPerson();
            addStaff(this.player,p);
        },
        testAddHour()
        {
            addHour(MAX_HOUR);
        },
        testAddwpOpen()
        {
            this.playerShip.OpenAdd('wp',1);
        },
        testAddmdOpen()
        {
            //this.playerShip.OpenAdd('md',1);
            playerData.ship.addItem(1,10);
        },
        minNavClass(key)
        {
            if(key==this.midModuleCur)
            {
                return "underline";
            }
        },
        assignTip(p)
        {
            return "指派一位["+CAREER[p]+"]来操作";
        },
        minNavClick(index)
        {
            this.midModuleCur = index;
        },
        doStg(idx)
        {
            onStgCard(idx);
        },
        jobDesc(idx)
        {
            let jobType = this.player.staff[idx].jobType;
            let jobIdx = this.player.staff[idx].jobIdx;
            return "操作"+playerData.ship[jobType][jobIdx].posName+"："+playerData.ship[jobType][jobIdx].name;
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