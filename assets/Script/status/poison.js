import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "poison"
  },
  addDuration(duration){
    this.duration = duration;
  },
  onTurnStart(){
    Global.currentRoom.hero.getComponent("hero").loseHp(1,"poison")
  },
  // update (dt) {},
});
