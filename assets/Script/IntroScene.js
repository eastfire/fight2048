import Storage from "storage"
import Global from "global"

cc.Class({
  extends: cc.Component,

  properties: {

  },
  onLoad: function() {
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

    if ( Storage.statistics.gameTime === 0 ) {
      //first time game
      Global.currentHeroType = "normal"
      cc.director.loadScene("RoomScene");
    } else {
      cc.director.loadScene("MenuScene");
    }
  }
});
