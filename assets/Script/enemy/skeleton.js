const Global = require("global");
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
      exp: {
        get(){  //一般
          var l = this.level + this.star;
          return (2*l-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //一般
          return 2*((this.level)*2-1);
        },
        override: true
      },
      isUndead: true
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "skeleton"
    },
    // update (dt) {},
});
