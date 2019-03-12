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
    this.skillName = "bombSkill"
    this.icon="Skill/bombSkill";
    this.displayName = "炸弹"
    this.desc = "朝敌人阵中乱丢一颗只对敌人有效的炸弹\n房间满了就丢不了了";
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
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero")
    var tiles = Global.currentRoom.filterTile(function(tile){
        return tile.isPassable(hero) && !Global.currentRoom.getMovableByTile(tile)
      },
      this);
    if ( tiles.length ) {
      var candidate = Common.sample(tiles);
      var position ={x:candidate.x, y:candidate.y};
      this.generateBomb(position);
    }

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  },

  generateBomb(position){
    Global.currentRoom.itemFactory.generateOneItem(position, "bomb", 3)
  }
  // update (dt) {},
});
