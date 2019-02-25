import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "吸血鬼";
        },
        override: true,
      },
      desc: {
        get(){
          return "击中你时自己升1级。攻击力超高。\n经验值超高。";
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
        get(){ //超高
          return (this.level*this.level)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //超高
          return this.level*this.level;
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "vampire"
    },
    afterAttack(hero){
      this.beforeLevelUp(this.level);
      this.level+=1;
      this.onLevelUp(this.level)
      this._super(hero);
    },
    // update (dt) {},
});
