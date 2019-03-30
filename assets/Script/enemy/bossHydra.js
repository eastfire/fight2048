const Global = require("global");
const Boss = require("boss");
const Effect = require("effect");

cc.Class({
    extends: Boss,

    properties: {
      title: {
        get(){
          return "九头蛇";
        },
        override: true,
      },
      desc: {
        get(){
          return "攻击力"+this.attack+"。\n经验值非常高。";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*1000*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){
          return this.level*200*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){
          return this.level*100;
        },
        override: true
      },
    },

    ctor: function() {
      this.type = "bossHydra"
    },

    // update (dt) {},
});
