const Tile = require("tile");

cc.Class({
    extends: Tile,

    properties: {        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function () {
      this.type = "wall";
      this._isPassable = false;
      this._isCapture = false;
      this._canGenEnemy = false;
    },

    // start () {
    // },

    // update (dt) {},
});
