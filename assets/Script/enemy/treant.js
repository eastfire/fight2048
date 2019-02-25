import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "树人";
        },
        override: true,
      },
      desc: {
        get(){
          return "始终站着不动。\n攻击力较高。\n经验值一般。";
        },
        override: true,
      },
      score: {
        get(){
          return (this.level+1)*this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){ //一般
          return (this.level*2-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 3*this.level;
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "treant"
      this._isMovable = false;
    },
    // update (dt) {},
});
