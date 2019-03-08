import Global from "global"
const Enemy = require("enemy");
import Effect from "effect"

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "弩车";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击。仅当与你同一行或同一列时才攻击。\n攻击力较高。\n经验值较高。";
        },
        override: true,
      },
      exp: {
        get(){  //很高
          var l = this.level+this.star
          return (Math.round(Math.log(l+1)*l)*2)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //很高
          var l = this.star
          return Math.round(Math.log(l+1)*l)*2; //2, 4, 8, 12, 18, 24, 30, 36, 42, 48
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
      Effect.projectArrow(this.node.position, hero.node.position)
      this._super(hero)
    },
    checkRange:function(hero){
      var myPosition = this.positions[0];
      var heroPosition = Global.currentRoom.hero.getComponent("hero").positions[0];
      return heroPosition.x === myPosition.x ||
             heroPosition.y === myPosition.y;
    },
    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "balista"
    },
    // update (dt) {},
});
