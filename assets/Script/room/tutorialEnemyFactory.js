const Global = require("global");
const Storage = require("storage");
const EnemyFactory = require("enemyFactory")

var TutorialEnemyFactory = cc.Class({
  extends: EnemyFactory,

  properties: {
  },

  generateEnemy(){
    if ( !Storage.tutorial.userInput ) {
      if ( Global.currentRoom.turn === 1 ) {
        this.generateOneEnemy(4,3,{
          type:"slime", subtype: "R"
        },1)
        this.generateOneEnemy(5,3,{
          type:"slime", subtype: "R"
        },1)
        this.generateOneEnemy(1,2,{
          type:"slime", subtype: "G"
        },1)
        this.generateOneEnemy(2,2,{
          type:"slime", subtype: "Y"
        },1)
        setTimeout(()=>{
          Global.currentRoom.afterGenEnemy();
        }, Global.GENERATE_TIME * 1.2*1000);
        return;
      }
    }
    this._super();

  },
})
