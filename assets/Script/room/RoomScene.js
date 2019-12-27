const Room = require("Room");
const Common = require("common");
const Global = require("global");
const Storage = require("storage");

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_DIRECTION = {}
KEY_DIRECTION[KEY_UP] = 0;
KEY_DIRECTION[KEY_RIGHT] = 1;
KEY_DIRECTION[KEY_DOWN] = 2;
KEY_DIRECTION[KEY_LEFT] = 3;

const SWIPE_THRESHOLD_WIDTH = 20;
const SWIPE_THRESHOLD = 50;

cc.Class({
    extends: cc.Component,

    properties: {
      turnLabel: cc.Label,
      room: Room,
      effectLayer: cc.Node,
      exitButton: cc.Button,

      gameOverDialog: cc.Prefab,
      dieDialog: cc.Prefab,
      shiftArrowSprite: cc.Sprite,
      exitDialog: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      Global.currentRoomScene = this;
      Global.currentRoom = this.room;
      this.initEvent();
    },

    onDestroy(){
      this.node.off('touchstart');
      this.node.off('touchmove');
      this.node.off('touchend');
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);

      Global.currentRoom = null;
      Global.currentRoomScene = null;
      cc.audioEngine.stopMusic();
    },
    start () {
    },
    gainScore(score) {
    },
    gainStar(star){
    },
    initEvent() {
      this.node.on('touchstart', ( event ) => {
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          if (this.room.node.getBoundingBoxToWorld().contains(locationInNode)) {
              this.prevX = locationInNode.x;
              this.prevY = locationInNode.y;
              return true;
          }
        }
      });
      this.node.on('touchmove', ( event) => {
        if (!this.room.isAcceptInput()) return;
        var locationInNode = event.getLocation();
        if (!this.room.node.getBoundingBoxToWorld().contains(locationInNode))
          return;
        var currentX = locationInNode.x;
        var currentY = locationInNode.y;
        if ( this.prevX === null ) {
          this.prevX = locationInNode.x;
          this.prevY = locationInNode.y;
          return;
        }

        var deltaX = currentX - this.prevX;
        var deltaY = currentY - this.prevY;
        var isDizzy = false;//Global.currentRoom.hero.getComponent("hero").getStatus("dizzy");
        if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation=isDizzy? 180:0;
        } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy? 0:180;
        } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy?270:90;
        } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy?90:270;
        } else {
          this.shiftArrowSprite.node.opacity = 0;
        }
      })
      this.node.on('touchend', ( event ) => {
        this.shiftArrowSprite.node.opacity = 0;
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          if (!this.room.node.getBoundingBoxToWorld().contains(locationInNode))
            return;
          var currentX = locationInNode.x;
          var currentY = locationInNode.y;

          var deltaX = currentX - this.prevX;
          var deltaY = currentY - this.prevY;
          var shiftHappend = false;
          if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
            this.room.shift(Common.DIRECTION_UP)
          } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
            this.room.shift(Common.DIRECTION_DOWN)
          } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
            this.room.shift(Common.DIRECTION_RIGHT)
          } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
            this.room.shift(Common.DIRECTION_LEFT)
          } else {
            this.room.click(currentX, currentY)
          }
          this.prevX = this.prevY = null;
        }
      });
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ( event ) => {
        if (this.room.isAcceptInput()) {
          var key = event.keyCode;
          if ( KEY_DIRECTION[key] !== undefined ) {
              this.room.shift(KEY_DIRECTION[key])
          }
        }
      });
    
    },

    initRules() {

    },
    gameOver(reason){
      var dialog = cc.instantiate(this.gameOverDialog)
      dialog.getComponent("gameOverDialog").setReason(reason);
      Global.currentRoomScene.node.addChild(dialog)
    },

    exitGame(){
      if ( Global.currentRoom.isAcceptInput() ) {
        var dialog = cc.instantiate(this.exitDialog);
        this.node.addChild(dialog)
      }
    },

    dying(isDying){
      
    }
    // update (dt) {},
});
