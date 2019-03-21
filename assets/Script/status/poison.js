const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "中毒"
      }
    },
    desc:{
      get(){
        return "每回合开始-1生命"
      }
    }
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
