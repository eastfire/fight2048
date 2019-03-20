const Global = require("global");
const Enemy = require("enemy");
const Effect = require("effect");

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
          return "远程攻击，距离你越远攻击力越高。距离1至3格内不会攻击。\n攻击力较低至很高。\n经验值很高。";
        },
        override: true,
      },
      exp: {
        get(){  //很高
          var l = this.level + this.star;
          return (Math.round(Math.log(l+1)*l)*2-1)*Global.EXP_INFLATION_RATE;
        },
        override: true
      },
      attack: {
        get(){  //较低
          return this.level;
        },
        override: true
      },
      attackType:{
        override: true,
        default: Global.ATTACK_TYPE_RANGE,
        visible:false,
      }
    },
    beforeAttack(hero){
      Effect.projectStone(this.node.position, hero.node.position)
      this._super(hero)
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
      return Math.round(this.attack*rate);
    },
    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "catapult"
    },
    // update (dt) {},
});
