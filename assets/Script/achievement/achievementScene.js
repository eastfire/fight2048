const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");
const achievements = require("achievementEntry");

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

    start () {
      cc.log("Storage.rewardTaken")
      cc.log(Storage.rewardTaken)
      cc.log("Storage.statistics")
      cc.log(Storage.statistics)
      cc.log("Storage.progress")
      cc.log(Storage.progress)
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
        if ( !Storage.rewardTaken[entry.name] && this.passPrerequest(entry) && this.passUnlock(entry) ) {
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
      this.achievementScroll.getComponent("listCtrl").refresh();
    },
    takeReward(entry, button){
      Effect.gainStarInMenu( button.node.position, button.node.parent, entry.reward,
        function(){
          if ( Global.UnlockScene )
            Global.UnlockScene.refresh();
          if ( Global.ModeSelectScene )
            Global.ModeSelectScene.refreshPerkList();
        }, this);
      Storage.takeReward(entry.name)
      this.refresh();
    }
    // update (dt) {},
});
