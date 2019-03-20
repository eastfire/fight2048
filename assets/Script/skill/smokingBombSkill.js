const Skill = require("skill");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level+1;
      }
    },
    desc:{
      get(){
        return "所有远程攻击的敌人"+this.effect+"回合不能攻击, 所有近程攻击的敌人1回合不能攻击。对boss无效";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "smokingBombSkill"
    this.icon="Skill/smokingBombSkill";
    this.displayName = "烟雾弹"
    this.coolDown = 10+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "对远程敌人的效果持续时间多1回合，但冷却时间也多1回合"
  },
  effectOfLevel(level){
    return level;
  },
  onLevelUp(level){
    this.coolDown++;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    hero.gainStatus("smoke", this.effect)

    hero.afterUseSkill()
  }
  // update (dt) {},
});
