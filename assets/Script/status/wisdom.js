const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "wisdom"
  },
  onGain(){
    var hero = Global.currentRoom.hero.getComponent("hero")
    hero.wisdom += this.extra.effect;
  },
  onLost(){
    var hero = Global.currentRoom.hero.getComponent("hero")
    hero.wisdom -= this.extra.effect;
  }
  // update (dt) {},
});
