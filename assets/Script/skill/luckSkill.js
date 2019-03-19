const Skill = require("skill");
const Global = require("global");

cc.Class({
  extends: Skill,

  properties: {
    desc:{
      get(){
        return Math.round((5+(this.level-1)*3)*100*Global.LUCK_EFFECT)+"%的道具掉落概率";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "luckSkill"
    this.icon="Skill/luckSkill";
    this.displayName = "幸运（被动）"
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
