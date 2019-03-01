const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "冰墙";
        },
        override: true,
      },
      desc: {
        get(){
          return "等级越高持续时间越长";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="iceWall"
      this._isMovable = false;      
    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
      this.node.setScale(0);
      this.node.y = this.node.y-60;
      this.node.runAction(
        cc.spawn(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, 60),
          cc.scaleTo(Global.HERO_ATTACK_TIME/2, 1, 1),
        )
      );
      this.duration = this.level;
    },

    onTurnEnd() {
      this.duration--;
      if ( this.duration <= 0 ) {
        this.node.runAction(cc.sequence(
          cc.spawn(
            cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, -60),
            cc.scaleTo(Global.HERO_ATTACK_TIME/2, 0, 0),
          ),
          cc.callFunc(function(){
            Global.currentRoom.removeMovable(this);
          },this)
        ))
      }
    },
    // update (dt) {},
});
