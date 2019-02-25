import Status from "status"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "dizzy"
  },

  start () {

  },
  addDuration(duration){
    this.duration = Math.max(this.duration, duration);
  }
  // update (dt) {},
});
