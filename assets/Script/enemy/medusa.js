import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "美杜莎";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并或攻击时有一定概率冻结周围角色（等级越高概率越高）。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        var l = this.level + this.star;
        return (Math.round(l*2.5)-1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){
        return this.level*2-1;
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "medusa"
  },

  afterBeMerged(movable){
    this._super(movable);

        //freeze around
    var position = this.positions[0];
    Common.INCREMENTS.forEach(function(increment){
        var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
        if ( model ) {
          this.checkFreeze(model);
        }
    },this);

  },
  afterAttack(hero){
    this.checkFreeze(hero);
    this._super(hero);
  },
  getFreezeRate(hero){
       // return 1;
    return Math.min(0.7,this.level*5/200+0.1);
  },
  checkFreeze(model){
    if (this.getFreezeRate(model) > Math.random() ){
      var turn = Math.min(4, 2+Math.floor(this.level/12));
      if ( model.getComponent("hero") ) {
        turn += Global.NEGATIVE_EFFECT_TIME_ADJUST;
      }
      model.gainStatus("frozen",2)
    }
  },
  // update (dt) {},
});
