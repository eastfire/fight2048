import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
    dispelPrefab:{
      type: cc.Prefab,
      default: null,
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "prevent"
  },
  addDuration(duration){
    this.duration = duration;
  },
  onGain(){
    this.dispelSprite = cc.instantiate(this.dispelPrefab)
    this.dispelSprite.x = 0;
    this.dispelSprite.y = 0;
    Global.currentRoom.hero.addChild(this.dispelSprite)
  },
  onLost(){
    this.dispelSprite.runAction(cc.sequence(
      cc.fadeOut(0.2),
      cc.removeSelf()
    ))
  },
  // update (dt) {},
});
