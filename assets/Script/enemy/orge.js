const Global = require("global");
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
          return "攻击力较高。\n经验值较高。";
        },
        override: true,
      },
      exp: {
        get(){ //较高
          var l = this.level + this.star;
          return (Math.round(Math.log(l+1)*l)+1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 2*Math.round(Math.log(this.level+1)*this.level)+1;
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
