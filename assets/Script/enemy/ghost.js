import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "幽灵";
        },
        override: true,
      },
      desc: {
        get(){
          return "一定概率躲过近距离攻击（等级越高概率越高）。\n攻击力很低。\n经验值较低。";
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
        get(){ //较低
          return this.level*Global.EXP_INFLATION_RATE;
        },
        override: true
      },
      attack: {
        get(){  //很低
          return Math.round(this.level/2);
        },
        override: true
      },
      dexterity: {
        get() {
          return Math.min(83, this.level*(this.level+1)/2+5);
        },
        override: true
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "ghost"
    }
    // update (dt) {},
});
