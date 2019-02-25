import Skill from "skill";
import Global from "../global"
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "verticalSlashSkill"
    this.icon="Skill/verticalSlashSkill";
    this.displayName = "纵斩"
    this.desc = "攻击所在列所有的敌人";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 10;
  },
  onLevelUp(level){
    this.coolDown-=1;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    for ( var i = 0; i < Global.currentRoom.height; i++ ) {
      var enemy = Global.currentRoom.getMovableByPosition(heroPosition.x,i);
      if (enemy && enemy.getComponent("enemy") && !enemy.isImmune("skill")) {
        if ( enemy.checkHit(hero) ) {
          enemy.beHit(hero, hero.positions[0]);
        } else {
          //miss
          enemy.dodgeAttack(hero, hero.positions[0]);
        }
      }
    }

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
