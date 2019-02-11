// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Tile from "tile";

cc.Class({
  extends: Tile,
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
  },

  ctor: function () {
    this.type = "floor";
    this.__isPassable = true;
    this.__isCapture = false;
    this.__canGenEnemy = true;
  },

  // start () {
  // },
    // LIFE-CYCLE CALLBACKS:
  start () {
    var num = Math.floor(Math.random()*11.9);
    this.subtype = "normal"+num;
    this._super();
  },
    // update (dt) {},
});
