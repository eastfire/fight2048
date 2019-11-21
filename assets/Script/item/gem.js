const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "宝石";
        },
        override: true,
      },
      desc: {
        get(){
          return "";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="gem"
      this.breakable = true;
      this.isMergeToSelfType = false;
    },

    // update (dt) {},
});
