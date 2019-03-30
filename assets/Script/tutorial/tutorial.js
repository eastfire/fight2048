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
    this.node.on("touchend",function(){
      this.exit();
    },this)
  },
  exit(){
    cc.log("onExit"+this.tutorialId)
    cc.director.resume();
    Storage.tutorial[this.tutorialId]=1;
    Storage.saveTutorial();
    this.node.destroy();
  }
})
