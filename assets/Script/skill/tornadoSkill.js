const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const EnemyFactory = require("enemyFactory");

cc.Class({
  extends: Skill,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "tornadoSkill"
    this.icon="Skill/tornadoSkill";
    this.displayName = "狂风"
    this.desc = "将所有敌人和道具的位置打乱";
    this.coolDown = 15+Global.SKILL_WAIT_ADJUST;
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

    //find boss first
    var boss = Global.currentRoom.filterMovable(function(movable){
      return movable.getComponent("boss");
    },this)
    if ( boss && boss[0] ) {
      boss = boss[0]
    } else {
      boss = null
    }
    var otherMovables = Global.currentRoom.filterMovable(function(movable){
      if (!movable.getComponent("boss") && !movable.getComponent("hero") ) {
        movable.__removeOldMapping();
        return true;
      }
      return false;
    },this)
    var tiles
    if ( boss ) {
      //calculate all positions
      tiles = Global.currentRoom.filterTile(function(tile){
          return EnemyFactory.checkTileForBoss(tile, false)
        },
      this)
      var newBossPosition = Common.sample(tiles)
      if ( newBossPosition ) {
        boss.teleport(newBossPosition.position,false)
      }
      var oldDrawPosition = Global.currentRoom.getDrawPosition(boss.positions[0])
      boss.__removeOldMapping();
      boss.setNewPosition(newBossPosition);
      var drawPosition = Global.currentRoom.getDrawPosition(newBossPosition)
      boss.node.runAction(cc.sequence(
        cc.spawn(
          cc.moveTo(Global.TELEPORT_TIME/2, oldDrawPosition.x, oldDrawPosition.y+40),
          cc.scaleTo(Global.TELEPORT_TIME/2, 0.4, 2),
          cc.fadeOut(Global.TELEPORT_TIME/2)
        ),
        cc.moveTo(0.1,drawPosition.x,drawPosition.y+40),
        cc.spawn(
          cc.moveTo(Global.TELEPORT_TIME/2, drawPosition.x, drawPosition.y),
          cc.scaleTo(Global.TELEPORT_TIME/2, 1, 1),
          cc.fadeIn(Global.TELEPORT_TIME/2)
        )
      ))
    }
    tiles = Global.currentRoom.filterTile(function(tile){
        return !Global.currentRoom.getMovableByTile(tile) && tile.canGenEnemy(hero);
      },
    this)
    var newTiles = Common.sample(tiles, otherMovables.length)
    for ( var i = 0; i < otherMovables.length; i++ ) {
      otherMovables[i].setNewPosition(newTiles[i].position);
      var drawPosition = Global.currentRoom.getDrawPosition(newTiles[i].position)
      otherMovables[i].node.runAction(cc.sequence(
        cc.spawn(
          cc.moveBy(Global.TELEPORT_TIME/2, 0, 40),
          cc.scaleTo(Global.TELEPORT_TIME/2, 0.4, 2),
          cc.fadeOut(Global.TELEPORT_TIME/2)
        ),
        cc.moveTo(0.001,drawPosition.x,drawPosition.y+40),
        cc.spawn(
          cc.moveBy(Global.TELEPORT_TIME/2, 0, -40),
          cc.scaleTo(Global.TELEPORT_TIME/2, 1, 1),
          cc.fadeIn(Global.TELEPORT_TIME/2)
        )
      ))
    }



    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.TELEPORT_TIME+0.01);
  }
  // update (dt) {},
});
