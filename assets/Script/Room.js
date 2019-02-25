// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import TILES from "TileSet";
import Tile from "tile";
import Movable from "movable";
import Enemy from "enemy";
import Common from "common";
import EnemyFactory from "enemyFactory"
const Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {

      tilePrefabs:[cc.Prefab],
      movablePrefabs:[cc.Prefab],
      starPrefab:{
        type:cc.Prefab,
        default: null,
      },
      statusPrefabs:[cc.Prefab],
      turn: {
        default: 1,
        notify(oldValue){
          Global.currentRoomScene.turnLabel.string = this.turn;
        }
      },
      _phase: {
        default:"turnStart",
        notify(oldValue){
          cc.log("PHASE:"+this._phase)
          this.node.emit("PHASE:"+this._phase)
        }
      }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this._acceptInput = true;
      this._movables = [];

      Global.currentRoomScene.turnLabel.string = this.turn;

      this.initMovablePrefabMap()
      this.initTilePrefabMap()
      this.initGenEnemyStrategy();
      this.initTiles()
      this.initEvents();
      this.initMovableMap();
      this.initItem();
      this.initStatusPrefabMap()
      this.initHero();

      this.seen = {"slime":true};

      this.scheduleOnce(this.turnStart, 0.5);
    },
    initMovablePrefabMap() {
      this.movablePrefabMap = {};
      for ( var i = 0; i < this.movablePrefabs.length; i++ ) {
        this.movablePrefabMap[this.movablePrefabs[i].name] = this.movablePrefabs[i]
      }
    },
    initMovableMap(){
      this.__movableMap = [];
      for ( var i = 0; i < this.width; i++){
        if ( !this.__movableMap[i] ) this.__movableMap.push([]);
      }
      this._movables.forEach((movable)=>{
        movable.positions.forEach((position)=>{
            this.__movableMap[position.x][position.y] = movable;
        });
      })
    },
    initTilePrefabMap() {
      this.tileMap = {};
      for ( var i = 0; i < this.tilePrefabs.length; i++ ) {
        this.tileMap[this.tilePrefabs[i].name] = this.tilePrefabs[i]
      }
    },
    initStatusPrefabMap() {
      this.statusMap = {};
      for ( var i = 0; i < this.statusPrefabs.length; i++ ) {
        this.statusMap[this.statusPrefabs[i].name] = this.statusPrefabs[i]
      }
    },
    initTiles() {
      var initTiles = TILES.tiles5x5;

      if ( !initTiles ) return;
      this.__tiles = [];
      this.width = initTiles.length;
      this.height = 0;
      for ( var i = 0; i < this.width; i++){
          if ( !this.__tiles[i] ) this.__tiles.push([]);
      }

      for ( var x = 0; x < this.width; x++){
          if ( !initTiles[x] ) continue;
          var height = initTiles[x].length;
          if ( this.height < height) this.height = height
          for ( var y = 0; y <height; y++){
              var tileEntry = initTiles[x][y];
              if ( !tileEntry ) continue;
              var tile;
              if ( this.tileMap[tileEntry.type] ) {
                tile = cc.instantiate(this.tileMap[tileEntry.type]);
                this.node.addChild(tile);
                tile.setPosition(x*tile.width-(this.width-1)*Global.TILE_WIDTH/2, y*tile.height-(this.height-1)*Global.TILE_HEIGHT/2);
                tile = tile.getComponent(Tile);
                tile.type = tileEntry.type;
                tile.subtype = tileEntry.subtype;
                tile.x = x;
                tile.y = y;
                this.__tiles[x][y]=tile;
              }
          }
      }
      var maxSize = Math.max(this.width, this.height)

      var padding = 20;

      var scaleRate = (cc.winSize.width - padding*2)/((maxSize-2)*Global.TILE_WIDTH);
      this.node.scaleX = scaleRate;
      this.node.scaleY = scaleRate;
    },

    start () {

    },

    getTile(x,y){
      if ( x instanceof Object ) {
        y = x.y;
        x = x.x;
      }
      var tiles = this.__tiles;
      if ( !tiles[x] ) return null;
      return tiles[x][y];
    },
    getMovableByPosition(x,y){
      if ( x instanceof Object ) {
          y = x.y;
          x = x.x;
      }
      if ( !this.__movableMap[x] ) { //out of bound
          cc.error("__movableMap x:"+x+" y:"+y+" out of bound")
          return null;
      };
      return this.__movableMap[x][y]
    },
    getMovableByTile(tile){
      if ( !tile ) return null;
      return this.getMovableByPosition(tile.x, tile.y);
    },
    addMovable(movable,x,y){ //left bottom corner
      if ( x instanceof Object ) {
          y = x.y;
          x = x.x;
      }
      movable.setPosition(x*Global.TILE_WIDTH-(this.width-1)*Global.TILE_WIDTH/2, y*Global.TILE_WIDTH-(this.height-1)*Global.TILE_WIDTH/2);
      this.node.addChild(movable);

      movable = movable.getComponent(Movable);
      movable.setPositionInRoom(x, y)
      movable.positions.forEach((position) => {
          if ( !this.__movableMap[position.x] ) { //out of bound
              cc.error("__movableMap x:"+(position.x)+" y:"+(position.x)+" out of bound")
              return;
          };
          this.__movableMap[position.x][position.y] = movable;
      });
      this._movables.push(movable)
    },
    removeMovable(movable){
      movable.positions.forEach((position) => {
        if ( this.__movableMap[position.x][position.y] === movable )
          delete this.__movableMap[position.x][position.y];
      });
      var index = this._movables.indexOf(movable);
      if ( index !== -1) {
        this._movables.splice(index,1)
      } else {
        cc.warn("Cant find movable in this._movables");
      }
      movable.destroy();
    },

    foreachMovable(callback, context){
      this._movables.forEach(callback,context)
    },
    filterMovable(callback, context){
      return this._movables.filter(callback,context)
    },
    foreachTile(callback,context){
      for ( var x = 0; x < this.width; x++){
        for ( var y = 0; y < this.height; y++){
          var tile = this.getTile(x,y);
          if ( tile ) callback.call(context, tile)
        }
      }
    },
    filterTile(callback, context){
      var tiles = [];
      for ( var x = 0; x < this.width; x++){
        for ( var y = 0; y < this.height; y++){
          var tile = this.getTile(x,y);
          if ( tile && callback.call(context, tile) ) {
            tiles.push(tile)
          }
        }
      }
      return tiles;
    },

    shift(direction){
      this._phase = "movePhase";
      if ( this.hero.getComponent("hero").getStatus("dizzy") )
        direction = Common.REVERSE_DIRECTIONS[direction]
      var maxStep = this._realShift(direction);
      this.scheduleOnce(()=>{
        this.checkAllMovableMoved();
      }, Global.STEP_TIME * (maxStep+1) )
    },
    setAcceptInput(accept) {
      this._acceptInput = accept;
    },
    isAcceptInput(){
      return this._acceptInput;
    },
    _realShift(direction){
      this._acceptInput = false;
      var maxStep = 0;
      var movableMapResult = [];
      for ( var i = 0; i < this.width; i++){
          if ( !movableMapResult[i] ) movableMapResult.push([]);
      }
      this._movables.forEach((movable)=>{
        movable = movable.getComponent(Movable)
        movable.positions.forEach((position)=>{
          movableMapResult[position.x][position.y] = movable;
        });
      })

      this._movables.forEach((movable)=>{
        movable = movable.getComponent(Movable)
        movable._step = 100; //VERY BIG NUMBER
        movable._edgeCalculated = 0;
        movable._shiftResult = Common.SHIFT_RESULT_NORMAL;
        movable._movedThisRound = false;
      });

      Common.traverseMap(movableMapResult, this.width, this.height, Common.REVERSE_DIRECTIONS[direction], (movable, x, y)=>{
        movable = movable.getComponent(Movable)
        if ( !movable._movedThisRound ) {
          if ( movable.isEdgePosition(direction,x,y) ) {
            var stepCount = 0;
            if ( movable.isMovable() ) {
              var stepX = x, stepY = y;
              var increment = Common.INCREMENTS[direction];
              do {
                stepX += increment.x;
                stepY += increment.y;
                var tile = this.getTile(stepX, stepY);
                if (!tile) {
                    //out of bound
                    break;
                }
                if (tile.isPassable(movable)) {
                    var targetMovable = movableMapResult[stepX][stepY]
                    if (!targetMovable) {
                        //empty
                        stepCount++;
                        if (tile.isCapture(movable)) {
                            break;
                        }
                    } else {
                        if (targetMovable.canBeMergedBy(movable,direction)) {
                            //can merge
                            stepCount++;
                            movable._shiftResult = Common.SHIFT_RESULT_MERGE_AND_DISAPPEAR;
                            break;
                        } else if (targetMovable.canMergeTo(movable,direction)) {
                            //can merge
                            stepCount++;
                            movable._shiftResult = Common.SHIFT_RESULT_MERGE_AND_STAY;
                            break;
                        } else {
                            //cant merge
                            break;
                        }
                    }
                } else {
                    break;
                }
              } while (true);
            }
            if ( movable._step > stepCount) {
                movable._step = stepCount;
            }
            movable._edgeCalculated ++;
            movable.faceTo(direction);
            if ( movable._step === 0 ){
                movable._movedThisRound = true;
            } else if ( movable._edgeCalculated >= movable.getEdgePositionLength(direction) ) {
                if ( movable._step > maxStep )
                    maxStep = movable._step;
                movable._movedThisRound = true;

                //maintain movableMapResult
                //remove old mapping
                movable.positions.forEach( function(position) {
                    movableMapResult[position.x][position.y] = null;
                })
                //add new mapping
                if ( movable._shiftResult !== Common.SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
                    var step = movable._step;
                    movable.positions.forEach( function(position){
                        var x = position.x + step*Common.INCREMENTS[direction].x;
                        var y = position.y + step*Common.INCREMENTS[direction].y;
                        movableMapResult[x][y] = movable;
                    });
                }

                var moveOpt = {
                    direction:direction,
                    step:movable._step,
                    result: movable._shiftResult
                }
                movable.move( moveOpt );
            }
          }
        }
      })

      return maxStep;
    },
    checkAllMovableMoved(){
      this.node.emit("all-move-complete");
    },
    passCheckCondition() {
      return false;
    },
    initEvents(){
      this.node.on("all-move-complete", this.heroAttack, this)
      this.node.on("hero-attack-complete", function(){
          if ( !this.passCheckCondition() ) {
            if ( this.hero.getComponent("hero").checkLevelUp() ) {

            } else {
              this.node.emit("enemy-attack-start")
            }
          }
      },this)
      this.node.on("enemy-attack-start", function(){
        this.enemyAttack();
      }, this)
      this.node.on("enemy-attack-complete", function(){
          if ( !this.passCheckCondition() ) {
              this.turnEnd();
          }
      }, this)
    },
    turnEnd(){
      this._phase = "turnEnd";
      this._movables.forEach(function(movable){
        movable.onTurnEnd();
      },this)
      this.turn++;
      this.enemyFactory.maintain(this.turn);
      this.turnStart();
    },
    initHero() {
      var hero;
      hero = cc.instantiate(this.movablePrefabMap["hero"]);
      var heroX = 4;
      var heroY = 2;
      this.hero = hero;
      this.addMovable(this.hero, heroX, heroY)

      // Global.currentRoomScene.gainSkill("crossSlashSkill")
    },
    initGenEnemyStrategy() {
      this.enemyFactory = new EnemyFactory();
    },
    initItem() {
      this.itemPool = ["potion"]
    },
