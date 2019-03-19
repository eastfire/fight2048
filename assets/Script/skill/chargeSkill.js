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
    this.skillName = "chargeSkill"
    this.icon="Skill/chargeSkill";
    this.displayName = "冲锋"
    this.desc = "向前冲杀直到无法前进";
    this.coolDown = 13+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLevelUp(level){
    this.coolDown-=1;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    var increment = Common.INCREMENTS[hero.face]
    var deltaX = Global.TILE_WIDTH*increment.x/2;
    var deltaY = Global.TILE_HEIGHT*increment.y/2
    do {
      hero.node.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ),
          cc.callFunc(function(){
            this.hitOrMiss(enemy);
          },this)
      ))
    } while (!finished)
    //TODO skill EFFECT
    // this.scheduleOnce(function(){
      hero.afterUseSkill()
    // }, Global.HERO_ATTACK_TIME/2);
  },
  forward(){
    var hero = Global.currentRoom.hero.getComponent("hero");
    var tilePosition = Common.getIncrementPosition(heroPosition, hero.face)
    var tile = Global.currentRoom.getTile(tilePosition);
    if ( tile && tile.isPassable(hero) ) {
      var enemy = Global.currentRoom.getMovableByPosition(tilePosition);
      if ( enemy && enemy.getComponent("enemy") ) {

      }
    }

    var increment = Common.INCREMENTS[hero.face]
    var deltaX = Global.TILE_WIDTH*increment.x/2;
    var deltaY = Global.TILE_HEIGHT*increment.y/2
    var attackDetail = {
      fromPosition:heroPosition,
      type:Common.ATTACK_TYPE_SKILL
    };
    hero.node.runAction(cc.sequence(
        cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ),
        cc.callFunc(function(){
          this.hitOrMiss(enemy);
        },this)
    ))
  }
  // update (dt) {},
});
