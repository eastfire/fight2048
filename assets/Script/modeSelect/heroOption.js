import Storage from "storage"

cc.Class({
  extends: cc.Component,

  properties: {
    heroType: "",
    lockIcon: {
      type: cc.Sprite,
      default: null
    },
    scene: {
      type: cc.Sprite,
      default: null
    }
  },

  start(){
    this.validate();
    this.node.on("touchend", ( event ) => {
      if ( Storage.unlocked[this.heroType] ) {
        this.scene.getComponent("modeSelectScene").selectHeroType(this.heroType)
      }
    })
  },

  validate(){
    this.lockIcon.node.active = Storage.unlocked[this.heroType] ? false: true;
  }
})
