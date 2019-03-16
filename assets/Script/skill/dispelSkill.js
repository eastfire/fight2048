import Skill from "skill";
import Global from "../global"
import Common from "../common"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.effectOfLevel(this.level);
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "dispelSkill"
    this.icon="Skill/dispelSkill";
    this.displayName = "驱散"
    this.desc = "祛除所有异常效果，且保护1回合不会获得异常效果";
  },
  levelUpDesc(level){
    return "多保持1回合，但冷却时间也增加1回合"
  },
  start () {
    this._super()
    this.coolDown = 5+Global.SKILL_WAIT_ADJUST;
  },
  effectOfLevel(level){
    return level;
  },
  onLevelUp(level){
    this.coolDown ++;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    Global.NEGATIVE_EFFECTS.forEach(function(status){
      hero.lostStatus(status)
    },this)
    hero.gainStatus("prevent",this.effect)
    hero.afterUseSkill()
  }
  // update (dt) {},
});
