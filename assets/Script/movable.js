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
        type: {
          visible: false,
          default: "",
        },
        subtype: {
          visible: false,
          default: null,
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
        isMovable: {
          default: true,
          visible: false,
        },
        isMergeToSelfType: {
          default: true,
          visible: false,
        },
        face: {
          default: Common.DIRECTION_DOWN,
          visible: false,
        },
        level: {
          default: 1,
          visible: false,
        },
        isAllFaceSame: {
          default: true,
          visible: false
        },
        //status
        frozen: {
          default: 0,
          visible: false,
        },
        angry: {
          default: 0,
          visible: false,
        },

        animateStatus: {
          default: "stand",
          visible: false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      cc.log("movable onload")
    },

    start () {
cc.log("movable start")
      this.curremtFrameNumber = 0;
      this.setFrame();
    },
    setFrame(){
      var frame = this.atlas.getSpriteFrame(this.getFrameName());
      this.node.getComponent(cc.Sprite).spriteFrame = frame;
    },
    getFrameName(){
      if ( this.isAllFaceSame ) {
        return this.type + this.subtype?("-"+this.subtype):"";
      } else {
        return this.type + (this.subtype?("-" + this.subtype):"") + this.face + this.animateStatus + this.curremtFrameNumber
      }
    }
    // update (dt) {},
});
