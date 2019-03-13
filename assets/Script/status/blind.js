import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "blind"
  },

  start () {

  },
  addDuration(duration){
    this.duration = duration;
  },
  onGain(){
    Global.currentRoom.foreachMovable(function(movable){
      movable.hideLevel(true)
    },this)
  },
  onLost(){
    Global.currentRoom.foreachMovable(function(movable){
      movable.hideLevel(false)
    },this)
  },
  // update (dt) {},
});
