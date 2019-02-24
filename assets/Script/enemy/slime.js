import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
        score: {
          get(){
            return this.level*Global.SCORE_INFLATION_RATE
          },
          override: true
        },
        exp: {
          get(){
            return this.level*Global.EXP_INFLATION_RATE
          },
          override: true
        }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {

    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    // update (dt) {},
});
