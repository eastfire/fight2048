const Global = require("global");
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
          return "每次只移动一步\n攻击力较高。\n经验值较高。";
        },
        override: true,
      },
      exp: {
        get(){ //较高
          var l = this.level + this.star;
          return (l*3-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 4*this.level-1;
        },
        override: true
      },
      moveStep: {
        get(){
          return 1
        },
        override: true
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "treant"
    },
    // update (dt) {},
});
