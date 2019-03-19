const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "spiderWebSkill"
    this.icon="Skill/spiderWebSkill";
    this.displayName = "蛛网术"
    this.desc = "所有敌人不能移动1回合";
    this.coolDown = 18+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少2回合"
  },
  onLevelUp(level){
    this.coolDown-=2;
    this.reduceWait(2)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    Global.currentRoom.foreachMovable(function(movable){
      if ( movable.getComponent("enemy") ) {
        movable.gainStatus("frozen",1)
      }
    },this)

    hero.afterUseSkill()
  }
  // update (dt) {},
});
