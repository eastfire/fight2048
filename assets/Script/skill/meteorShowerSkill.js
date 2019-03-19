const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Effect = require("effect")

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return 6+this.level*2;
      }
    },
    desc:{
      get(){
        return "天降"+this.effect+"个陨石随机攻击，可能会打空";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "meteorShowerSkill"
    this.icon="Skill/meteorShowerSkill";
    this.displayName = "陨石雨"
    this.coolDown = 18+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "多召唤2个陨石，但冷却时间增加2回合"
  },
  onLevelUp(level){
    this.coolDown+=2;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    Common.sample(Global.currentRoom.filterTile(function(tile){
      return tile.isPassable(hero);
    },this), this.effect).forEach(
        function(tile){
          var movable = Global.currentRoom.getMovableByTile(tile);
          //TODO fireball effect
          var drawPostion = Global.currentRoom.getDrawPosition(tile.position)
          Global.currentRoomScene.scheduleOnce(()=>{
            Effect.projectFireball({
              x:drawPostion.x,
              y:drawPostion.y+80
            },drawPostion)
            if ( movable && movable.getComponent("enemy") ) {
              var attackDetail = {
                fromPosition:{
                  x:movable.positions[0].x,
                  y:movable.positions[0].y+1
                },
                type:Common.ATTACK_TYPE_SKILL
              };
              if ( movable.checkHit(hero, attackDetail) ) {
                movable.beHit(hero, attackDetail);
              } else {
                //miss
                movable.dodgeAttack(hero, attackDetail);
              }
            }
          },Math.random()*Global.HERO_ATTACK_TIME)
        }
    ,this)

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME*2);
  }
  // update (dt) {},
});
