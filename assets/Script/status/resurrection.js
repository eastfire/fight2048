const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "resurrection"
  },

  onTurnStart(){
      Global.currentRoom.hero.getComponent("hero").lostStatus("resurrection")
  }
  // update (dt) {},
});
