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
    Global.currentRoomScene.forEachSkill(function(skill){
      skill.getComponent("skill").forbid = true
    },this)
  },
  onLost(){
    Global.currentRoomScene.forEachSkill(function(skill){
      skill.getComponent("skill").forbid = false
    },this)
  },
  // update (dt) {},
});
