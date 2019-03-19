const Skill = require("skill");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "treasureSkill"
    this.icon="Skill/treasureSkill";
    this.displayName = "寻宝";
    this.desc = "本回合杀死的怪物必然掉落道具";
    this.coolDown = 14+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("treasure",1)
    hero.afterUseSkill()
  }
  // update (dt) {},
});
