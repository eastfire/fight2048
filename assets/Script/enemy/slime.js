import {EXP_INFLATION_RATE} from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
        score: {
          get(){
            return this.level
          },
          override: true
        },
        exp: {
          get(){
            return this.level*EXP_INFLATION_RATE*10
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

    getExp() {
      return this.level;
    },
    // update (dt) {},
});
