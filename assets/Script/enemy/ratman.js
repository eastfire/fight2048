import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "鼠人";
      },
      override: true,
    },
    desc: {
      get(){
        return "场上道具道具越多，攻击力就越高。\n攻击力一般至很高。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        var l = this.level + this.star;
        return (l*2-1)*Global.EXP_INFLATION_RATE; //一般
      },
      override: true
    },
    attack: {
      get(){
        return this.level*2-1; //一般
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "ratman"
  },
  hit(hero){
    var itemNumber = 0;
    Global.currentRoom.foreachMovable(function(movable){
      if (movable.getComponent("item") ) {
        itemNumber++;
      }
    },this);
    return this.attack*(itemNumber+1);
  },
  // update (dt) {},
});
