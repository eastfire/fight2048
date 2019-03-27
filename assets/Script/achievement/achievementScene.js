const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");
const achievements = require("achievementEntry");

cc.Class({
    extends: cc.Component,

    properties: {
      achievementScroll: cc.ScrollView,
      loading: cc.Prefab,
      moneyLabel:cc.Label,
      starPrefab: cc.Prefab,
      star:{
        default: 0,
        notify(oldValue){
          if ( this.star == oldValue ) return;
          Storage.saveMoney(this.star);
          this.moneyLabel.string = this.star;
        },
        visible:false
      },
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
    passNeedSeen(entry){
      return !entry.needSeen || (entry.needSeen && Common.all(entry.needSeen,function(type){
        return Storage.progress.seen[type];
      },this) )
    },

    start () {
      cc.log("Storage.rewardTaken")
      cc.log(Storage.rewardTaken)
      cc.log("Storage.statistics")
      cc.log(Storage.statistics)
      cc.log("Storage.progress")
      cc.log(Storage.progress)
      this.star = Storage.star;
      this.moneyLabel.string = Storage.star;

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
        if ( !Storage.rewardTaken[entry.name] && this.passPrerequest(entry) && this.passUnlock(entry) && this.passNeedSeen(entry) ) {
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
      Storage.takeReward(entry.name)
      Effect.gainStarInMenu( {
        fromPosition: button.node.position,
        fromParentNode: button.node.parent,
        toPosition: this.moneyLabel.node.position,
        toParentNode: this.node,
        effectParentNode: this.node,
        amount: entry.reward,
        stepCallback: function(step){
          this.star += step
          this.moneyLabel.node.stopAllActions();
          this.moneyLabel.node.runAction(cc.sequence(
            cc.scaleTo(Global.GET_STAR_TIME/2,1.3),
            cc.scaleTo(Global.GET_STAR_TIME/2,1)
          ))
        },
        callback: function(){
          this.refresh();
        },
        context: this,
        starPrefab: this.starPrefab
      });
    },
    back(){
      Global.AchievementScene = null;
      Common.loadScene("MenuScene",this.node, this.loading);
    }
    // update (dt) {},
});
