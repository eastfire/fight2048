const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "forwardSlashSkill"
    this.icon="Skill/forwardSlashSkill";
    this.displayName = "顺势劈"
    this.desc = "本轮会对身前两格的敌人进行普通攻击";
    this.coolDown = 8+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown-=1;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("forwardSlashStatus",1)

    //TODO skill EFFECT
    // this.scheduleOnce(function(){
      hero.afterUseSkill()
    // }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
