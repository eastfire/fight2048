const Global = require("global");
const Common = require("common");
const Storage = require("storage");

cc.Class({
  extends: cc.Component,

  properties: {
    soundSlider: cc.Slider,
    musicSlider: cc.Slider,
    soundToggle: cc.Toggle,
    soundTitle: cc.Label,
    musicTitle: cc.Label,
    allSoundTitle: cc.Label,
  },

  start () {
    Global.currentRoom.setAcceptInput(false);
    if ( cc.sys.platform === cc.sys.WECHAT_GAME ) {
      this.soundSlider.node.active = this.musicSlider.node.active = this.soundTitle.node.active = this.musicTitle.node.active = false;
    } else {
      this.soundToggle.node.active = false;
    }
  },

  cancel(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.removeSelf()
    ))
    Global.currentRoom.setAcceptInput(true);
  },

  exitGame(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.callFunc(function(){
        Common.loadScene("MenuScene", Global.currentRoomScene.node, Global.loading)
      },this)
    ))
    Global.currentRoom.setAcceptInput(true);
  },
  restartGame(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.callFunc(function(){
        Common.loadScene("RoomScene", Global.currentRoomScene.node, Global.loading)
      },this)
    ))
  }
})
