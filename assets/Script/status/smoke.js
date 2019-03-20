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
      if ( movable.getComponent("boss") ) {
        return;
      }
      if ( movable.getComponent("enemy") ) {
        if ( movable.attackType === Global.ATTACK_TYPE_RANGE ) {
          movable.gainStatus("stun",this.duration)
        } else {
          movable.gainStatus("stun",1)
        }
      }
    },this)
  },
  // update (dt) {},
});
