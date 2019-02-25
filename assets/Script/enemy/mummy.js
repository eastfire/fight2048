import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "木乃伊";
      },
      override: true,
    },
    desc: {
      get(){
        return "击中时有一定概率使你被诅咒（下一次恢复生命量减半）（等级越高概率越高）。\n攻击力较低。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        return (this.level*2-1)*Global.EXP_INFLATION_RATE;
      },
      override: true
    },
    attack: {
      get(){
        return this.level+1;
      },
      override: true
    },
    score:{
      get(){
        return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "mummy"
  },

  afterAttack(hero){
    this.checkSpecialEffect(hero);
    this._super(hero);
  },
  checkSpecialEffect(model){
    if (this.getSpecialEffectRate(model) > Math.random() ) {
      model.gainStatus("cursed",-1)
    }
  },
  getSpecialEffectRate(model){
       // return 1;
    return this.level/10;
  },
  // update (dt) {},
});
