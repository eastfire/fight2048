// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Common = require("common");
const Global = require("global");

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
        default: 0,
        visible: false
      },
      y: {
        default: 0,
        visible: false
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.isAllFaceSame = true;
      this.type = "";
      this.subtype = null;
      this.isMergeToSelfType = true;
      this.face = Common.DIRECTION_DOWN;
      this.level = 1;

      this.frozen = 0;
      this.angry = 0;

      this.animateStatus = "stand";

      this.relativePositions = [{x:0, y:0}]; //如果一个movable占据多个格子，positions列出了所有占据的格子坐标, relativePositions列出了所有相对movable的坐标
    },

    onLoad () {

    },
    start () {
      this.currentFrameNumber = 0;
      this.setFrame();
    },
    isMovable(){
      return true;
    },
    setPositionInRoom(x,y){
      this.x = x;
      this.y = y;

      this.positions = [];
      this.relativePositions.forEach((position)=>{
        this.positions.push({x: this.x+position.x, y: this.y+position.y});
      })
      this.calculateEdgePositions();
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
      if ( this.atlas ) {
        var frame = this.atlas.getSpriteFrame(this.getFrameName());
        this.node.getComponent(cc.Sprite).spriteFrame = frame;
      }
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
      this.setFrame();
    },
    beforeMove(opt){
    },
    move(opt){
      this.beforeMove( opt );
      //remove old mapping
      this.positions.forEach((position)=>{
          Global.currentRoom.__movableMap[position.x][position.y] = null;
      })
      //开始移动
      this.__moveSprite(opt);
    },
    __moveSprite(opt){
      cc.log("__moveSprite")
      var increment = Common.INCREMENTS[opt.direction];
      this.node.runAction(cc.sequence(
          //cc.spawn(
              //TODO ADD walk animation
              cc.moveBy(Global.STEP_TIME * opt.step, increment.x * opt.step * Global.TILE_WIDTH, increment.y * opt.step * Global.TILE_HEIGHT ),
          //),
          cc.callFunc(function(){
              this.afterMove(opt);
          },this)
      ))
    },
    afterMove(opt){ //called by view
      cc.log("afterMove")
      var direction = opt.direction;
      var step = opt.step;
      var currentX = this.positions[0].x + step*Common.INCREMENTS[direction].x
      var currentY = this.positions[0].y + step*Common.INCREMENTS[direction].y
      if ( opt.result === Common.SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
          var movable = Global.currentRoom.getMovableByPosition(currentX, currentY);
          this.mergeTo(movable);
      } else if ( opt.result === Common.SHIFT_RESULT_MERGE_AND_STAY ) {
          var movable = Global.currentRoom.getMovableByPosition(currentX, currentY);
          movable.mergeTo(this);
      }
      if ( opt.result !== Common.SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
          this.positions.forEach(function(position){
              position.x += step*Common.INCREMENTS[direction].x;
              position.y += step*Common.INCREMENTS[direction].y;
              Global.currentRoom.__movableMap[position.x][position.y] = this;
          },this);
          this.calculateEdgePositions();
      }
    },
    beforeMergeTo(movable){
    },
    mergeTo(movable){ //合并到目标movable中，自身消失
        this.beforeMergeTo(movable);
        movable.beforeBeMerged(this);
        this.node.emit("mergeTo",this, movable)
        movable.node.emit("beMerged",movable, this)
    },
    afterMergeTo(targetMovable){ //called by view
      targetMovable.afterBeMerged(this);
      Global.currentRoom.removeMovable(this);
    },
    beforeBeMerged(movable){
    },
    afterBeMerged(movable){
        this.level+=movable.level;
        this.levelUp(this.level);
    },
    beforeLevelUp(level){
    },
    levelUp(level){
        this.beforeLevelUp(level);
        this.node.emit("levelUp",this, level)
    },
    afterLevelUp(level){ //called by view
    },
    onTurnStart(){
    },
    onTurnEnd(){
    },
    generate(){
      this.node.setScale(0.1);
      this.node.runAction(
        // cc.sequence(
          cc.scaleTo( Global.GENERATE_TIME, 1,1)
        // )
      )
    },
    // update (dt) {},
});
