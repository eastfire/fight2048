const Movable = require("movable");

cc.Class({
    extends: Movable,

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
      this.isAllFaceSame = true;
      this.isMergeToSelfType = true;
    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    beforeBeAttacked(hero) {

    },
    checkHit(hero){
      return true;
    },
    dodgeAttack(hero){

    },
    // update (dt) {},
});
