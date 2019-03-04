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
    this.skillName = "whirlSkill"
    this.icon="Skill/whirlSkill";
    this.displayName = "回旋斩"
    this.desc = "攻击上下左右4个格子的所有的敌人";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 12+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown --;
    this.reduceWait()
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var attackDetail = {
      fromPosition:heroPosition,
      type:Common.ATTACK_TYPE_SKILL
    };
    var alreadyAttacked = true;
    [{ x:heroPosition.x-1, y:heroPosition.y},
    { x:heroPosition.x+1, y:heroPosition.y},
    { x:heroPosition.x, y:heroPosition.y-1},
    { x:heroPosition.x, y:heroPosition.y+1}].forEach( function(position){
      var enemy = Global.currentRoom.getMovableByPosition(position.x, position.y);
      if (enemy && enemy.getComponent("enemy") ) {
          if ( enemy.checkHit(hero, attackDetail) ) {
            enemy.beHit(hero, attackDetail);
          } else {
            //miss
            enemy.dodgeAttack(hero, attackDetail);
          }
        }
      },this )

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
