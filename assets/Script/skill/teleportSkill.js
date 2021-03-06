const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "teleportSkill"
    this.icon="Skill/teleportSkill";
    this.displayName = "传送"
    this.desc = "将自己传送到随机的格子";
    this.coolDown = 13+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown--;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var heroPosition = hero.positions[0];

    var currentTile = Global.currentRoom.getTile(heroPosition);
    var tiles = Global.currentRoom.filterTile(function(tile){
        return currentTile !== tile && tile.isPassable(hero) && !Global.currentRoom.getMovableByTile(tile)
      },
      this);
    if ( tiles.length ) {
      var candidate = Common.sample(tiles);
      var newPosition ={x:candidate.x, y:candidate.y};
      hero.teleport(newPosition, false);
    }

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.TELEPORT_TIME+0.01);
  }
  // update (dt) {},
});
