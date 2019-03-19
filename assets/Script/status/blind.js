const Status = require("status");
const Global = require("global");

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
