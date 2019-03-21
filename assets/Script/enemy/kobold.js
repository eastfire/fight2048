const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "狗头人";
      },
      override: true,
    },
    desc: {
      get(){
        return "攻击时有一定概率使你的技能等待时间延长（等级越高概率越高，效果越明显）。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){//一般
        var l = this.level + this.star;
        return Math.round(l*Global.EXP_INFLATION_RATE*2.5)
      },
      override: true
    },
    attack: {
      get(){//一般
        return 2*2*this.level-1;
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "kobold"
  },

  afterAttack(hero){
    this.checkSpecialEffect(hero);
    this._super(hero);
  },
  getDisturbEffect(model){
    return Math.floor(this.level/6)+1;
  },
  checkSpecialEffect(model){
    if (this.getSpecialEffectRate(model) > Math.random() ) {
      model.getDisturb(this.getDisturbEffect(model));
    }
  },
  getSpecialEffectRate(model){
       // return 1;
    return this.level/20+0.3;
  },
  // update (dt) {},
});
