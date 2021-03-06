const Skill = require("skill");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level;
      }
    },
    desc:{
      get(){
        return "接下来3回合防御加"+this.effect;
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "shieldSkill"
    this.icon="Skill/shieldSkill";
    this.displayName = "圣盾"
    this.coolDown = 8+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "防御力多加1，但冷却时间增加3回合"
  },
  onLevelUp(level){
    this.coolDown+=3;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("shield",3,{effect:this.effect})
    hero.afterUseSkill()
  }
  // update (dt) {},
});
