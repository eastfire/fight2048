import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "投石车";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击，距离你越远攻击力越高。距离1～3格内不会攻击。\n攻击力很低～很高。\n经验值很高。";
        },
        override: true,
      },
      score: {
        get(){
          return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){  //很高
          return (Math.round(Math.log(this.level+1)*this.level)*2-1)*Global.EXP_INFLATION_RATE;
        },
        override: true
      },
      attack: {
        get(){  //很低
          return Math.round(this.level/2);
        },
        override: true
      },
      attackType:{
        override: true,
        default: Global.ATTACK_TYPE_RANGE,
        visible:false,
      }
    },
    checkRange:function(hero){
      var myPosition = this.positions[0];
      var heroPosition = Global.currentRoom.hero.getComponent("hero").positions[0];
      return Math.abs(heroPosition.x - myPosition.x)+Math.abs(heroPosition.y - myPosition.y) > 3
    },
    hit(hero){
      var myPosition = this.positions[0];
      var heroPosition = Global.currentRoom.hero.getComponent("hero").positions[0];
      var rate = Math.max(0, Math.abs(heroPosition.x - myPosition.x)+Math.abs(heroPosition.y - myPosition.y)-3);
      return Math.round(this.attack/2*rate);
    },
    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "catapult"
    },
    // update (dt) {},
});
