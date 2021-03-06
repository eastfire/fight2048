const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const MenuScene = require("MenuScene");

cc.Class({
  extends: cc.Component,

  properties: {
    achievementTitle: cc.Label,
    achievementIcon: cc.Sprite,
    rewardButton: cc.Button,
    starIcon: cc.Sprite,
    rewardLabel: cc.Label,
    descLabel: cc.Label,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },

  updateItem: function(entry, itemID) {
    if ( !entry ) {
      this.node.runAction(cc.removeSelf());
      return;
    }
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
    this.rewardButton.interactable = false;
    Global.AchievementScene.takeReward(this.entry, this.rewardButton)
  },
  // update (dt) {},
});
