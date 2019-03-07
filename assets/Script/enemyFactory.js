const Global = require("global");
const Common = require("common");

cc.Class({
  extends: cc.Component,

  properties: {
  },

  ctor(){
    this.enemyPool = [{type:"slime",subtype:"R"},{type:"slime",subtype:"B"},{type:"slime",subtype:"Y"}];
    // this.enemyPool = [{type:"summoner"}]
    var enemyList = ["archer","balista","catapult","gargoyle","ghost","golem","killerBee","kobold","medusa","mimic","minotaur",
    "mummy","orcChief","orge","ratman","skeleton","shaman","snake","summoner","treant","troll","vampire"]
    var enemyList = ["summoner"]
    this.waitingEnemyPool = [];
    enemyList.forEach(function(type){
      this.waitingEnemyPool.push({type:type})
    },this)

    this.enemyLevelPool = [1];
    this.enemyMaxLevel = 1;
    this.enemyNumber = 2;
  },

  generateEnemy(){
    var tiles = Global.currentRoom.filterTile(function(tile){
        return tile.canGenEnemy() && !Global.currentRoom.getMovableByTile(tile)
      },
    this)
    var number = this.generateEnemyNumber();
    //skill calm FIXME 改为更好的oo设计
    if ( Global.currentRoom.hero.getComponent("hero").getStatus("calm") ) {
      number = 0;
    }
    var candidates = [];
    candidates = Common.sample(tiles, number );

    if ( candidates.length ) {
      candidates.forEach(function(tile){
        this.generateOneEnemy( tile.x, tile.y, this.generateOneEnemyType(), this.generateOneEnemyLevel());
      },this);
      setTimeout(()=>{
        Global.currentRoom.afterGenEnemy();
      }, Global.GENERATE_TIME * 1.2*1000);
    } else {
      Global.currentRoom.afterGenEnemy();
    }
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

      if ( Global.MAX_ENEMY_TYPE_IN_FIELD > this.enemyPool.length ){
        this.enemyPool.unshift( monsterType )
      } else {
        //replace a monster
        this.enemyPool.pop();
        this.enemyPool.unshift( monsterType )
      }
    }

    if ( Global.currentRoom.turn % Global.ENEMY_LEVEL_POOL_CHANGE_PER_TURN == 0) {
      this.enemyMaxLevel ++;
      var minLevel = Math.max(1, this.enemyMaxLevel - Global.MAX_ENEMY_LEVEL_DIFF)
      this.enemyLevelPool = [];
      for ( var i = minLevel; i <= this.enemyMaxLevel; i++) {
        for (var j = 0; j < i - minLevel + 1; j++){
          this.enemyLevelPool.push(this.enemyMaxLevel-i+minLevel);
        }
      }
      cc.log("this.enemyLevelPool"+this.enemyLevelPool)
    }

    if ( Global.currentRoom.turn % Global.ENEMY_NUNBER_CHANGE_PER_TURN == 0) {
      this.enemyNumber = Math.min( this.enemyNumber+1, Global.MAX_GEN_ENEMY_NUMBER );
    }
  }
})
