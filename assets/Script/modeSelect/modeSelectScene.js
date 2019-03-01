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
      Global.ModeSelectScene = this;
      this.selectHeroType(Storage.game.prevHeroType || "normal");
      this.scheduleOnce(this.refresh, 1)
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

    refresh(){
      this.heroTypeOptions.forEach(function(sprite){
        sprite.getComponent("heroOption").validate()
      },this)
    }

    // update (dt) {},
});
