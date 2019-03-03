import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "wisdom"
  },
  addDuration(duration){
    this.duration = duration;
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
