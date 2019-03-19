const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Effect = require("effect");
const Enemy = require("enemy");

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "eightArrowSkill"
    this.icon="Skill/eightArrowSkill";
    this.displayName = "八方箭"
    this.desc = "朝周围八个方向射箭，杀死第一个敌人。撞到墙就没用了。";
    this.coolDown = 27+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少2回合"
  },
  onLevelUp(level){
    this.coolDown -=2;
    this.reduceWait(2)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var enemyList = [];


    [0,1,2,3,4,5,6,7].forEach(function(direction){
      var movable = null;
      var position = heroPosition;
      var toPosition = null;
      do {
        var increment = Common.ALL_INCREMENTS[direction]
        position = {
          x: position.x + increment.x,
          y: position.y + increment.y
        }
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
