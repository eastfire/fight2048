import Skill from "skill";
import Global from "../global"
import Common from "../common";
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "backwardSlashSkill"
    this.icon="Skill/backwardSlashSkill";
    this.displayName = "拖刀计"
    this.desc = "本轮会对自己身后的敌人进行普通攻击";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 9+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown-=1;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("backwardSlashStatus",1)

    //TODO skill EFFECT
    // this.scheduleOnce(function(){
      hero.afterUseSkill()
    // }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
