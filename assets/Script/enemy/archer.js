const Global = require("global");
const Enemy = require("enemy");
const Effect = require("effect");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "骷髅弓箭手";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击。\n攻击力很低。\n经验值一般。";
        },
        override: true,
      },
      attackRage: {
        get() {
          return 100; //無限
        },
        visible: false,
        override: true
      },
      exp: {
        get(){  //一般
          var l = this.level+this.star
          return l*2*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //很低
          var l = this.level
          return Math.ceil(l/2); //1，1，2，2，3，3，4，4
        },
        override: true
      },
      attackType:{
        override: true,
        default: Global.ATTACK_TYPE_RANGE,
        visible:false,
      },
      isUndead: true
    },
    beforeAttack(hero){
      Effect.projectArrow(this.node.position, hero.node.position)
      this._super(hero)
    },
    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "archer"
    },
    // update (dt) {},
});
