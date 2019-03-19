const Global = require("global");
const Common = require("common");

cc.Class({
    extends: cc.Component,

    properties: {
      type: {
        visible: false,
        default: "",
      },
      subtype: {
        visible: false,
        default: "",
      },
      atlas: cc.SpriteAtlas,
      x: {
        default: 0,
        visible: false,
      },
      y: {
        default: 0,
        visible: false,
      },
      position: {
        get(){
          return {
            x: this.x,
            y: this.y
          }
        },
        visible: false
      },
      effectLayer: cc.Node
    },

    ctor: function () {
      this.type = "";
      this.subtype = null;
      this._isPassable = true;
      this._isCapture = false;
      this._canGenEnemy = false;
      this.status = {};
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    isPassable(movable) {
      return this._isPassable;
    },
    isCapture(movable) {
      return this._isCapture;
    },
    canGenEnemy() {
      return this._canGenEnemy;
    },
    start () {
      var frame = this.atlas.getSpriteFrame(this.type+"-"+this.subtype);
      this.node.getComponent(cc.Sprite).spriteFrame = frame;
    },
    getStatus(statusName){
      if ( !this.status ) return null;
      return this.status[statusName];
    },
    gainStatus(statusName, turn, extra) {
      turn = turn || 1;
      if ( this.getStatus(statusName) ) {
        this.getStatus(statusName).setDuration(turn);
        if ( extra )
          this.getStatus(statusName).setExtra(extra)
        return;
      }
      var status = new cc.Node()
      status.addComponent(statusName)
      status = status.getComponent(statusName)
      status.duration = turn;
      if ( extra )
        status.setExtra(extra)
      status.name = statusName;
      if ( status.onGain ) {
        status.onGain(this)
      }
      this.status[statusName]=status
    },
    lostStatus(statusName){
      var status = this.status[statusName]
      if ( status ) {
        if ( status.onLost ) {
          status.onLost(this)
        }
        delete this.status[statusName
        ];
      }
    },
    onTurnStart(){
      for ( var key in this.status ){
        var status = this.status[key]
        if ( status.onTurnStart ) {
          status.onTurnStart(this)
        }
      }
    },
    onTurnEnd(){
      for ( var key in this.status ){
        var status = this.status[key]
        if ( status.onTurnEnd ) {
          status.onTurnEnd(this)
        }
      }
    },
    // update (dt) {},
});
