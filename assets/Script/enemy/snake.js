const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "毒蛇";
      },
      override: true,
    },
    desc: {
      get(){
        return "击中时有一定概率使你中毒（每回合开始-1生命）\n（等级越高概率越高）\n攻击力较低。\n经验值一般。\n恢复生命时可以消除中毒状态";
      },
      override: true,
    },
    exp: {
      get(){
        var l = this.level * this.star;
        return (Math.round(l*2.5)-1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){
        return this.level;
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "snake"
  },

  afterAttack(hero){
    this.checkSpecialEffect(hero);
    this._super(hero);
  },
  checkSpecialEffect(model){
    if (this.getSpecialEffectRate(model) > Math.random() ) {
      model.gainStatus("poison",-1)
    }
  },
  getSpecialEffectRate(model){
       // return 1;
    return this.level/10;
  },
  // update (dt) {},
});
