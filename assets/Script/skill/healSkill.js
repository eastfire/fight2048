const Skill = require("skill");
const Global = require("global");

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
        return "治疗"+this.effect+"生命";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "healSkill"
    this.icon="Skill/healSkill";
    this.displayName = "治疗"
    this.coolDown = 6+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "多治疗"+(this.effectOfLevel(level)-this.effectOfLevel(level-1))+"生命,但冷却时间多2回合"
  },
  effectOfLevel(level){
    return 5*level+5;
  },
  onLevelUp(level){
    this.coolDown +=2;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainHp(this.effect);
    //TODO skill EFFECT
    hero.afterUseSkill()
  }
  // update (dt) {},
});
