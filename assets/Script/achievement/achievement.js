import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    achievementTitle:{
      default: null,
      type: cc.Label
    },
    achievementIcon:{
      default: null,
      type: cc.Sprite
    },
    rewardButton:{
      default: null,
      type: cc.Button
    },
    starIcon:{
      default: null,
      type: cc.Sprite
    },
    rewardLabel:{
      default: null,
      type: cc.Label
    },
    descLabel:{
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },

  updateItem: function(entry, itemID) {
    this.itemID = itemID;
    this.entry = entry;

    this.rewardLabel.string = this.entry.reward;
    this.achievementTitle.string = this.entry.title;
    this.descLabel.string = this.entry.desc;

    if ( this.entry.avaiable ) {
      this.rewardButton.interactable = true;
    } else {
      this.rewardButton.interactable = false;
    }
  },

  click(){
    if ( Storage.rewardTaken[this.entry.name] )  return;
    Global.AchievementScene.takeReward(this.entry)
  },
  // update (dt) {},
});
