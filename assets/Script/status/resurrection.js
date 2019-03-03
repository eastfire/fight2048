import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "resurrection"
  },
  addDuration(duration){
    this.duration = duration;
  },
  onTurnStart(){
      Global.currentRoom.hero.getComponent("hero").lostStatus("resurrection")
  }
  // update (dt) {},
});
