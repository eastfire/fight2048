const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

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

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {

    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    getScore(){
      return this.level;
    },
    
    getExp() {
      return this.level;
    },
    // update (dt) {},
});
