import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
        score: {
          get(){
            return (this.level+1)*this.level*Global.SCORE_INFLATION_RATE
          },
          override: true
        },
        exp: {
          get(){ //超高
            return (this.level*this.level+1)*Global.EXP_INFLATION_RATE
          },
          override: true
        },
        attack: {
          get(){  //超高
            return this.level*this.level+1;
          },
          override: true
        },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "minotaur"
    },
    // update (dt) {},
});
