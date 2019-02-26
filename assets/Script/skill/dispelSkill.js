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
    this.skillName = "dispelSkill"
    this.icon="Skill/dispelSkill";
    this.displayName = "驱魔"
    this.desc = "祛除所有不良效果，且保持"+this.effect+"回合";
  },
  levelUpDesc(level){
    return "多保持1回合，但冷却时间也增加1回合"
  },
  effectOfLevel(level){
    return level;
  },
  onLevelUp(level){
    this.coolDown ++;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.forEachStatus(function(status){
      if ( Global.NEGATIVE_EFFECTS.contains(status.statusName) ) {
        hero.loseStatus(status.statusName);
      }
    },this)
    hero.gainStatus("prevent",this.effect)
    //TODO skill EFFECT
    hero.afterUseSkill()
  }
  // update (dt) {},
});
