import Skill from "skill";
import Global from "../global"
import Common from "../common";
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level;
      }
    },
    desc:{
      get(){
        return "在身后产生一面冰墙，持续"+this.effect+"回合。如果位置上有敌人，将其杀死";
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "iceWallSkill"
    this.icon="Skill/iceWallSkill";
    this.displayName = "冰墙"
    this.coolDown = 10+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冰墙持续时间变长1回合"
  },
  onLevelUp(level){
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];
    var tilePosition = Common.getDecrementPosition(heroPosition, hero.face)

    var tile = Global.currentRoom.getTile(tilePosition);
    if ( tile && tile.isPassable(hero) ) {
      var enemy = Global.currentRoom.getMovableByPosition(tilePosition);
      if ( enemy && enemy.getComponent("enemy") ) {
        var detail = {
          fromPosition: {
            x: tilePosition.x,
            y: tilePosition.y-1
          },
          type:Common.ATTACK_TYPE_SKILL
        }
        if ( enemy.willDieAfterBeHit(hero, detail) ) {
          enemy.beHit(hero, detail);
          this.generateWall(tilePosition);
        }
      } else {
        this.generateWall(tilePosition);
      }
    }

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  },

  generateWall(position){
    Global.currentRoom.itemFactory.generateOneItem(position, "iceWall", this.effect)
  }
  // update (dt) {},
});
