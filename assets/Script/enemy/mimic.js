const Global = require("global");
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "宝箱怪";
        },
        override: true,
      },
      desc: {
        get(){
          return "死亡后必然留下道具。\n攻击力较高。\n经验值一般。";
        },
        override: true,
      },
      exp: {
        get(){ //一般
          var l = this.level + this.star;
          return (l*2-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 2*Math.round(Math.log(this.level+1)*this.level)*2;
        },
        override: true
      },
    },

    getDropRate(){
      return 1;
    },
    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "mimic"
    },
    // update (dt) {},
});
