const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return 5+this.level;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "lighteningSkill"
    this.icon="Skill/lighteningSkill";
    this.displayName = "闪电链"
    this.desc = "消灭与你四周的某一个敌人相同类型的所有敌人";
    this.coolDown = 26+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var enemyList = [];
    [{ x:heroPosition.x-1, y:heroPosition.y},
      { x:heroPosition.x+1, y:heroPosition.y},
      { x:heroPosition.x, y:heroPosition.y-1},
      { x:heroPosition.x, y:heroPosition.y+1}].forEach(function(position){
        var movable = Global.currentRoom.getMovableByPosition(position.x, position.y);
        if ( movable && movable.getComponent("enemy") )
          enemyList.push(movable.getComponent("enemy"))
      })
    var attackThis = Common.sample(enemyList);

    var attackDetail = {
      fromPosition: heroPosition,
      type: Common.ATTACK_TYPE_SKILL
    }

    Global.currentRoom.foreachMovable(function(enemy){
      if ( enemy.type == attackThis.type ) {
        if ( enemy.checkHit(hero, attackDetail) ) {
          enemy.beHit(hero, attackDetail);
        } else {
          //miss
          enemy.dodgeAttack(hero, attackDetail);
        }
      }
    },this)

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME);
  }
  // update (dt) {},
});
