const Global = require("global");
const Enemy = require("enemy");
const Effect = require("effect");

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
          var l = this.level
          return Math.round(Math.log(l+1)*l)*3; //3,6,12,18,27,36,45,54,63,72,81,93,102,114,126,135,147,159,171
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
      this.type = "ballista"
    },
    // update (dt) {},
});
