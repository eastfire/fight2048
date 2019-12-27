const Item = require("item");

cc.Class({
    extends: Item,

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="gem"
      this.breakable = true;
      this.isMergeToSelfType = false;
    },

    // update (dt) {},
});
