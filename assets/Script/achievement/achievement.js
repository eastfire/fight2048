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
    this.priceLabel.string = this.price;
    this.unlockNameLabel.string = this.displayName;

    cc.loader.loadRes(this.icon, cc.SpriteFrame,
      (err, frame)=>{
        this.unlockIcon.spriteFrame = frame;
    })
    this.validate()
  },

  validate() {
    if ( !this.prerequests || (this.prerequests && Common.all(this.prerequests,function(request){
      return Storage.unlocked[request];
    },this) ) ) {
      this.availableButton();
    } else {
      this.unavailableButton();
    }
  },

  unavailableButton(){
    this.unlockButton.interactable = false;
    this.node.active = false
  },

  availableButton(){
    this.unlockButton.interactable = Storage.star >= this.price;
    this.node.active = true
  },

  unlockedButton(){
    this.unlockButton.interactable = false;
    this.starIcon.destroy()
    this.priceLabel.string = "已解锁"
    this.node.color = cc.Color.GRAY;
  },

  click(){
    if ( Global.MenuScene.star >= this.price ) {
      Global.MenuScene.star -= this.price;
      Storage.unlock(this.unlockName)
      if ( this.onUnlock ) {
        this.onUnlock();
      }
      this.unlockedButton();

      Global.UnlockScene.refresh();
    }
  },
  // update (dt) {},
});
