const Global = require("global");
const Storage = require("storage");
const Common = require("common");

cc.Class({
  extends: cc.Component,

  properties: {
  },

  ctor(){
    this.itemPool = Global.ITEM_POOL;
    this.heroTombGenerated = false;
  },

  generateOneItemType(){
    return Common.sample( this.itemPool );
  },
  generateOneItemLevel(enemyLevel){
    return Math.min(9,Math.ceil(enemyLevel/4));
  },
  generateOneRandomItem(position, enemyLevel){
    if ( this.itemPool.length ) {
      var itemLevel = this.generateOneItemLevel(enemyLevel) + Global.ITEM_LEVEL_ADJUST;
      if ( itemLevel <= 0 ) return;

      var itemType = this.generateOneItemType();
      this.generateOneItem(position, itemType, itemLevel);
    }
  },
  generateOneItem(position, itemType, itemLevel){
    if ( Global.currentRoom.movablePrefabMap[itemType] ) {
      var item = cc.instantiate(Global.currentRoom.movablePrefabMap[itemType]);
      item.getComponent("item").level = itemLevel;
      Global.currentRoom.addMovable(item, position.x, position.y)
      if ( !Storage.progress.seenItem[itemType] ) {
        Storage.progress.seenItem[itemType] = 1;
        Storage.saveProgress();
        item.getComponent("movable").showDescDialog();
      }
    } else {
      cc.error("item type:"+itemType+" not registered")
    }
  },

  generateItemOnTurnStar(){
    if ( !this.heroTombGenerated &&
      Storage.statistics.lastGame.turn &&
      Storage.statistics.lastGame.turn >= Global.HERO_TOMB_THRESHOLD &&
      Global.currentRoom.turn > Storage.statistics.lastGame.turn  ) {
    // if ( !this.heroTombGenerated ) {
      //find a position for tomb
      var position = Common.sample(Global.currentRoom.corners);
      cc.log(position)
      if ( !Global.currentRoom.getMovableByPosition(position) ) {
        this.heroTombGenerated = true;
        this.generateOneItem(position, "tomb", Storage.statistics.lastGame.level)
      }
    }
  }
})
