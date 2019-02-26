import Skill from "skill";
import Global from "../global"
const Common = require("common");
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
    this.skillName = "meteorShowerSkill"
    this.icon="Skill/meteorShowerSkill";
    this.displayName = "流星雨"
    this.desc = "随机攻击6个敌人";
  },
  levelUpDesc(level){
    return "多攻击1个敌人，但冷却时间增加2回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 24;
  },
  onLevelUp(level){
    this.coolDown+=2;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    Common.sample(Global.currentRoom.filterMovable(function(movable){
      return movable instanceof Enemy;
    },this), this.effect).forEach(
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
