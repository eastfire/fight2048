const VLog2 = require("vlog2")

cc.Class({
    extends: VLog2,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="vlog4"
      this.relativePositions = [{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}]
      this.breakable = false;
      this.exchangeable = false;
    },
    // update (dt) {},
});
