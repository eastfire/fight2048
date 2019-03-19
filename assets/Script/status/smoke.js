const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "smoke"
  },

  onGain(){
    Global.currentRoom.foreachMovable(function(movable){
      if ( movable.getComponent("enemy") && movable.attackType === Global.ATTACK_TYPE_RANGE ) {
        movable.gainStatus("stun",this.duration)
      }
    },this)
  },
  // update (dt) {},
});
