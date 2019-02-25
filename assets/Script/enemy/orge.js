import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "食人魔";
        },
        override: true,
      },
      desc: {
        get(){
          return "攻击力高。\n经验值高。";
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
        get(){ //较高
          return (Math.round(Math.log(this.level+1)*this.level)+1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return Math.round(Math.log(this.level+1)*this.level)+1;
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "orge"
    },
    // update (dt) {},
});