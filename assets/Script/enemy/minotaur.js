const Global = require("global");
const Enemy = require("enemy");
const i18n = require("i18n")

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "飞龙";
        },
        override: true,
      },
      desc: {
        get(){
          return "攻击力超高。\n经验值超高。";
        },
        override: true,
      },
      exp: {
        get(){ //超高
          return (this.level*this.level+this.star+1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //超高
          return this.level*this.level+4;
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
