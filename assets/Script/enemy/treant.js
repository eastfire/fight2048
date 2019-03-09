import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "树人";
        },
        override: true,
      },
      desc: {
        get(){
          return "每次只移动一步\n攻击力较高。\n经验值稍高。";
        },
        override: true,
      },
      exp: {
        get(){ //一般
          var l = this.level + this.star;
          return (l*3-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 3*this.level;
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "treant"
      this.moveStep = 1;
    },
    // update (dt) {},
});
