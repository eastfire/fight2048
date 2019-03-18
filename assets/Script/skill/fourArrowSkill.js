import Skill from "skill";
import Global from "../global"
const Common = require("common");
import Effect from "effect"
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "fourArrowSkill"
    this.icon="Skill/fourArrowSkill";
    this.displayName = "四方箭"
    this.desc = "朝四个方向射箭，杀死第一个敌人。撞到墙就没用了。";
    this.coolDown = 11+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown --;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var enemyList = [];

    Common.DIRECTIONS.forEach(function(direction){
      var movable = null;
      var position = heroPosition;
      var toPosition = null;
      do {
        position = Common.getIncrementPosition(position, direction)
        var tile = Global.currentRoom.getTile(position)
        if ( !tile || tile.isPassable(hero) == false ) {
          toPosition = position
          break;
        }
        var movable = Global.currentRoom.getMovableByPosition(position)
        if ( movable && movable.getComponent("enemy") ) {
          toPosition = movable.getComponent("enemy").positions[0]
          enemyList.push(movable)
          break;
        }
      } while (1)
      Effect.projectArrow(hero.node.position,
        Global.currentRoom.getDrawPosition(toPosition))
    },this)

    var attackDetail = {
      fromPosition: heroPosition,
      type: Common.ATTACK_TYPE_SKILL
    }
    enemyList.forEach(function(enemy){
      if ( enemy.checkHit(hero, attackDetail) ) {
        enemy.beHit(hero, attackDetail);
      } else {
        //miss
        enemy.dodgeAttack(hero, attackDetail);
      }
    },this)

    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME);
  }
  // update (dt) {},
});
