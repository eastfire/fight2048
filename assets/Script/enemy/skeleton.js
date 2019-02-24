import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
        score: {
          get(){
            return (2*this.level-1)*Global.SCORE_INFLATION_RATE
          },
          override: true
        },
        exp: {
          get(){  //一般
            return this.level*2*Global.EXP_INFLATION_RATE
          },
          override: true
        },
        attack: {
          get(){  //一般
            return this.level*2-1;
          },
          override: true
        },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "skeleton"
    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    // update (dt) {},
});
