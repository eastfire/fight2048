const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "藤蔓怪";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并时在场上生成藤蔓。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        var l = this.level + this.star;
        return Math.round(l*1.5*Global.EXP_INFLATION_RATE);//一般
      },
      override: true
    },
    attack: {
      get(){
        return 2*((this.level)*2-1);//一般
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "chomper"
  },
  beforeMove(){
    this._super();
    this.mergeCount = 0;
  },
  afterBeMerged(movable){
    this._super(movable);
    if ( movable.getComponent("chomper") ) {
      this.mergeCount++;
      //如果产生的新敌人正好在英雄的新位置，会产生错误。所以先记录，然后在resolve merge时产生敌人
    }
  },
  resolveMerge(){
    for ( var i = 0; i < this.mergeCount; i++) {
      var emptyTiles = Global.currentRoom.filterTile(function(tile){
        return tile.getComponent("tile").isPassable(this) && !Global.currentRoom.getMovableByTile(tile)
      },this)
      var tile = Common.sample(emptyTiles);
      Global.currentRoom.enemyFactory.generateOneEnemy(tile.x, tile.y, "vines", 1);
    }
    if ( this.mergeCount ) {
      Global.currentRoom.setDelayPhaseTime(Global.GENERATE_TIME);
    }
  }
  // update (dt) {},
});
