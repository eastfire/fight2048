import Global from "global"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {
      inputName: cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    setCallback(callback, context){
      this.callback = callback;
      this.context = context;
    },
    submitName () {
      if ( this.inputName.string && this.inputName.string.trim() !== "" && this.callback ) {
        this.node.runAction(cc.sequence(
          cc.fadeOut(Global.DIALOG_EXIT_TIME),
          cc.removeSelf()
        ))
        this.callback.call(this.context, this.inputName.string)
      }
    },


    // update (dt) {},
});
