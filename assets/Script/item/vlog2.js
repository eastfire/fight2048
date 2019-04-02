const Item = require("item");
const Global = require("global")
const Common = require("common")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "滚木";
        },
        override: true,
      },
      desc: {
        get(){
          return "只能左右滚动";
        },
        override: true,
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="vlog2"
      this.relativePositions = [{x:0,y:0},{x:0,y:1}];
      this.breakable = false;
      this.exchangeable = false;
    },
    isMovable(direction){
      return this._super(direction) &&
        (direction == Common.DIRECTION_LEFT || direction == Common.DIRECTION_RIGHT);
    },
    // update (dt) {},
});
