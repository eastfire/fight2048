const Common = require("common");
const Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
      atlas: {
        default: null,
        type: cc.SpriteAtlas
      },

      title: {
        default: "",
        visible: false
      },
      desc: {
        default: "",
        visible: false
      },
      level: {
        default: 1,
        visible: false,
        notify: function(oldValue){
          if (this.levelLabel) {
            this.levelLabel.string=this.level
          }
        }
      },

    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.accept = [];
      this.isAllFaceSame = true;
      this.type = "";
      this.subtype = null;
      this.isMergeToSelfType = true;
      this.face = Common.DIRECTION_DOWN;
      this.level = 1;
      this._isMovable = true;

      this.animateStatus = "stand";

      this.relativePositions = [{x:0, y:0}]; //如果一个movable占据多个格子，positions列出了所有占据的格子坐标, relativePositions列出了所有相对movable的坐标
      this.status = {};
    },

    onLoad () {
    },
    start () {
      this.currentFrameNumber = 0;
      this.levelLabel = cc.find("levelIcon/levelLabel", this.node);//this.node.getChildByName("levelLabel")
      if ( this.levelLabel ) {
        this.levelLabel = this.levelLabel.getComponent(cc.Label)
        this.levelLabel.string=this.level
      }

      this.statusList = cc.find("statusList",this.node);
      this.statusList = this.statusList && this.statusList.getComponent(cc.Layout);

      this.status={};
      this.setFrame();

//与主屏幕触摸冲突
      // this.node.on('touchend', ( event ) => {
      //   this.showDescDialog()
      // },this)
    },
    onDestroy() {
      this.node.destroy();
    },
    isMovable(){
      return this._isMovable && !this.getStatus("frozen");
    },
    setPositionInRoom(x,y){
      this.positions = [];
      this.relativePositions.forEach((position)=>{
        this.positions.push({x: x+position.x, y: y+position.y});
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
      if (Common.contains(this.accept, movable.type)) return true;
      return false;
    },
    canMergeTo(movable, direction){
      return Common.contains(movable.accept, this.type);
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
      this.__removeOldMapping();
      //开始移动
      this._moveSprite(opt);
    },
    __removeOldMapping(){
      this.positions.forEach((position)=>{
          Global.currentRoom.__movableMap[position.x][position.y] = null;
      })
    },
    setNewPosition(newPosition){
        var oldPosition = this.positions[0];
        var diffX = newPosition.x - oldPosition.x;
        var diffY = newPosition.y - oldPosition.y;
        this.positions.forEach(function(position){
          position.x += diffX;
          position.y += diffY;
          Global.currentRoom.__movableMap[position.x][position.y] = this;
        },this);
        this.calculateEdgePositions();
    },
    _moveSprite(opt){
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
    afterMove(opt){
      var direction = opt.direction;
      var step = opt.step;
      var currentX = this.positions[0].x + step*Common.INCREMENTS[direction].x
      var currentY = this.positions[0].y + step*Common.INCREMENTS[direction].y
      if ( opt.result === Common.SHIFT_RESULT_MERGE_AND_DISAPPEAR ) {
          var movable = Global.currentRoom.getMovableByPosition(currentX, currentY);
          this.mergeTo(movable);
      } else if ( opt.result === Common.SHIFT_RESULT_MERGE_AND_STAY ) {
        cc.log("SHIFT_RESULT_MERGE_AND_STAY")
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
      this.node.runAction(cc.fadeOut(Global.STEP_TIME/2))
      movable.beforeBeMerged(this);
      movable.node.runAction(cc.sequence(
        cc.callFunc(function(){ //合并后立刻移除，否则会怪物影响攻击逻辑
          this.afterMergeTo(movable)
        },this),
        cc.scaleTo((Global.STEP_TIME-0.01)/2, 1.4),
        cc.scaleTo((Global.STEP_TIME-0.01)/2, 1)
      ))

      movable.beMerged(this)
    },
    afterMergeTo(targetMovable){
      targetMovable.afterBeMerged(this);
      Global.currentRoom.removeMovable(this);
    },
    beforeBeMerged(movable){
    },
    beMerged(targetMovalbe){

    },
    afterBeMerged(movable){
      //merge status
      for (var key in movable.status){
        var s = movable.status[key];
        this.gainStatus(s.getComponent("status").statusName, s.duration, s.extra);
      }

      this.beforeLevelUp(this.level);
      this.level+=movable.level;
      this.onLevelUp(this.level)
    },
    beforeLevelUp(level){
    },
    levelUp(level){

    },
    onLevelUp(level){ //called by view
    },
    onTurnStart(){
      this.forEachStatus(function(status){
        if (status.onTurnStart)
          status.onTurnStart(this)
      },this)
    },
    onTurnEnd(){
      this.forEachStatus(function(status){
        if (status.onTurnEnd)
          status.onTurnEnd(this)
      },this)
    },
    generate(){
      this.node.setScale(0.1);
      this.node.runAction(
        // cc.sequence(
          cc.scaleTo( Global.GENERATE_TIME, 1,1)
        // )
      )
    },
    gainStatus(status, turn, extra) {
      cc.log("gainStatus "+status+" turn:"+turn);
      if (!this.statusList) return;
      turn = turn || 1;
      if ( this.getStatus(status) ) {
        this.getStatus(status).addDuration(turn);
        if ( extra )
          this.getStatus(status).setExtra(extra)
        return;
      }
      var statusNode;
      var statusPrefab = Global.currentRoom.statusMap[status];
      if ( statusPrefab ) {
        statusNode = cc.instantiate(statusPrefab)
      } else {
        statusPrefab = Global.currentRoom.statusMap["noIconStatus"]
        statusNode = cc.instantiate(statusPrefab)
        statusNode.addComponent(status);
        statusNode.name = status;
      }

      this.statusList.node.addChild(statusNode)
      //getStatus effect
      statusNode.setScale(0.1)
      statusNode.runAction(cc.sequence(
        cc.scaleTo(Global.LOSE_STATUS_TIME,1.5),
        cc.scaleTo(Global.LOSE_STATUS_TIME,1)
      ))
      var s = statusNode.getComponent("status")
      s.duration = turn;
      if ( extra )
        s.setExtra(extra);
      if ( s.onGain )
        s.onGain(this);
      this.status[status] = s
    },
    lostStatus(status){
      if (!this.statusList) return;
      delete this.status[status];
      var s = cc.find(status, this.statusList.node);
      if ( s ) {
        if ( s.getComponent("status").onLost) {
          s.getComponent("status").onLost(this);
        }
        //lostStatus effect
        s.runAction(cc.sequence(cc.fadeOut(
          Global.LOSE_STATUS_TIME
        ),
        cc.removeSelf()))
      }
    },
    setStatus(list){
      list.forEach(function(s){
        this.gainStatus(s.status, s.last)
      },this)
    },
    getStatus(status){
      if ( !this.status ) return null;
      return this.status[status];
    },
    forEachStatusNode(callback, context){
      if (!this.statusList) return;
      this.statusList.node.children.forEach(function(child){
        callback.call(context, child);
      },this)
    },
    forEachStatus(callback,context){
      for (var key in this.status){
        callback.call(context, this.status[key]);
      }
    },
    showDescDialog(){
      var dialog = cc.instantiate(Global.currentRoomScene.descDialog)
      dialog.getComponent("descDialog").setMovable(this);
      Global.currentRoomScene.node.addChild(dialog)
      return dialog;
    },
    teleport(newPosition, isTurnStart){
      if ( isTurnStart ) {
        //TODO
        this.__changePositionAtTurnStart = Global.currentRoom.turn;
        this.__newPositionAtTurnStart = newPosition;
      } else {
        var drawPosition = Global.currentRoom.getDrawPosition(newPosition)
        this.node.runAction(cc.sequence(
          cc.spawn(
            cc.moveBy(Global.TELEPORT_TIME/2, 0, 40),
            cc.scaleTo(Global.TELEPORT_TIME/2, 0.4, 2),
            cc.fadeOut(Global.TELEPORT_TIME/2)
          ),
          cc.moveTo(0.001,drawPosition.x,drawPosition.y+40),
          cc.spawn(
            cc.moveBy(Global.TELEPORT_TIME/2, 0, -40),
            cc.scaleTo(Global.TELEPORT_TIME/2, 1, 1),
            cc.fadeIn(Global.TELEPORT_TIME/2)
          ),
          cc.callFunc(function(){
            this.__removeOldMapping();
            this.setNewPosition(newPosition);
          },this)
        ))
      }
    },
    beltTo(newPosition){
//TODO
      this.__changePositionAtTurnStart = Global.currentRoom.turn;
      this.__newPositionAtTurnStart = newPosition;
    },
    afterBeltTo(newPosition){
    },
    afterTurnStartStep1(){
      if ( this.__changePositionAtTurnStart === Global.currentRoom.turn ) {
        this.__removeOldMapping();
      }
    },
    afterTurnStartStep2(){
      if ( this.__changePositionAtTurnStart === Global.currentRoom.turn ) {
        this.setNewPosition(this.__newPositionAtTurnStart);
      }
    },
    afterTurnStartStep3(){
    }
    // update (dt) {},
});
