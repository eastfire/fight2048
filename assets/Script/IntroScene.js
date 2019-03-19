const Storage = require("storage");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: cc.Component,

  properties: {
    loading: cc.Prefab
  },
  onLoad: function() {
    cc.debug._resetDebugSetting(cc.debug.DebugMode.INFO);
    cc.log(cc.sys)

    this.node.on('touchend', this.onTouchEnded, this);
    this.node.on(cc.SystemEvent.EventType.KEY_DOWN, this.onTouchEnded, this);
  },
  update: function (dt) {
  },
  onDestroy () {
    this.node.off('touchend', this.onTouchEnded, this);
    this.node.off(cc.SystemEvent.EventType.KEY_DOWN, this.onTouchEnded, this);
  },
  onKeyDown(event){

  },
  onTouchBegan: function (touch, event) {
      return true;
  },
  //Trigger when moving touch
  onTouchMoved: function (touch, event) {
  },
  onTouchEnded(event){
    //Load data
    Storage.loadMoney();
    Storage.loadGame();
    Storage.loadUnlock();
    Storage.loadStatistics();
    Storage.loadRewardTaken();
    Storage.loadAchievement();
    Storage.loadProgress();
    Storage.loadUserInfo();

    if ( Storage.statistics.gameTime === 0 ) {
      //first time game
      Global.reset();
      Global.currentHeroType = "normal"
      Common.loadScene("RoomScene", this.node, this.loading)
    } else {
      Common.loadScene("MenuScene", this.node, this.loading)
    }
  }
});
