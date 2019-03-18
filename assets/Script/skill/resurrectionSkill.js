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
    this.skillName = "resurrectionSkill"
    this.icon="Skill/resurrectionSkill";
    this.maxLevel = 4;
    this.displayName = "复活"
    this.desc = "如果本轮死亡，以"+Math.round(this.effect*100)+"%生命复活";
    this.coolDown = 60+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "复活时多恢复20%生命，同时冷却时间也减少2回合"
  },
  effectOfLevel(level){
    return level*0.2;
  },
  onLevelUp(level){
    this.coolDown-=2;
    this.reduceWait(2)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("resurrection",2) //因为checkDead是TurnEnd之后做的。要将状态时间多1
    hero.getStatus("resurrection").getComponent("resurrection").effect = this.effect;
    hero.afterUseSkill()
  }
  // update (dt) {},
});
