import Skill from "skill";
import Global from "../global"

cc.Class({
  extends: Skill,

  properties: {
    desc:{
      get(){
        return Math.round(this.level*100*Global.DEXTERITY_EFFECT)+"%的概率闪躲敌人的攻击";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "dexteritySkill"
    this.icon="Skill/dexteritySkill";
    this.displayName = "敏捷（被动）"
    this.isPassive = true;
    this.maxLevel = 5;
  },
  levelUpDesc(level){
    return "增加闪躲概率"+Math.round(100*Global.DEXTERITY_EFFECT)+"%";
  },
  onLevelUp(level){
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.dexterity++;
  },
  onGain() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.dexterity++
  },
  // update (dt) {},
});
