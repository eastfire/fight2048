import Skill from "skill";
import Global from "../global"

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
    this.skillName = "luckSkill"
    this.icon="Skill/luckSkill";
    this.displayName = "幸运（被动）"
    this.desc = "增加"+5*Math.round(100*Global.LUCK_EFFECT)+"%的道具掉落概率";
    this.isPassive = true;
    this.maxLevel = 10;
  },
  levelUpDesc(level){
    return "增加"+3*Math.round(100*Global.LUCK_EFFECT)+"%的道具掉落概率";
  },
  onLevelUp(level){
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.luck+=3;
  },
  onGain() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.luck+=5;
  },
  // update (dt) {},
});
