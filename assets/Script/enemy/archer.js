import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "骷髅弓箭手";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击。\n攻击力很低。\n经验值一般。";
        },
        override: true,
      },
      attackRage: {
        get() {
          return 100; //無限
        },
        visible: false,
        override: true
      },
      score: {
        get(){
          return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){  //一般
          return this.level*2*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //很低
          return Math.round(this.level/2);
        },
        override: true
      },
      attackType:{
        override: true,
        default: Global.ATTACK_TYPE_RANGE,
        visible:false,
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "archer"
    },
    // update (dt) {},
});
