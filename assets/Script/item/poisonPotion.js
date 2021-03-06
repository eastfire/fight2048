const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "毒药";
        },
        override: true,
      },
      desc: {
        get(){
          return "对英雄造成伤害且中毒\n等级越高伤害越多\n据说分数很高？";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*(this.level+1)/2*50*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      effect: {
        get(){
          return this.level
        },
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="poisonPotion"
      this.breakable = true;
    },

    onTaken() {
      var hero = Global.currentRoom.hero.getComponent("hero");
      hero.loseHp(this.effect,{type:"poison", amount: this.effect})
      hero.gainStatus("poison", -1)
    },
    // update (dt) {},
});
