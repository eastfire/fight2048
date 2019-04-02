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
          return "只能上下滚动";
        },
        override: true,
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="hlog2"
      this.relativePositions = [{x:0,y:0},{x:1,y:0}];
      this.breakable = false;
      this.exchangeable = false;
    },
    isMovable(direction){
      return this._super(direction) &&
        (direction == Common.DIRECTION_UP || direction == Common.DIRECTION_DOWN);
    },
    // update (dt) {},
});
