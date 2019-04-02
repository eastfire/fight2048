const Status = require("status");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "portal";
  },

  onGain(tile){
    cc.loader.loadRes("Prefab/portal"+this.extra.type, cc.Prefab,
      (err, prefab)=>{
        this.sprite = cc.instantiate(prefab)
        this.sprite.x = this.sprite.y = 0;
        if ( tile.effectLayer ) {
          tile.effectLayer.addChild(this.sprite)
        }
    })
  },
  onLost(tile){
    this.sprite.destroy()
  },
  onTurnEnd(tile){
    var movable = Global.currentRoom.getMovableByTile(tile)
    if ( movable ) {
      movable.teleport(this.extra.peer, false);
      //move to peerPosition
      Global.currentRoom.setDelayPhaseTime( Global.TELEPORT_TIME+0.02 );
    }
    this._super(tile);
  }
  // update (dt) {},
});
