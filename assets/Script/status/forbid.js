const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "封魔"
      }
    },
    desc:{
      get(){
        return "无法使用技能"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "forbid"
  },

  start () {

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
