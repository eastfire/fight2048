import Skill from "skill";
import Global from "../global"
import Common from "../common"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "calmSkill"
    this.icon="Skill/calmSkill";
    this.displayName = "安抚"
    this.desc = "接下来2回合敌人不会出现";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  start () {
    this._super()
    this.coolDown = 10+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("calm",3) //因为generateEnemy 在turnStart之后
    hero.afterUseSkill()
  }
  // update (dt) {},
});
