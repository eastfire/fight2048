import Skill from "skill";
import Global from "../global"
const Common = require("common");
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "turnUndeadSkill"
    this.icon="Skill/turnUndeadSkill";
    this.displayName = "驱逐死灵"
    this.desc = "消灭所有的死灵";
  },
  levelUpDesc(level){
    return "冷却时间减少2回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 24+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown-=2;
    this.reduceWait(2)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    Global.currentRoom.filterMovable(function(movable){
      return movable instanceof Enemy && movable.isUndead;
    },this).forEach(
      function(enemy){
        var attackDetail = {
          fromPosition:{
            x:enemy.positions[0].x,
            y:enemy.positions[0].y+1
          },
          type:Common.ATTACK_TYPE_SKILL
        };
        if ( enemy.checkHit(hero, attackDetail) ) {
          enemy.beHit(hero, attackDetail);
        } else {
          //miss
          enemy.dodgeAttack(hero, attackDetail);
        }
      }
    ,this)

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME);
  }
  // update (dt) {},
});
