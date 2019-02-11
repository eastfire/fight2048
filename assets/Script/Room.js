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

const TILE_WIDTH = 120;
const STEP_TIME = 100;
const SHIFT_RESULT_NORMAL = 1;
const SHIFT_RESULT_MERGE_AND_DISAPPEAR = 2;
const SHIFT_RESULT_MERGE_AND_STAY = 3;

cc.Class({
    extends: cc.Component,

    properties: {

      tilePrefabs:[cc.Prefab],
      movablePrefabs:[cc.Prefab],
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.__acceptInput = true;
      this.__movables = [];
      this.initTileMap()
      this.initTiles()
      this.initMovableMap()
      this.initHero()
    },

    start () {

    },
    initMovableMap() {
      this.movableMap = {};
      for ( var i = 0; i < this.movablePrefabs.length; i++ ) {
        this.movableMap[this.movablePrefabs[i].name] = this.movablePrefabs[i]
      }
    },
    initTileMap() {
      this.tileMap = {};
      for ( var i = 0; i < this.tilePrefabs.length; i++ ) {
        this.tileMap[this.tilePrefabs[i].name] = this.tilePrefabs[i]
      }
    },
    initTiles() {
      var initTiles = TILES.tiles6x3;

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
                tile.getComponent(Tile).type = tileEntry.type;
                tile.getComponent(Tile).subtype = tileEntry.subtype;
              }
              if ( tile ) {
                this.node.addChild(tile);
                tile.getComponent(Tile).x = x;
                tile.getComponent(Tile).y = y;
                tile.setPosition(x*tile.width-(this.width-1)*TILE_WIDTH/2, y*tile.height-(this.height-1)*TILE_WIDTH/2);
              }
              this.__tiles[x][y]=tile;
          }
      }
      var maxSize = Math.max(this.width, this.height)

      var padding = 20;

      var scaleRate = (cc.winSize.width - padding*2)/((maxSize-2)*TILE_WIDTH);
      this.node.scaleX = scaleRate;
      this.node.scaleY = scaleRate;
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
    shift(direction){
      var maxStep = this._realShift(direction);
      this.scheduleOnce(()=>{
          this.checkAllMovableMoved();
      }, STEP_TIME * maxStep )
    },
    isAcceptInput(){
      return this.__acceptInput;
    },
    _realShift(direction){
      this.__acceptInput = false;
      var maxStep = 0;

      var movableMapResult = [];
      for ( var i = 0; i < this.width; i++){
          if ( !movableMapResult[i] ) movableMapResult.push([]);
      }
      this.__movables.forEach((movable)=>{
          movable.positions.forEach((position)=>{
              movableMapResult[position.x][position.y] = movable;
          });
      })

      this.__movables.forEach((movable)=>{
          movable._step = 100; //VERY BIG NUMBER
          movable._edgeCalculated = 0;
          movable._shiftResult = SHIFT_RESULT_NORMAL;
          movable._movedThisRound = false;
      });

      Common.traverseMap(movableMapResult, this.width, this.height, Common.REVERSE_DIRECTIONS[direction], (movable, x, y)=>{
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
                            movable._shiftResult = SHIFT_RESULT_MERGE_AND_DISAPPEAR;
                            break;
                        } else if (targetMovable.canMergeTo(movable,direction)) {
                            //can merge
                            stepCount++;
                            movable._shiftResult = SHIFT_RESULT_MERGE_AND_STAY;
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
            if ( movable._step === 0 ){
                movable._movedThisRound = true;
                movable.faceTo(direction);
            } else if ( movable._edgeCalculated >= movable.getEdgePositionLength(direction) ) {
                if ( movable._step > maxStep )
                    maxStep = movable._step;
                movable._movedThisRound = true;

                //maintain movableMapResult
                //remove old mapping
                _.each(movable.get("positions"), function (position) {
                    movableMapResult[position.x][position.y] = null;
                }, this)
                //add new mapping
                if ( movable._shiftResult !== SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
                    var step = movable._step;
                    _.each(movable.get("positions"),function(position){
                        var x = position.x + step*INCREMENTS[direction].x;
                        var y = position.y + step*INCREMENTS[direction].y;
                        movableMapResult[x][y] = movable;
                    },this);
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

    },
    initHero() {
      var hero;
      hero = cc.instantiate(this.movableMap["hero"]);
      hero.x = 1;
      hero.y = 2;
      hero.setPosition(hero.x*TILE_WIDTH-(this.width-1)*TILE_WIDTH/2, hero.y*TILE_WIDTH-(this.height-1)*TILE_WIDTH/2);
      this.node.addChild(hero);
      this.hero = hero;
      this.__movables.push(this.hero)
    },
    // update (dt) {},
});
