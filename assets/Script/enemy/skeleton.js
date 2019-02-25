import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "骷髅卫兵";
        },
        override: true,
      },
      desc: {
        get(){
          return "攻击力一般。\n经验值一般。";
        },
        override: true,
      },
      score: {
        get(){
          return (2*this.level-1)*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){  //一般
          return Math.round(this.level*1.5*Global.EXP_INFLATION_RATE)
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
    // update (dt) {},
});
