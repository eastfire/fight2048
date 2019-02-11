// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Common from "common";

cc.Class({
    extends: cc.Component,

    properties: {
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
      atlas: {
        default: null,
        type: cc.SpriteAtlas
      },
      x: {
        default: 0
      },
      y: {
        default: 0
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.isAllFaceSame = true;
      this.type = "";
      this.subtype = null;
      this.isMergeToSelfType = true;
      this.face = Common.DIRECTION_DOWN;
      this._level = 1;

      this.frozen = 0;
      this.angry = 0;

      this.animateStatus = "stand";
    },

    onLoad () {
    },

    start () {
      this.currentFrameNumber = 0;
      this.initPosition();
      this.calculateEdgePositions();
      this.setFrame();
    },
    isMovable(){
      return true;
    },
    initPosition(){
      this.positions = [{x:this.x, y:this.y}];
    },
    calculateEdgePositions(){
      this.edgePositions = [[],[],[],[]];
      this.positions.forEach(function(position){
          if ( ( this.edgePositions[Common.DIRECTION_UP][position.x] === undefined ) ||
              ( this.edgePositions[Common.DIRECTION_UP][position.x].y < position.y ) ) {
              this.edgePositions[Common.DIRECTION_UP][position.x] = position
          }
          if ( ( this.edgePositions[Common.DIRECTION_DOWN][position.x] === undefined ) ||
              ( this.edgePositions[Common.DIRECTION_DOWN][position.x].y > position.y ) ) {
              this.edgePositions[Common.DIRECTION_DOWN][position.x] = position
          }
          if ( ( this.edgePositions[Common.DIRECTION_RIGHT][position.y] === undefined ) ||
              ( this.edgePositions[Common.DIRECTION_RIGHT][position.y].x < position.x ) ) {
              this.edgePositions[Common.DIRECTION_RIGHT][position.y] = position
          }
          if ( ( this.edgePositions[Common.DIRECTION_LEFT][position.y] === undefined ) ||
              ( this.edgePositions[Common.DIRECTION_LEFT][position.y].x > position.x ) ) {
              this.edgePositions[Common.DIRECTION_LEFT][position.y] = position
          }
      },this )
      this.edgePositionLength = [];
      Common.DIRECTIONS.forEach((direction)=>{
          this.edgePositionLength[direction] = this.edgePositions[direction].filter(function(p){
              return p;
          }).length;
      })
    },
    setFrame(){
      var frame = this.atlas.getSpriteFrame(this.getFrameName());
      this.node.getComponent(cc.Sprite).spriteFrame = frame;
    },
    getFrameName(){
      if ( this.isAllFaceSame ) {
        return this.type + this.subtype?("-"+this.subtype):"";
      } else {
        return this.type + (this.subtype?("-" + this.subtype):"") + this.face + this.animateStatus + this.currentFrameNumber
      }
    },
    isEdgePosition(direction,x,y){
        if ( x instanceof Object ) {
          y = x.y;
          x = x.x;
        }
        for ( var i = 0; i < this.edgePositions[direction].length; i++) {
          var position = this.edgePositions[direction][i];
          if (position && position.x === x && position.y === y){
            return true;
          }
        }
        return false;
    },
    getEdgePositionLength(direction){
      return this.edgePositionLength[direction];
    },
    canBeMergedBy(movable, direction){
      if ( this.isMergeToSelfType
          && movable.type === this.type
          && movable.subtype === this.subtype ) {
          return true;
      }
      if (Common.contains(this.canMergeTo, movable.type)) return true;
      if (Common.contains(movable.canMergeTo, this.type)) return true;
      return false;
    },
    canMergeTo(movable, direction){
      return Common.contains(movable.canMergeTo, this.type);
    },
    faceTo(direction) {
      this.face = direction;
    },
    beforeMove(opt){
    },
    move(opt){
        this.face = opt.direction;
        this.beforeMove( opt );
        //remove old mapping
        this.positions.forEach((position)=>{
            currentRoom.__movableMap[position.x][position.y] = null;
        })

        this.trigger("move",this, opt)
    },
    afterMove(opt){ //called by view
        var direction = opt.direction;
        var step = opt.step;
        var currentX = this.get("positions")[0].x + step*INCREMENTS[direction].x
        var currentY = this.get("positions")[0].y + step*INCREMENTS[direction].y
        if ( opt.result === SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
            var movable = currentRoom.getMovableByPosition(currentX, currentY);
            this.mergeTo(movable);
        } else if ( opt.result === SHIFT_RESULT_MERGE_AND_STAY ) {
            var movable = currentRoom.getMovableByPosition(currentX, currentY);
            movable.mergeTo(this);
        }
        if ( opt.result !== SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
            _.each(this.get("positions"),function(position){
                position.x += step*INCREMENTS[direction].x;
                position.y += step*INCREMENTS[direction].y;
                currentRoom.__movableMap[position.x][position.y] = this;
            },this);
            this.calculateEdgePositions();
        }
    },
    beforeMergeTo(movable){
    },
    mergeTo(movable){ //合并到目标movable中，自身消失
        this.beforeMergeTo(movable);
        movable.beforeBeMerged(this);
        this.trigger("mergeTo",this, movable)
        movable.trigger("beMerged",movable, this)
    },
    afterMergeTo(targetMovable){ //called by view
      targetMovable.afterBeMerged(this);
      currentRoom.removeMovable(this);
    },
    beforeBeMerged(movable){
    },
    afterBeMerged(movable){
        this._level+=movable._level;
        this.levelUp(this._level);
    },
    beforeLevelUp(level){
    },
    levelUp(level){
        this.beforeLevelUp(level);
        this.trigger("levelUp",this, level)
    },
    afterLevelUp(level){ //called by view
    },
    onTurnStart(){
    },
    onTurnEnd(){
    }
    // update (dt) {},
});
