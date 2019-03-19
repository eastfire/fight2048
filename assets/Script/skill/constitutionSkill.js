const Skill = require("skill");
const Global = require("global");

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "constitutionSkill"
    this.icon="Skill/constitutionSkill";
    this.displayName = "体质（被动）"
    this.desc = "增加生命上限"+Math.round(Global.CONSTITUTION_EFFECT);
    this.isPassive = true;
    this.maxLevel = 100;
  },
  levelUpDesc(level){
    return "增加生命上限"+Math.round(Global.CONSTITUTION_EFFECT);
  },
  onLevelUp(level){
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.constitution++;
  },
  onGain() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.constitution++
  },
  // update (dt) {},
});
