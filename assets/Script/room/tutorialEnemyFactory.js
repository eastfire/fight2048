const Global = require("global");
const Storage = require("storage");
const EnemyFactory = require("enemyFactory")

var TutorialEnemyFactory = cc.Class({
  extends: EnemyFactory,

  properties: {
  },

  generateEnemy(){
    if ( Global.roomEntry.isTutorial ) {
      setTimeout(()=>{
        Global.currentRoom.afterGenEnemy();
      }, Global.GENERATE_TIME * 1.2*1000);
      return;
    }
    this._super();
  },
})
