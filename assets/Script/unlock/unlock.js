import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    unlockNameLabel:{
      default: null,
      type: cc.Label
    },
    unlockIcon:{
      default: null,
      type: cc.Sprite
    },
    unlockButton:{
      default: null,
      type: cc.Button
    },
    starIcon:{
      default: null,
      type: cc.Sprite
    },
    priceLabel:{
      default: null,
      type: cc.Label
    },
    starIcon:{
      default: null,
      type: cc.Sprite
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
      this.node.setScale(1);
    } else {
      this.node.setScale(0);
    }
  },

  click(){
    MenuScene.star -= this.price;
    Storage.unlocked[this.unlockName] = true;
    cc.sys.localStorage.setItem("unlocked",Storage.unlocked)

    this.unlockButton.interactable = false;
    this.starIcon.destroy();
    this.priceLabel.string = "已解锁"

    Global.UnlockScene.refresh();
  },
  // update (dt) {},
});
