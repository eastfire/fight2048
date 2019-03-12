import Global from "global"
import Storage from "storage"

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
        cc.director.loadScene("MenuScene")
      })
    ))
    Global.currentRoom.setAcceptInput(true);
  }
})
