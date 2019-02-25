const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "回复药";
        },
        override: true,
      },
      desc: {
        get(){
          return "恢复生命。\n等级越高效果越好。";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      effect: {
        get(){
          return this.level*5
        },
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="potion"
    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    onTaken() {
      Global.currentRoom.hero.getComponent("hero").gainHp(this.effect)
    },
    // update (dt) {},
});
