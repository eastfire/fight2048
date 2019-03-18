import Skill from "skill";
import Global from "../global"
const Common = require("common");
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "blinkSkill"
    this.icon="Skill/blinkSkill";
    this.displayName = "闪现"
    this.desc = "将自己闪现到身后第一个空格，逃命的绝技";
    this.coolDown = 8+Global.SKILL_WAIT_ADJUST;
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
    var face = hero.face;

    var position = heroPosition;
    var newPosition = heroPosition;
    do {
      var position = Common.getDecrementPosition(position, face)
      var tile = Global.currentRoom.getTile(position)
      if ( !tile ) { //越界
        break;
      }
      var movable = Global.currentRoom.getMovableByPosition(position)
      if ( tile.isPassable(hero) && !movable ) {
        newPosition = position;
        break;
      }
    } while (1)

    hero.teleport(newPosition, false);

    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.TELEPORT_TIME+0.01);
  }
  // update (dt) {},
});
