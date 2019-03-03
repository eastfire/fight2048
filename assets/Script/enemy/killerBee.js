import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "杀人蜂";
      },
      override: true,
    },
    desc: {
      get(){
        return "场上的其他杀人蜂越多，攻击力就越高。\n攻击力较低至很高。\n经验值较高。";
      },
      override: true,
    },
    exp: {
      get(){ //较高
        return Math.round(Math.log(this.level+1)*this.level)*Global.EXP_INFLATION_RATE;
      },
      override: true
    },
    attack: {
      get(){ //较低
        return this.level;
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
    this.type = "killerBee"
  },
  hit(hero){
    var sameClassCount = 0;
    Global.currentRoom.foreachMovable(function(movable){
      if (movable.getComponent("killerBee")) {
        sameClassCount++;
      }
    },this);
    return this.attack*Math.round(sameClassCount/2);
  },
  // update (dt) {},
});
