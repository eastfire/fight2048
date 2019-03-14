import Global from "global"
import Common from "common"

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
        return (this.level+this.star)*2-1;//一般
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "chomper"
  },
  afterBeMerged(movable){
    this._super(movable);
    if ( movable.getComponent("chomper") ) {
      var emptyTiles = Global.currentRoom.filterTile(function(tile){
        return tile.getComponent("tile").isPassable(this) && !Global.currentRoom.getMovableByTile(tile)
      },this)
      var tile = Common.sample(emptyTiles);
      Global.currentRoom.enemyFactory.generateOneEnemy(tile.x, tile.y, "vines", 1);
    }
  },

  // update (dt) {},
});
