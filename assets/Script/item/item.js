const Movable = require("movable");
const Global = require("global")
const Common = require("common")

cc.Class({
  extends: Movable,

  properties: {
    score: {
      get(){
        return (this.level+1)*this.level*Global.SCORE_INFLATION_RATE
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.isAllFaceSame = true;
    this.isMergeToSelfType = true;
    this.accept = []
  },

  onLoad () {
    this._super();
  },

  start () {
    this._super();
  },

  afterMergeTo(movable) {
    if ( movable.getComponent("hero") ) {
      this.onTaken(movable)
      Global.currentRoomScene.gainScore(this.score);
    }
    this._super(movable);
  },

  crash(detail){
    var fromPosition = detail.fromPosition
    var point = this.positions[0]
    var deltaX = Global.TILE_WIDTH*(Math.max(-1,Math.min(1,fromPosition.x - point.x)) )/4;
    var deltaY = Global.TILE_HEIGHT*(Math.max(-1,Math.min(1,fromPosition.y - point.y)) )/4;
    this.node.runAction(cc.sequence(
      cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ).easing(cc.easeCubicActionOut()),
      cc.callFunc(function(){
        Global.currentRoomScene.gainScore(this.score);
        Global.currentRoom.removeMovable(this);
      },this)
    ))
  }
  // update (dt) {},
});
