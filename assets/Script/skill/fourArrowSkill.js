import Skill from "skill";
import Global from "../global"
const Common = require("common");
import Effect from "effect"
import Enemy from "../enemy/enemy"

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
    this.skillName = "fourArrowSkill"
    this.icon="Skill/fourArrowSkill";
    this.displayName = "四方箭"
    this.desc = "超四个方向射箭，杀死第一个敌人。撞到墙就没用了。";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 11+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown --;
    this.reduceWait()
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var enemyList = [];

    Common.DIRECTIONS.forEach(function(direction){
      var movable = null;
      var position = heroPosition;
      do {
        position = Common.getIncrementPosition(position, direction)
        var tile = Global.currentRoom.getTile(position)
        if ( !tile || tile.isPassable(hero) == false ) {
          //TODO projectArrow
          break;
        }
        var movable = Global.currentRoom.getMovableByPosition(position)
        if ( movable && movable.getComponent("enemy") ) {
          //TODO projectArrow
          enemyList.push(movable)
          break;
        }
      } while (1)
    },this)

    var attackDetail = {
      fromPosition: position,
      type: Common.ATTACK_TYPE_SKILL
    }
    enemyList.forEach(function(enemy){
      if ( movable.checkHit(hero, attackDetail) ) {
        movable.beHit(hero, attackDetail);
      } else {
        //miss
        movable.dodgeAttack(hero, attackDetail);
      }
    },this)

    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME);
  }
  // update (dt) {},
});
