const Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
      icon: cc.Node,
      titleLabel: cc.Label,
      descLabel: cc.Label,
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
      movable.getComponent("movable").subtype = m.subtype;
      movable.x = 0;
      movable.y = 0;
      movable.removeComponent(m.type)
      if ( movable.getComponent("boss") ) {
        movable.x = -Global.TILE_WIDTH/3;
        movable.y = -Global.TILE_HEIGHT/3;
        movable.setScale(0.5) //TODO 适配更多形状的boss
      }

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
