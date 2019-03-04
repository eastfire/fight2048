import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    lockSprite:{
      default: null,
      type: cc.Sprite
    },
    perkSprite: {
      default: null,
      type: cc.Sprite
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
  },

  unlock() {
    this.lockSprite.node.active = false;
  },
  lock() {
    this.lockSprite.node.active = true;
  },
  select(perkName, perkIcon) {
    this.background = this.perkSprite.spriteFrame;
    this.perkName = perkName;
    cc.loader.loadRes(perkIcon, cc.SpriteFrame,
      (err, frame)=>{
        this.perkSprite.spriteFrame = frame;
    })
  },

  unselect() {
    this.perkSprite.spriteFrame = this.background;
    this.perkName = null;
  },
   // update (dt) {},
});
