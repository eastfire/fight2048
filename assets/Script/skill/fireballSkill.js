const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Effect = require("effect");

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
    this.skillName = "fireballSkill"
    this.icon="Skill/fireballSkill";
    this.displayName = "火球术"
    this.desc = "超面前释放1个火球，撞到第一个东西爆炸，连道具也能摧毁";
    this.maxLevel = 3;
    this.coolDown = 6+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "爆炸范围加大，但冷却时间增加3回合"
  },
  onLevelUp(level){
    this.coolDown+=3;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];
    var position = Common.getIncrementPosition(heroPosition, hero.face)
    //find first clash point

    do {
      var tile = Global.currentRoom.getTile(position)
      if ( !tile || tile.isPassable(hero) == false )
        break;
      var movable = Global.currentRoom.getMovableByPosition(position)
      if ( movable )
        break
      position = Common.getIncrementPosition(position, hero.face)
    } while (1)

    var positions = [position];
    if ( this.level >= 2 ) {
      positions.push({x:position.x-1, y:position.y})
      positions.push({x:position.x+1, y:position.y})
      positions.push({x:position.x, y:position.y-1})
      positions.push({x:position.x, y:position.y+1})
    }
    if ( this.level >= 3 ) {
      positions.push({x:position.x-1, y:position.y-1})
      positions.push({x:position.x+1, y:position.y-1})
      positions.push({x:position.x-1, y:position.y+1})
      positions.push({x:position.x+1, y:position.y+1})
    }
    if ( this.level >= 4 ) {
      positions.push({x:position.x-2, y:position.y})
      positions.push({x:position.x+2, y:position.y})
      positions.push({x:position.x, y:position.y-2})
      positions.push({x:position.x, y:position.y+2})
    }

    var attackDetail = {
      fromPosition: position,
      type: Common.ATTACK_TYPE_SKILL
    }
    var attacked = {};
    Effect.projectFireball(Global.currentRoom.getDrawPosition(heroPosition), Global.currentRoom.getDrawPosition(position))
    positions.forEach(function(p){
      var movable = Global.currentRoom.getMovableByPosition(p)
      if (movable){
        if ( movable.getComponent("enemy") ) {
          if ( attacked[movable._id]) return;
          attacked[movable._id]=1;
          if ( movable.checkHit(hero, attackDetail) ) {
            movable.beHit(hero, attackDetail);
          } else {
            //miss
            movable.dodgeAttack(hero, attackDetail);
          }
        } else if ( movable.getComponent("item") ) {
          movable.crash(attackDetail)
        }
      }
    },this)

    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME);
  }
  // update (dt) {},
});
