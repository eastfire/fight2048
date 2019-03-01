import Global from "global"
const Enemy = require("enemy");
const Common = require("common");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "魔像";
        },
        override: true,
      },
      desc: {
        get(){
          return "你的技能攻击对他无效，且会让他升级。\n攻击力很高。\n经验值很高。";
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
        get(){ //很高
          return  Math.round(Math.log(this.level+1)*this.level+1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //很高
          return Math.round(Math.log(this.level+1)*this.level+1)
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "golem"
    },

    beHit(hero, detail){
      if ( detail.type === Common.ATTACK_TYPE_SKILL ) {
        this.level++;
      }
      this._super(hero, detail)
    },
    willDieAfterBeHit(hero, detail){
      if ( detail.type === Common.ATTACK_TYPE_SKILL ) {
        return false;
      }
      return true;
    },
    // update (dt) {},
});
