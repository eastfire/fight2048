import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "牛头人";
        },
        override: true,
      },
      desc: {
        get(){
          return "攻击力超高。\n经验值超高。";
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
