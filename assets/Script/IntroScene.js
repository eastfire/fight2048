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
    cc.log(cc.sys.language)
    cc.log(cc.DEBUG)
    cc.log(cc.sys)
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
      Global.reset();
      Global.currentHeroType = "normal"
      cc.director.loadScene("RoomScene");
    } else {
      cc.director.loadScene("MenuScene");
    }
  }
});
