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
          return "技能等级越高持续时间越长";
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
      this.exchangeable = false;
      this.breakable = true;
    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
      this.node.y = this.node.y-80;
      this.node.runAction(
        cc.spawn(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, 80).easing(cc.easeIn(1)),
          cc.fadeIn(Global.HERO_ATTACK_TIME/2),
        )
      );
    },

    onTurnEnd() {
      this.level--;
      if ( this.level <= 0 ) {
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
    hideLevel(hide){
      //not Effect by blind
    }
    // update (dt) {},
});
