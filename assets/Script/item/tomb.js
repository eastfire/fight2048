const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "英雄之墓";
        },
        override: true,
      },
      desc: {
        get(){
          return "你发现了前代英雄的坟墓，拜访它可以让你获得一些经验教训";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="tomb"
      this._isMovable = false;
      this.exchangeable = false;
    },

    start () {
      this._super();
      this.node.y = this.node.y-80;
      this.node.runAction(
        cc.spawn(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, 80).easing(cc.easeIn(1)),
          cc.fadeIn(Global.HERO_ATTACK_TIME/2),
        )
      );
    },
    
    hideLevel(hide){
      //not Effect by blind
    },

    onTaken() {
      Global.currentRoom.hero.getComponent("hero").gainExp((this.level+1)*this.level/2*Global.EXP_INFLATION_RATE)
    },
    // update (dt) {},
});
