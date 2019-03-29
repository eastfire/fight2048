const Global = require("global");
const Storage = require("storage");
const Common = require("common")

cc.Class({
  extends: cc.Component,

  properties: {
    label: cc.Label,
    sprite: cc.Sprite,
    finger: cc.Sprite
  },

  start(){
    this.node.on("touchend",function(){
      this.exit();
    },this)
  },
  setContent(opt){
    this.tutorialId = opt.tutorialId;
    this.label.string = opt.text
    if ( !opt.image ) {
      this.sprite.node.active = false
    }
    if ( opt.finger ) {
      this.finger.node.x = -200;
      this.finger.node.runAction(cc.repeatForever(
        cc.sequence(
          cc.moveTo(1.5,200,this.finger.node.y),
          cc.delayTime(0.5),
          cc.moveTo(0,-200,this.finger.node.y)
        )
      ))
    } else {
      this.finger.node.active = false;
    }
    if ( opt.pause ) {
      cc.director.pause();
    }
  },
  exit(){
    cc.director.resume();
    this.node.runAction(cc.sequence(
      cc.fadeOut(0.2),
      cc.callFunc(function(){
        Storage.tutorial[this.tutorialId]=1;
        Storage.saveTutorial();
      },this),
      cc.removeSelf(),
    ))
  }
})
