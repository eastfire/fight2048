const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const Boss = require("boss")

var EnemyFactory = cc.Class({
  extends: cc.Component,

  statics: {
    checkTileForBoss(tile, considerMovable){
      var tempBoss = new Boss();
      for ( var i = 0; i < tempBoss.relativePositions.length; i++){
        var position = tempBoss.relativePositions[i];
        var x = tile.x + position.x;
        var y = tile.y + position.y;
        var checkTile = Global.currentRoom.getTile(x,y)
        if ( !checkTile || !checkTile.canGenEnemy() ) {
          return false;
        } else if ( considerMovable && Global.currentRoom.getMovableByTile(checkTile) ) {
          return false;
        }
      }
      return true;
    },
  },

  properties: {
  },

  ctor(){
    this.enemyPool = [];
    Global.initEnemyPool.forEach(function(entry){ //克隆一份
      this.enemyPool.push(entry)
    },this);
    // this.enemyPool = [{type:"summoner"}]
    this.waitingEnemyPool = [];
    Global.enemyList.forEach(function(type){
      this.waitingEnemyPool.push({type:type})
    },this)

    this.lastBossAppearTurn = 0;
    this.bossAppearTime = 0;
    this.enemyLevelPool = [1];
    this.enemyMaxLevel = 1;
    this.enemyNumber = 2;

    this.bossList = Global.bossPool;
  },

  generateEnemy(){
    if ( this.lastBossAppearTurn + Global.BOSS_APPEAR_PER_TURN < Global.currentRoom.turn ) {
      var boss = this.generateBoss();
      if ( boss ) { //有地方产生boss
        this.lastBossAppearTurn = Global.currentRoom.turn;
        this.bossAppearTime++;
        setTimeout(()=>{
          Global.currentRoom.afterGenEnemy();
        }, Global.GENERATE_TIME * 1.2*1000);
        return;
      }
    }

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

  generateBoss(){
    if ( Global.currentRoom.filterMovable(function(movable){
      return movable.isBoss;
    },this).length ) {
      return null;
    }
    var boss = null;
    var tiles = Global.currentRoom.filterTile(function(tile){
        return EnemyFactory.checkTileForBoss(tile, true)
      },
    this)
    var candidate = Common.sample(tiles)
    if ( candidate ) {
      boss = this.generateOneEnemy( candidate.x, candidate.y, Common.sample(this.bossList), this.bossAppearTime+1);
    } else {
    }
    return boss;
  },



  generateOneEnemy(x,y, typeObj, level){
    var type = typeof typeObj === "string" ? typeObj: typeObj.type;
    var subtype = typeof typeObj === "string" ? typeObj: typeObj.subtype;
    var prefab = Global.currentRoom.movablePrefabMap[type];
    if ( !prefab ) {
      prefab = Global.currentRoom.movablePrefabMap[type+subtype];
    }
    var enemy = null;
    if ( prefab ) {
      enemy = cc.instantiate( prefab );
      enemy.getComponent("enemy").subtype = subtype;
      enemy.getComponent("enemy").level = level;
      Global.currentRoom.addMovable(enemy, x, y);
      enemy.getComponent("movable").generate();

      if ( !Storage.progress.seen[type] ) {
        Storage.progress.seen[type] = 1;
        Storage.saveProgress();
        enemy.getComponent("movable").showDescDialog();
      }
    } else {
      cc.error("enemy type:"+type+" not registered")
    }
    return enemy;
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
      var candidateEnemyPool = [];
      var skillCount = Global.currentRoomScene.activeSkillCount()
      this.waitingEnemyPool.forEach(function(monsterType){
        var type = monsterType.type;
        if ( skillCount <= 0 &&
          //FIXME 改为更好的oo设计
          (type === "gargoyle" || type === "kobold")) {
          return;
        }
        for ( var i =0 ; i < this.enemyPool.length; i++ ) {
          if ( this.enemyPool[i].type === type ) {
            return;
          }
        }
        candidateEnemyPool.push(monsterType)
      },this);
      if ( candidateEnemyPool.length <= 0 ) {
        cc.warn("this.waitingEnemyPool is too small")
        return;
      }
      monsterType = Common.sample(candidateEnemyPool)

      if ( Global.MAX_ENEMY_TYPE_IN_FIELD > this.enemyPool.length ){
        this.enemyPool.unshift( monsterType )
      } else {
        //replace a monster
        this.enemyPool.pop();
        this.enemyPool.unshift( monsterType )
      }
      cc.log(this.enemyPool)
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
