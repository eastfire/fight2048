const HLog2 = require("hlog2")

cc.Class({
    extends: HLog2,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="hlog4"
      this.relativePositions = [{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}]
      this.breakable = false;
      this.exchangeable = false;
    },
    // update (dt) {},
});
