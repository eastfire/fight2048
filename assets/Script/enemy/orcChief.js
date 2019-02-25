import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "兽人酋长";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并时自己和周围敌人升级。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        return  (this.level*2-1)*Global.EXP_INFLATION_RATE;
      },
      override: true
    },
    attack: {
      get(){
        return this.level*2-1;
      },
      override: true
    },
    score:{
      get(){
        return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "orcChief"
  },

  afterBeMerged(movable){
    this._super(movable);
    this.level ++;

    var position = this.positions[0];
    Common.INCREMENTS.forEach(function(increment){
        var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
        if ( model ) {
          model.level++;
        }
    },this);
  },

  // update (dt) {},
});
