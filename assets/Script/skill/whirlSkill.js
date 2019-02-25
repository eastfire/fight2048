import Skill from "skill";
import Global from "../global"

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "whirlSkill"
    this.icon="Skill/whirlSkill";

    this.coolDown = 12;

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
  },
  onLevelUp(level){
    this.coolDown --;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var alreadyAttacked = true;
    [{ x:heroPosition.x-1, y:heroPosition.y},
    { x:heroPosition.x+1, y:heroPosition.y},
    { x:heroPosition.x, y:heroPosition.y-1},
    { x:heroPosition.x, y:heroPosition.y+1}].forEach( function(position){
      var movable = Global.currentRoom.getMovableByPosition(position.x, position.y);
      if (movable instanceof Enemy && !movable.isImmune("skill") ) {
          if ( enemy.checkHit(hero) ) {
            enemy.beHit(this, hero.positions[0]);
          } else {
            //miss
            enemy.dodgeAttack(this, hero.positions[0]);
          }
        }
      },this )

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      Global.currentRoom.setAcceptInput(true);
    }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
