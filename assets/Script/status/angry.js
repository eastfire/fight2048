import Status from "status"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "angry"
  },

  start () {

  },
  addDuration(duration){
    this.duration = duration;
  }
  // update (dt) {},
});
