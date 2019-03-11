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
    this.skillName = "shieldSkill"
    this.icon="Skill/shieldSkill";
    this.displayName = "圣盾"
    this.desc = "接下来"+this.effect+"回合防御加1";
  },
  levelUpDesc(level){
    return "持续多1回合，防御力加1，但冷却时间增加3回合"
  },
  start () {
    this._super()
    this.coolDown = 8+Global.SKILL_WAIT_ADJUST;
  },
  effectOfLevel(level){
    return level+1;
  },
  onLevelUp(level){
    this.coolDown+=3;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("shield",this.effect,{effect:this.effect})
    hero.afterUseSkill()
  }
  // update (dt) {},
});
