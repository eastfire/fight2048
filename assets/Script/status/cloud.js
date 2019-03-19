const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "cloud"
  },

  onGain(tile){
    this.cloudSprite = cc.instantiate(Global.currentRoom.cloudPrefab)
    let worldPos = Global.currentRoom.node.convertToWorldSpaceAR(
      {
        x: tile.node.x,
        y: tile.node.y
      }
    );
    let viewPos = Global.currentRoomScene.effectLayer.convertToNodeSpaceAR(worldPos);
    this.cloudSprite.x = viewPos.x;
    this.cloudSprite.y = viewPos.y;

    Global.currentRoomScene.effectLayer.addChild(this.cloudSprite)
    this.cloudSprite.setScale(0)
    this.cloudSprite.runAction(
      cc.spawn(
        cc.scaleTo(0.2,1,1),
        cc.fadeIn(0.2)
      ),
    )
  },
  onLost(tile){
    this.cloudSprite.runAction(cc.sequence(
      cc.spawn(
        cc.scaleTo(0.2,0,0),
        cc.fadeOut(0.2)
      ),
      cc.removeSelf()
    ))
  }
  // update (dt) {},
});
