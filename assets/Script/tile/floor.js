const Tile = require("tile");

cc.Class({
  extends: Tile,
  properties: {
  },

  ctor: function () {
    this.type = "floor";
    this._isPassable = true;
    this._isCapture = false;
    this._canGenEnemy = true;
  },

  // start () {
  // },
    // LIFE-CYCLE CALLBACKS:
  start () {
    var num = Math.floor(Math.random()*11.9);
    this.subtype = "normal"+num;
    this._super();
  },
    // update (dt) {},
});
