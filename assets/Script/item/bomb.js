const Item = require("item");
const Global = require("global")
const Common = require("common")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "炸弹";
        },
        override: true,
      },
      desc: {
        get(){
          return "倒计时结束时对四周的敌人造成伤害\n放心，不会伤到英雄";
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
      this.type="bomb"

    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
      this.node.setScale(0);
      this.node.y = this.node.y+80;
      this.node.runAction(
        cc.spawn(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, 0, -80).easing(cc.easeIn(1),
          cc.scaleTo(Global.HERO_ATTACK_TIME/2, 1, 1),
        )
      );
    },

    onTurnEnd() {
      this.level--;
      if ( this.level <= 0 ) {
        this.explode();
        this.node.runAction(cc.sequence(
          //TODO explode effect
          cc.spawn(
            cc.fadeOut(Global.HERO_ATTACK_TIME/2),
            cc.scaleTo(Global.HERO_ATTACK_TIME/2, 2.5, 2.5),
          ),
          cc.callFunc(function(){
            Global.currentRoom.removeMovable(this);
          },this)
        ))
      }
    },

    explode(){
      var hero = Global.currentRoom.hero.getComponent("hero");
      var bombPosition = this.positions[0]
      var attackDetail = {
        fromPosition:bombPosition,
        type:Common.ATTACK_TYPE_SKILL
      };
      var attacked = {};
      [{ x:bombPosition.x-1, y:bombPosition.y},
      { x:bombPosition.x+1, y:bombPosition.y},
      { x:bombPosition.x, y:bombPosition.y-1},
      { x:bombPosition.x, y:bombPosition.y+1}].forEach( function(position){
        var enemy = Global.currentRoom.getMovableByPosition(position.x, position.y);
          if (enemy && enemy.getComponent("enemy") ) {
            if ( attacked[enemy._id]) return;
            attacked[enemy._id]=1;
            if ( enemy.checkHit(hero, attackDetail) ) {
              enemy.beHit(hero, attackDetail);
            } else {
              //miss
              enemy.dodgeAttack(hero, attackDetail);
            }
          }
        },this )
    }
    // update (dt) {},
});
