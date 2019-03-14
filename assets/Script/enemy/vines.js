import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "恼人的藤蔓";
        },
        override: true,
      },
      desc: {
        get(){
          return "不会移动\n攻击力始终为1\n经验值极低";
        },
        override: true,
      },
      exp: {
        get(){ //一般
          var l = this.level + this.star;
          return l*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较高
          return 1;
        },
        override: true
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "vines"
      this._isMovable = false;
    },
    // update (dt) {},
});
