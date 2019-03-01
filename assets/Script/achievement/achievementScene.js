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
      cc.log("Storage.rewardTaken")
      cc.log(Storage.rewardTaken)
      cc.log("Storage.statistics")
      cc.log(Storage.statistics)
      Global.AchievementScene = this;
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
      achievement.achievementName = entry.name;
      achievement.title = entry.title;
      achievement.desc = entry.desc;
      achievement.reward = entry.reward;
      achievement.check = entry.check;
      // achievement.icon = entry.icon;
      achievement.prerequests = entry.prerequests;

      this.achievementList.node.addChild(achievementNode)

    },
    refresh(){
      this.achievementList.node.children.forEach(function(child){
        child.getComponent("achievement").validate();
      })
    }

    // update (dt) {},
});
