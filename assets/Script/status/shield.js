const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "shield"
  },
  onGain(){
    cc.loader.loadRes("Prefab/shield",
      cc.Prefab,
      (err, prefab) => {
        this.shieldSprite = cc.instantiate(prefab)
        this.shieldSprite.x = 0;
        this.shieldSprite.y = 0;
        Global.currentRoom.hero.addChild(this.shieldSprite)
      }
    );
    Global.currentRoom.hero.getComponent("hero").defend = this.extra.effect;
  },
  onLost(){
    if (this.shieldSprite) {
      this.shieldSprite.runAction(cc.sequence(
        cc.fadeOut(0.2),
        cc.removeSelf()
      ))
    }
    Global.currentRoom.hero.getComponent("hero").defend = 0;
  },
  // update (dt) {},
});
