import Stroage from "storage"

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
    Storage.money = cc.sys.localStorage.getItem('money') || 0;
    Storage.game = cc.sys.localStorage.getItem('game') || {
      gameTime: 0
    };
    Storage.unlocked = cc.sys.localStorage.getItem('unlocked') || {};
    Storage.statistics = cc.sys.localStorage.getItem('statistics') || {};
    Storage.rewardTaken = cc.sys.localStorage.getItem('rewardTaken') || {};

    if ( Storage.game.gameTime === 0 ) {
      // cc.director.loadScene("RoomScene");
      cc.director.loadScene("MenuScene");
    } else {
      cc.director.loadScene("MenuScene");
    }
  }
});
