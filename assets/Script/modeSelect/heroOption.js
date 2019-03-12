import Storage from "storage"
import Global from "global"

cc.Class({
  extends: cc.Component,

  properties: {
    heroType: "",
    lockIcon: cc.Sprite,
    scene: cc.Sprite,
  },

  start(){
    this.validate();
    this.node.on("touchend", ( event ) => {
      if ( Storage.unlocked[this.heroType] ) {
        this.scene.getComponent("modeSelectScene").selectHeroType(this.heroType)
      } else {
        Global.MenuScene.toPage(null, 1)
      }
    })
  },

  validate(){
    this.lockIcon.node.active = Storage.unlocked[this.heroType] ? false: true;
  }
})
