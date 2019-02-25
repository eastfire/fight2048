import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "paralyse"
  },
  addDuration(duration){
    this.duration = duration;
  },
  // update (dt) {},
});
