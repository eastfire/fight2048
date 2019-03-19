const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "prevent"
  },

  onGain(){
    cc.loader.loadRes("Prefab/dispelShield",
      cc.Prefab,
      (err, prefab) => {
        this.dispelSprite = cc.instantiate(prefab)
        this.dispelSprite.x = 0;
        this.dispelSprite.y = 0;
        Global.currentRoom.hero.addChild(this.dispelSprite)
      }
    );
  },
  onLost(){
    if (this.dispelSprite) {
      this.dispelSprite.runAction(cc.sequence(
        cc.fadeOut(0.2),
        cc.removeSelf()
      ))
    }
  },
  // update (dt) {},
});
