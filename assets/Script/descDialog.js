import Global from "global"

cc.Class({
    extends: cc.Component,

    properties: {
      icon:{
        default: null,
        type: cc.Node,
      },
      titleLabel: {
        default: null,
        type: cc.Label,
      },
      descLabel: {
        default: null,
        type: cc.Label,
      },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.currentRoom.setAcceptInput(false);
    },

    setMovable(m){
      var prefab = Global.currentRoom.movablePrefabMap[m.type]
        || Global.currentRoom.movablePrefabMap[m.type+m.subtype];

      var movable = cc.instantiate(prefab)
      movable.getComponent("movable").subtype = this.subtype;
      movable.x = 0;
      movable.y = 0;
      movable.removeComponent(this.type)

      this.icon.addChild(movable)
      this.titleLabel.string = m.title
      this.descLabel.string = m.desc      
    },

    closeDialog(){
      this.node.runAction(cc.sequence(
        cc.fadeOut(Global.DIALOG_EXIT_TIME),
        cc.removeSelf()
      ))
      Global.currentRoom.setAcceptInput(true);
    }
    // update (dt) {},
});