//PHASE
    turnStart(){
      this._phase = "turnStart"
      this._movables.forEach(function(movable){
        movable.onTurnStart();
      },this)
      this.generateEnemy();
    },
    generateOneItemType(){
      return Common.sample( this.itemPool );
    },
    generateOneItemLevel(enemyLevel){
      return Math.min(9,Math.ceil(enemyLevel/4));
    },
    generateOneItem(position, enemyLevel){
      if ( this.itemPool.length ) {
        var itemLevel = this.generateOneItemLevel(enemyLevel) + Global.ITEM_LEVEL_ADJUST;
        if ( itemLevel <= 0 ) return;

        var itemType = this.generateOneItemType();
        if ( this.movablePrefabMap[itemType] ) {
          var item = cc.instantiate(this.movablePrefabMap[itemType]);
          item.getComponent("item").level = itemLevel;
          this.addMovable(item, position.x, position.y)

          if ( !this.seen[itemType] ) {
            this.seen[itemType] = true;
            item.getComponent("movable").showDescDialog();
          }
        } else {
          cc.error("item type:"+itemType+" not registered")
        }
      }
    },
    generateOneEnemy(x,y, typeObj, level){
      var type = typeof typeObj === "string" ? typeObj: typeObj.type;
      var subtype = typeof typeObj === "string" ? typeObj: typeObj.subtype;
      var prefab = this.movablePrefabMap[type];
      if ( !prefab ) {
        prefab = this.movablePrefabMap[type+subtype];
      }
      if ( prefab ) {
        //FIXME : only single block enemy here
        var enemy = cc.instantiate( prefab );
        enemy.getComponent("enemy").subtype = subtype;
        enemy.getComponent("enemy").level = level;
        this.addMovable(enemy, x, y);
        enemy.getComponent(Movable).generate();

        if ( !this.seen[type] ) {
          this.seen[type] = true;
          enemy.getComponent("movable").showDescDialog();
        }
      } else {
        cc.error("enemy type:"+type+" not registered")
      }
    },
    generateEnemy(){
      this._phase = "generateEnemy"

      var tiles = this.filterTile(function(tile){
          return tile.canGenEnemy() && !this.getMovableByTile(tile)
        },
      this)
      var number = this.enemyFactory.generateEnemyNumber();
      var candidates = [];
      candidates = Common.sample(tiles, number );

      if ( candidates.length ) {
        candidates.forEach(function(tile){
          this.generateOneEnemy( tile.x, tile.y, this.enemyFactory.generateOneEnemyType(), this.enemyFactory.generateOneEnemyLevel());
        },this);
        setTimeout(()=>{
          this.afterGenEnemy();
        }, Global.GENERATE_TIME * 1.2*1000);
      } else {
        this.afterGenEnemy();
      }
    },
    afterGenEnemy(){
      this._phase="waitUserInput";
      this._acceptInput = true;
    },
    heroAttack(){
      this._phase = "heroAttack"
      this.hero.getComponent("hero").normalAttack();
    },
    getDrawPosition(x,y){
      if ( x instanceof  Object ) {
        y = x.y;
        x = x.x
      }
      return {
        x: x* Global.TILE_WIDTH-(this.width-1)*Global.TILE_WIDTH/2,
        y: y* Global.TILE_HEIGHT-(this.height-1)*Global.TILE_HEIGHT/2
      }
    },
    enemyAttack(){
      this._phase = "enemyAttack"
      var attackHappened = false;

      this.foreachMovable(function(movable){
        var enemy = movable.getComponent("enemy")
        if ( enemy ) {
          if (enemy.canAttack(this.hero.getComponent("hero")) ) {
            attackHappened = true;
            enemy.attackHero(this.hero.getComponent("hero"));
          } else {
            enemy.passAttack();
          }
        }
      },this)
      if ( !attackHappened ) {
        cc.log("PHASE:enemyAttack skipped")
        this.node.emit("enemy-attack-complete",this)
      }
    },
    checkAllEnemyAttacked(){
      if (Common.all(this._movables,function(movable){
        if ( movable.getComponent(Enemy) ) {
          return movable.getComponent(Enemy).attackOver
        } else return true;
      },this)) {
        this.node.emit("enemy-attack-complete",this)
      }
    },

    // update (dt) {},
});
