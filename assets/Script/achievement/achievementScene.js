import Global from "global"
import Storage from "storage"
import achievements from "achievementEntry"

cc.Class({
    extends: cc.Component,

    properties: {
      achievementList:{
        default: null,
        type:cc.Layout
      },
      achievement:{
        default:null,
        type:cc.Prefab
      }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.log("Storage.unlocked")
      cc.log(Storage.unlocked)

      achievements.achievements.forEach(function(entry){
        if ( !Storage.rewardTaken[entry.name] ){
          this.addAchievement(entry)
        }
      },this)
    },

    addAchievement(entry){
      var achievementNode = cc.instantiate(this.achievement)
      achievementNode.x = 0;
      var achievement = achievementNode.getComponent("achievement")
      achievement.unlockName = entry.name;
      achievement.displayName = entry.displayName;
      achievement.type = entry.type;
      achievement.price = entry.price;
      achievement.icon = entry.icon;
      achievement.prerequests = entry.prerequests;

      this.achievementList.node.addChild(unlockNode)

    },
    refresh(){
      this.achievementList.node.children.forEach(function(child){
        child.getComponent("achievement").validate();
      })
      // this.unlockList.getComponent(cc.Layout).updateLayout();
    }

    // update (dt) {},
});
