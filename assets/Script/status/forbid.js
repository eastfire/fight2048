import Status from "status"
import Global from "global"

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "forbid"
  },

  start () {

  },
  addDuration(duration){
    this.duration = duration;
  },
  onGain(){
    Global.currentRoomScene.forEachActiveSkill(function(skill){
      if ( !skill.isPassive )
        skill.getComponent("skill").forbid = true
    },this)
  },
  onLost(){
    Global.currentRoomScene.forEachActiveSkill(function(skill){
      if ( !skill.isPassive )
        skill.getComponent("skill").forbid = false
    },this)
  },
  // update (dt) {},
});
