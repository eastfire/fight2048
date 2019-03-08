import Skill from "skill";
import Global from "../global"
import Common from "../common"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "smokingBombSkill"
    this.icon="Skill/smokingBombSkill";
    this.displayName = "烟雾弹"
    this.desc = "所有远程攻击的敌人本轮不能攻击";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  start () {
    this._super()
    this.coolDown = 6+Global.SKILL_WAIT_ADJUST;
    this.maxLevel = 4;
  },
  effectOfLevel(level){
    return level;
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    Global.currentRoom.foreachMovable(function(movable){
      if ( movable.getComponent("enemy") && movable.attackType == Global.ATTACK_TYPE_RANGE ) {
        movable.gainStatus("stun")
      }
    },this)

    hero.afterUseSkill()
  }
  // update (dt) {},
});
