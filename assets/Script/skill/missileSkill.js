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
    this.skillName = "missileSkill"
    this.icon="Skill/missileSkill";
    this.displayName = "魔导弹"
    this.desc = "随机攻击2个敌人";
    this.coolDown = 13+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1);
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];
    var attackDetail = {
      fromPosition:heroPosition,
      type:Common.ATTACK_TYPE_SKILL
    };

    Common.sample(Global.currentRoom.filterMovable(function(movable){
      return movable instanceof Enemy;
    },this), 2).forEach(
        function(enemy){
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
