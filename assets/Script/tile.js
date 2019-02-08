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
        default: "",
      },
      isPassable: {
        visible: false,
        default: true,
      },
      isCapture: {
        visible: false,
        default: false,
      },
      canGenEnemy: {
        visible: false,
        default: true,
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    setType(type,subtype){
      this.type = type;
      this.subtype = subtype;
      var frame = this.atlas.getSpriteFrame(this.type+"-"+this.subtype);
      this.node.getComponent(cc.Sprite).spriteFrame = frame;
    },
    // update (dt) {},
});
