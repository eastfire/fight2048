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
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "iceWallSkill"
    this.icon="Skill/iceWallSkill";
    this.displayName = "冰墙"
    this.desc = "在身后产生一面冰墙，如果有敌人将杀死敌人";
  },
  levelUpDesc(level){
    return "冰墙持续时间变长"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 10;
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
    Global.currentRoom.generateOneItem(position, "iceWall", this.effect)
  }
  // update (dt) {},
});
