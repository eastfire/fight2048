import Skill from "skill";
import Global from "global"
import Common from "common"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level+2;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "angelSkill"
    this.icon="Skill/angelSkill";
    this.displayName = "召唤天使"
    this.desc = "召唤天使为你作战"+this.effect+"回合";
  },
  levelUpDesc(level){
    return "多持续1回合"
  },
  start () {
    this._super()
    this.coolDown = 14+Global.SKILL_WAIT_ADJUST;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    var tiles = Global.currentRoom.filterTile(function(tile){
        return tile.isPassable(hero) && !Global.currentRoom.getMovableByTile(tile)
      },
      this);
    if ( tiles.length ) {
      var candidate = Common.sample(tiles);
      var position ={x:candidate.x, y:candidate.y};
      Global.currentRoom.itemFactory.generateOneItem(position, "angel", this.effect)
    }

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
