const Global = require("global");
const Storage = require("storage");
const Common = require("common");

cc.Class({
  extends: cc.Component,

  properties: {
  },

  ctor() {
    this.itemPool = Global.ITEM_POOL;
    this.heroTombGenerated = false;
  },

  generateOneItemType() {
    return Common.sample(this.itemPool);
  },
  generateOneItemLevel(enemyLevel) {
    return Math.min(6, Math.ceil(enemyLevel / Global.STAR_THRESHOLD));
  },
  generateOneRandomItem(position, enemyLevel) {
    if (this.itemPool.length) {
      var itemLevel = this.generateOneItemLevel(enemyLevel) + Global.ITEM_LEVEL_ADJUST;
      if (Global.currentRoom.hero.getComponent("hero").getStatus("treasure")) {
        itemLevel = Math.min(1, itemLevel)
      }
      if (itemLevel <= 0) return;

      var itemType = this.generateOneItemType();
      this.generateOneItem(position, itemType, itemLevel);
    }
  },
  generateOneItem(position, itemType, itemLevel) {
    if (Global.currentRoom.movablePrefabMap[itemType]) {
      var item = cc.instantiate(Global.currentRoom.movablePrefabMap[itemType]);
      item.getComponent("item").level = itemLevel;
      Global.currentRoom.addMovable(item, position.x, position.y)      
    } else {
      cc.error("item type:" + itemType + " not registered")
    }
  },

  generateItemOnTurnStar() {
    //TODO 随机位置
    var position = Common.sample(Global.currentRoom.corners);
    // TODO 随机类型
    var tiles = Global.currentRoom.filterTile(function (tile) {
      return tile.canGenEnemy() && !Global.currentRoom.getMovableByTile(tile)
    },
      this)
    var number = 2;

    var candidates = [];
    candidates = Common.sample(tiles, number);

    if (candidates.length) {
      candidates.forEach(function (tile) {
        this.generateOneItem({x:tile.x, y:tile.y}, this.generateOneItemType(), 1);
      }, this);
    } else {
      
    }
  }
})
