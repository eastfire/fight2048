const Skill = require("skill");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.effectOfLevel(this.level);
      }
    },
    desc:{
      get(){
        return "所有其他技能冷却"+this.effect+"回合";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "coolingSkill"
    this.icon="Skill/coolingSkill";
    this.displayName = "冷静"
    this.coolDown = 20+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "多冷却1"
  },
  effectOfLevel(level){
    return level+4;
  },
  onLevelUp(level){
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    Global.currentRoomScene.forEachSkill(function(skill){
      skill.getComponent("skill").reduceWait(this.effect)
    },this)

    hero.afterUseSkill()
  }
  // update (dt) {},
});
