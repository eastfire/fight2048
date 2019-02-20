// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Room = require("Room");
const Common = require("common");
const Global = require("global");

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
      scoreLabel:{
        default: null,
        type: cc.Label
      },
      turnLabel:{
        default: null,
        type: cc.Label
      },
      moneyLabel:{
        default: null,
        type: cc.Label
      },
      lifeLabel:{
        default: null,
        type: cc.Label
      },
      expLabel:{
        default: null,
        type: cc.Label
      },
      room: {
        default: null,
        type: Room
      }
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
      this.initEvent();
      Global.currentRoom = this.room;
      Global.currentRoomScene = this;
    },

    onDestroy(){
      this.node.off('touchstart');
      this.node.off('touchend');
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);

      Global.currentRoom = null;
      Global.currentRoomScene = null;
    },
    start () {
      this.score = 0;
      this.scoreLabel.string = this.score
    },
    gainScore(score) {
      this.score += score;
      this.scoreLabel.string = this.score
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
      this.node.on('touchend', ( event ) => {
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          var currentX = locationInNode.x;
          var currentY = locationInNode.y;
          if ( Math.abs(currentX - this.prevX) < SWIPE_THRESHOLD_WIDTH ) {
              if ( currentY > this.prevY + SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_UP)
              } else if ( currentY < this.prevY - SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_DOWN)
              }
          }
          if ( Math.abs(currentY - this.prevY) < SWIPE_THRESHOLD_WIDTH ) {
              if ( currentX > this.prevX + SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_RIGHT)
              } else if ( currentX < this.prevX - SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_LEFT)
              }
          }
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



    // update (dt) {},
});
