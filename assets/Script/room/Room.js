const TILES = require("TileSet");
const Tile = require("tile");
const Movable = require("movable");
const Enemy = require("enemy");
const Common = require("common");
const EnemyFactory = require("enemyFactory");
const ItemFactory = require("itemFactory");
const Global = require("global");
const Storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {

      tilePrefabs:[cc.Prefab],
      movablePrefabs:[cc.Prefab],
      starPrefab:cc.Prefab,
      cloudPrefab:cc.Prefab,
      arrowPrefab:cc.Prefab,
      stonePrefab:cc.Prefab,
      fireballPrefab:cc.Prefab,
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
      this._acceptInput = 0;
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
      this.initMovalbe();

      this.initTutorial();

      this.scheduleOnce(this.turnStart, 0.1);
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

      var scaleRate = (cc.winSize.width - Global.ROOM_PADDING*2)/((maxSize-2)*Global.TILE_WIDTH);
      this.node.scaleX = scaleRate;
      this.node.scaleY = scaleRate;

      //TODO get corner from entry
      this.corners = [
        {x:1,y:1},
        {x:1,y:this.width-2},
        {x:this.height-2,y:this.width-2},
        {x:this.height-2,y:1},
      ];

    },

    click(x,y){
      var scale = this.node.scaleX
      var tile = this.__tiles[0][0]
      x = (x-cc.winSize.width/2)/scale - tile.node.x + Global.TILE_WIDTH/2
      y = (y-cc.winSize.height/2-this.node.y)/scale - tile.node.y + Global.TILE_HEIGHT/2
      var roomX = Math.floor( x / Global.TILE_WIDTH )
      var roomY = Math.floor( y / Global.TILE_HEIGHT )
      var movable = this.getMovableByPosition(roomX,roomY)
      if ( movable ) {
        movable.showDescDialog();
      }
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
        if ( this.hero.getComponent("hero").checkDead() ) {
          return;
        }
        this.resolveMergeEffect();
      }, Global.STEP_TIME * (maxStep)+0.02 )
    },
    resolveMergeEffect(){
      this._phase = "resolveMerge";
      this.delayPhaseTime = 0;
      this.foreachMovable(function(movable){
        if ( movable.resolveMerge ) {
          movable.resolveMerge()
        }
      },this);
      this.scheduleOnce(()=>{
        if ( this.hero.getComponent("hero").checkDead() ) {
          return;
        }
        this.heroAttack();
      },this.delayPhaseTime)
    },
    setAcceptInput(accept) {
      if ( accept ) {
        this._acceptInput++;
      } else {
        this._acceptInput--;
      }
    },
    isAcceptInput(){
      return this._acceptInput > 0;
    },
    _realShift(direction){
      this.setAcceptInput(false);
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
              } while (stepCount < movable.moveStep);
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
    passCheckCondition() {
      return false;
    },
    initEvents(){
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
      this.delayPhaseTime = 0;
      this._movables.forEach(function(movable){
        movable.onTurnEnd();
      },this)
      this.foreachTile(function(tile){
        tile.onTurnEnd();
      },this)
      Storage.saveStatistics()
      if ( this.hero.getComponent("hero").checkDead() ) {
        return;
      }
      if ( this.delayPhaseTime ) {
        this.scheduleOnce(()=>{
          if ( this.hero.getComponent("hero").checkLevelUp() ) {

          } else {
            this.afterTurnEnd();
          }
        },this.delayPhaseTime)
      } else {
        if ( this.hero.getComponent("hero").checkLevelUp() ) {

        } else {
          this.afterTurnEnd();
        }
      }
    },
    afterTurnEnd(){
      this.turn++;
      this.enemyFactory.maintain(this.turn);
      this.turnStart();
    },
    setDelayPhaseTime(time){
      this.delayPhaseTime = Math.max(this.delayPhaseTime, time)
    },
    initHero() {
      var hero;
      hero = cc.instantiate(this.movablePrefabMap["hero"]);
      hero.getComponent("hero").subtype = Global.currentHeroType
      this.hero = hero;
      this.addMovable(this.hero, Global.initHero.position.x, Global.initHero.position.y)


      Global.initHero.skill.forEach(function(opt){
        var level = 1;
        var countDown = 0;
        var forbid = false;
        var skillName = opt;
        if ( typeof opt === "object" ) {
          level = opt.level || level;
          countDown = opt.countDown || countDown;
          forbid = opt.forbid || forbid;
          skillName = opt.name;
        }
        var skill = Global.currentRoomScene.gainSkill(skillName)
        skill.initProperties(level,countDown,forbid)
      },this)
      setTimeout(()=>{
        Global.initHero.status.forEach(function(opt){
          var statusName = opt;
          var duration = -1;
          var extra = null;
          if ( typeof opt === "object" ) {
            duration = opt.duration || duration;
            extra = opt.extra;
            statusName = opt.name;
          }
          this.hero.getComponent("hero").gainStatus(statusName,duration, extra)
        },this)
      },10);
    },
    initMovalbe(){
      Global.initMovable.forEach(function(entry){
        if ( entry.isEnemy ) {
          var enemy = this.enemyFactory.generateOneEnemy(entry.position.x, entry.position.y, {
            type: entry.type, subtype: entry.subtype
          }, entry.level || 1);
          if ( entry.status && entry.status.length ) {
            setTimeout(()=>{
              entry.status.forEach(function(opt){
                var statusName = opt;
                var duration = -1;
                var extra = null;
                if ( typeof opt === "object" ) {
                  duration = opt.duration || duration;
                  extra = opt.extra;
                  statusName = opt.name;
                }
                enemy.getComponent("movable").gainStatus(statusName,duration, extra)
              },this)
            },10);
          }
        } else if ( entry.isItem ) {
          this.itemFactory.generateOneItem(entry.position, entry.type, entry.level || 1)
        }
      },this)
    },
    initGenEnemyStrategy() {
      this.enemyFactory = new EnemyFactory();
    },
    initItem() {
      this.itemFactory = new ItemFactory();
    },
//PHASE
    turnStart(){
      this._phase = "turnStart"
      this._movables.forEach(function(movable){
        movable.onTurnStart();
      },this)
      this.foreachTile(function(tile){
        tile.onTurnStart();
      },this)
      this.generateEnemy();
      if ( this.hero.getComponent("hero").checkDead() ) {
        return;
      }
    },

    generateEnemy(){
      this._phase = "generateEnemy"

      this.enemyFactory.generateEnemy();
      this.itemFactory.generateItemOnTurnStar();
    },
    afterGenEnemy(){
      this._phase="waitUserInput";
      this.setAcceptInput(true);
    },
    heroAttack(){
      this._phase = "heroAttack"
      this.delayPhaseTime = 0;
      this.foreachMovable(function(movable){
        if ( !movable.getComponent("hero") && movable.beforeHeroNormalAttack ) {
          movable.beforeHeroNormalAttack();
        }
      },this)
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
    initTutorial(){
      if ( !Storage.tutorial.userInput ) {
        this.node.on("PHASE:waitUserInput",function(){
          cc.log("xXXXXXXXxxx")
          cc.director.pause();
          this.node.scheduleOnce(function(){
            cc.director.resume();
          },5)
        },this)
      }
    }
    // update (dt) {},
});
