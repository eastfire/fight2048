import Skill from "skill";
import Global from "../global"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "constitutionSkill"
    this.icon="Skill/constitutionSkill";
    this.displayName = "体质（被动）"
    this.desc = "增加生命上限"+Global.CONSTITUTION_EFFECT;
    this.isPassive = true;
    this.maxLevel = 100;
  },
  levelUpDesc(level){
    return "增加生命上限"+Global.CONSTITUTION_EFFECT;
  },
  start () {
    this._super()
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
