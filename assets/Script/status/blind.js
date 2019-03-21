const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "失明"
      }
    },
    desc:{
      get(){
        return "看不见怪物和道具的等级"
      }
    }
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
