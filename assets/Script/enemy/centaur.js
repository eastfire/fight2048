const Global = require("global");
const Enemy = require("enemy");
const Effect = require("effect");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "半人马射手";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击。\n很懒惰，攻击或合并后本轮不会攻击。\n攻击力很高。\n经验值很高。";
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
        get(){  //很高
          var l = this.level+this.star
          return (Math.round(Math.log(l+2)*l)+2)*Global.EXP_INFLATION_RATE;
        },
        override: true
      },
      attack: {
        get(){
          return Math.round(Math.log(this.level+1)*this.level)+1;//很高
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
      this.type = "centaur"
    },
    afterAttack(hero){
      this.gainStatus("stun",2)
      this._super(hero); //afterAttack will trigger turn end
    },
    afterBeMerged(movable){
      this._super(movable);
      this.gainStatus("stun",1)
    },
    // update (dt) {},
});
