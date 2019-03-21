const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "复活"
      }
    },
    desc:{
      get(){
        return "本回合如果死亡将会复活"
      }
    }
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
