const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");
const i18n = require("i18n");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return i18n.t("enemy/mummy");
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
        var l = this.level + this.star;
        return (l*2-1)*Global.EXP_INFLATION_RATE;
      },
      override: true
    },
    attack: {
      get(){
        return 2*this.level+1;
      },
      override: true
    },
    isUndead: true
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "mummy"
  },

  afterHitHero(hero){
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
