import Global from "global"
import Common from "common"
import Storage from "storage"
import achievements from "achievementEntry"

cc.Class({
    extends: cc.Component,

    properties: {
      achievementScroll: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    passPrerequest(entry){
      return !entry.prerequests || (entry.prerequests && Common.all(entry.prerequests,function(request){
        return Storage.rewardTaken[request];
      },this) )
    },
    passUnlock(entry){
      return !entry.needUnlocks || (entry.needUnlocks && Common.all(entry.needUnlocks,function(unlock){
        return Storage.unlocked[unlock];
      },this) )
    },
    passSeen(entry){
      return !entry.needSeen || (entry.needSeen && Common.all(entry.needSeen,function(obj){
        return Storage.progress.seen[obj];
      },this) )
    },
    start () {
      cc.log("Storage.rewardTaken")
      cc.log(Storage.rewardTaken)
      cc.log("Storage.statistics")
      cc.log(Storage.statistics)
      Global.AchievementScene = this;

      this.initData();
      this.achievementScroll.getComponent("listCtrl").setDataset(this.currentAchievements)
      this.achievementScroll.getComponent("listCtrl").initialize()

      // this.refresh();
    },

    initData(){
      var i = 0;
      this.currentAchievements = [];
      achievements.achievements.forEach(function(entry){
        if ( !Storage.rewardTaken[entry.name] && this.passPrerequest(entry) && this.passUnlock(entry) && this.passSeen(entry) ) {
          this.currentAchievements.push(entry)
          entry.itemID = i;
          entry.avaiable = entry.check();
        }
        i++;
      },this)
    },

    refresh(){
      this.initData();
      this.achievementScroll.getComponent("listCtrl").setDataset(this.currentAchievements)
      this.achievementScroll.getComponent("listCtrl").initialize();
    },
    takeReward(entry){
      Global.MenuScene.star += entry.reward;
      Storage.takeReward(entry.name)
      Global.UnlockScene.refresh();
      this.refresh();
    }
    // update (dt) {},
});
