const Item = require("item");
const Global = require("global")
const Common = require("common")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "天使";
        },
        override: true,
      },
      desc: {
        get(){
          return "由英雄召唤到战场帮助战斗，可惜不会吸引敌人的火力";
        },
        override: true,
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="angel"
      this.exchangeable = false;
      this.breakable = false;
      this.isMergeToSelfType = false;
      this.isAllFaceSame = false;
    },

    onLoad () {
      this._super();
      cc.loader.loadRes("Texture/Item/angel",
        cc.SpriteAtlas,
        (err, atlas) => {
          this.atlas = atlas;
          this.setFrame();
        }
      );
    },

    start () {
      this._super();
      this.node.setScale(0,2);
      this.node.y = this.node.y+80;
      this.node.runAction(
        cc.spawn(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, -80).easing(cc.easeIn(1)),
          cc.scaleTo(Global.HERO_ATTACK_TIME/2, 1, 1),
        )
      )
    },
    beforeHeroNormalAttack(){
      var enemy = Global.currentRoom.getMovableByPosition(Common.getIncrementPosition(this.positions[0], this.face));
      if ( enemy && enemy.getComponent("enemy") ){
        var increment = Common.INCREMENTS[this.face]
        var deltaX = Global.TILE_WIDTH*increment.x/2;
        var deltaY = Global.TILE_HEIGHT*increment.y/2
        var attackDetail = {
          fromPosition:this.positions[0],
          type:Common.ATTACK_TYPE_MELEE
        }
        this.node.runAction(cc.sequence(
            cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ),
            cc.callFunc(function(){
              enemy.beHit(Global.currentRoom.hero.getComponent("hero"), attackDetail);
              //never miss
            },this),
            cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ),
        ))
        Global.currentRoom.setDelayPhaseTime(Global.HERO_ATTACK_TIME+0.05)
      }
    },
    onTurnEnd() {
      this.level--;
      if ( this.level <= 0 ) {
        this.node.runAction(cc.sequence(
          cc.spawn(
            cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, 80),
            cc.scaleTo(Global.HERO_ATTACK_TIME/2, 0, 2),
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
