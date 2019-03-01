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
    this.rewardLabel.string = this.reward;
    this.achievementTitle.string = this.title;
    this.descLabel.string = this.desc;

    this.validate()
  },
  passPrerequest(){
    return !this.prerequests || (this.prerequests && Common.all(this.prerequests,function(request){
      return Storage.rewardTaken[request];
    },this) )
  },
  passUnlock(){
    return !this.needUnlocks || (this.needUnlocks && Common.all(this.needUnlocks,function(unlock){
      return Storage.unlocked[unlock];
    },this) )
  },
  validate() {
    if ( this.passPrerequest() && this.passUnlock() ) {
      if ( this.check() ) {
        if ( Storage.rewardTaken[this.achievementName] ) {
          this.takenButton()
        } else {
          this.availableButton();
        }
      } else {
        this.unachievedButton();
      }
    } else {
      this.unavailableButton();
    }
  },

  unavailableButton(){
    this.rewardButton.interactable = false;
    this.node.active = false
  },

  availableButton(){
    this.rewardButton.interactable = true;
    this.node.active = true
  },

  unachievedButton(){
    this.rewardButton.interactable = false;
    this.node.active = true
  },

  takenButton(){
    this.rewardButton.interactable = false;
    this.starIcon.node.active = false;
    this.rewardLabel.string = "已领取"
    this.node.color = cc.Color.GRAY;
  },

  click(){
    if ( Storage.rewardTaken[this.achievementName] )  return;
    Global.MenuScene.star += this.reward;
    Storage.takeReward(this.achievementName)
    this.takenButton();
    Global.AchievementScene.refresh();
  },
  // update (dt) {},
});
