// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
      atlas: {
        default: null,
        type: cc.SpriteAtlas
      },
      x: {
        default: 0,
        visible: false,
      },
      y: {
        default: 0,
        visible: false,
      },
    },

    ctor: function () {
      this.type = "";
      this.subtype = null;
      this._isPassable = true;
      this._isCapture = false;
      this._canGenEnemy = false;
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
    // update (dt) {},
});
