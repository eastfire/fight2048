import Skill from "skill";
import Global from "../global"
import Common from "../common"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "shieldSkill"
    this.icon="Skill/shieldSkill";
    this.displayName = "圣盾"
    this.desc = "接下来3回合防御加1";
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
