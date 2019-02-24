const Global = require("global");
const Common = require("common");

cc.Class({
  extends: cc.Component,

  properties: {
  },

  ctor(){
    this.enemyPool = [{type:"slimeR",subtype:"red"},{type:"slimeB",subtype:"blue"},{type:"slimeY",subtype:"yellow"}];
    // this.enemyPool = [{type:"skeleton"}]
    this.waitingEnemyPool = [{type:"medusa"},{type:"skeleton"}]
    this.enemyLevelPool = [1];
    this.enemyMaxLevel = 1;
    this.enemyNumber = 2;
  },
  generateEnemyNumber(){
    return this.enemyNumber;
  },
  generateOneEnemyType(){
    return Common.sample( this.enemyPool);
  },
  generateOneEnemyLevel(){
    return Common.sample( this.enemyLevelPool);
  },
  maintain(turnNumber){
    if ( (Global.currentRoom.turn+16) % Global.ENEMY_POOL_CHANGE_PER_TURN == 0) {
      var monsterType;
      var pass = false;
      do {
        monsterType = Common.sample(this.waitingEnemyPool)
        pass = true;
        for ( var i =0 ; i < this.enemyPool.length; i++ ) {
          if ( this.enemyPool[i].type === monsterType.type ) {
            pass = false;
            break;
          }
        }
      } while(!pass);

      if ( Global.MAX_ENEMY_TYPE_IN_FIELD > this.enemyPool ){
        this.enemyPool.unshift( monsterType )
      } else {
        //replace a monster
        this.enemyPool.pop();
        this.enemyPool.unshift( monsterType )
      }
    }

    if ( Global.currentRoom.turn % Global.ENEMY_LEVEL_POOL_CHANGE_PER_TURN == 0) {
      this.enemyMaxLevel ++;
      this.enemyLevelPool = [];
      for ( var i = 1; i <= this.enemyMaxLevel; i++) {
        for (var j = 0; j < i; j++){
          this.enemyLevelPool.push(this.enemyMaxLevel-i+1);
        }
      }
    }

    if ( Global.currentRoom.turn % Global.ENEMY_NUNBER_CHANGE_PER_TURN == 0) {
      this.enemyNumber = Math.min( this.enemyNumber+1, Global.MAX_GEN_ENEMY_NUMBER );
    }
  }
})
