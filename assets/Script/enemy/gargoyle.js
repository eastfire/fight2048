import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "石像鬼";
        },
        override: true,
      },
      desc: {
        get(){
          return "击中造成封魔效果（使你无法使用技能）（等级越高持续时间越长）。\n攻击力较低。\n经验值一般。";
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
        get(){ //一般
          return this.level*2*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //较低
          return Math.round(this.level*3/2);
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "gargoyle"
    },
    // update (dt) {},
    afterAttack(hero){
      hero.gainStatus("forbid",Math.min(8,Math.round(this.level/3))+2);
      this._super(hero);
    },
});