import Global from "global"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {
      heroTypeOptions: [cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.selectHeroType(Storage.game.prevHeroType || "normal");
      var self = this;
      this.heroTypeOptions.forEach(function(sprite){
        var type = sprite.getComponent("heroOption").heroType;
        (function(type){
          sprite.node.on("touchend", ( event ) => {
            self.selectHeroType(type)
          })
        })(type)
      }, this)
    },

    selectHeroType(heroType){
      this.heroTypeOptions.forEach(function(sprite){
        if ( sprite.getComponent("heroOption").heroType == heroType ) {
          sprite.node.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME, 1.5));
        } else {
          sprite.node.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME, 1));
        }
      }, this)
      Global.currentHeroType = heroType;
    },



    // update (dt) {},
});
