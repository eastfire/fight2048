const Movable = require("movable");
const Global = require("global")
const Common = require("common")

cc.Class({
  extends: Movable,

  properties: {
    score: {
      get(){
        return this.level
      },
      override: true
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
  // update (dt) {},
});
