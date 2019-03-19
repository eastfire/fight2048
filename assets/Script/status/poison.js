const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "poison"
  },

  onTurnStart(){
    Global.currentRoom.hero.getComponent("hero").loseHp(1,{type:"poison", amount: 1})
  },
  // update (dt) {},
});
