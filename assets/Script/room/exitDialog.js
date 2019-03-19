const Global = require("global");
const Common = require("common");
const Storage = require("storage");

cc.Class({
  extends: cc.Component,

  properties: {
  },

  start () {
    Global.currentRoom.setAcceptInput(false);
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
  }
})
