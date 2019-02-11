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
    cc.director.loadScene(new RoomScene({
        roomEntry: null,
        maxScore: 0
    }));
  }
});
