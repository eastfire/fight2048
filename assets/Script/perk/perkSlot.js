import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    lockSprite: cc.Sprite,
    perkSprite: cc.Sprite,
    isEmpty:{
      get(){
        return this.perkName == null
      }
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
  fill(perkName) {
    this.background = this.perkSprite.spriteFrame;
    this.perkName = perkName;
    cc.loader.loadRes("Texture/Perk/"+perkName, cc.SpriteFrame,
      (err, frame)=>{
        this.perkSprite.spriteFrame = frame;
    })
  },

  empty() {
    if ( this.background ) {
      this.perkSprite.spriteFrame = this.background;
    }
    this.perkName = null;
  },
   // update (dt) {},
});
