const Movable = require("movable");
const Global = require("global")
const Common = require("common")
const Hero = require("../hero")

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
    this.accept = ["hero"]
  },

  onLoad () {
    this._super();
  },

  start () {
    this._super();
  },

  afterMergeTo(movable) {
    if ( movable instanceof Hero ) {
      this.onTaken(movable)
      Global.currentRoomScene.gainScore(this.score);
    }
    this._super(movable);
  },
  // update (dt) {},
});
