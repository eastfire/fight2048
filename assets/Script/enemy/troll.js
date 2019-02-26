import Global from "global"
const Enemy = require("enemy");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "巨魔";
        },
        override: true,
      },
      desc: {
        get(){
          return "远程攻击。攻击时有一定概率造成眩晕（行动与操作相反）\n等级越高概率越高，持续时间越长\n攻击力一般。\n经验值较高。";
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
      score: {
        get(){
          return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){  //较高
          return (this.level*3-1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //一般
          return Math.round(this.level*3/2) - 1;
        },
        override: true
      },
      attackType:{
        override: true,
        default: Global.ATTACK_TYPE_RANGE,
        visible:false,
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "troll"
    },

    afterAttack(hero){
      this.checkSpecialEffect(hero);
      this._super(hero);
    },
    checkSpecialEffect(model){
      if (this.getSpecialEffectRate(model) > Math.random() ) {
        model.gainStatus("dizzy",2+Math.round(this.level/6))
      }
    },
    getSpecialEffectRate(model){
         // return 1;
      return Math.min(0.7,this.level*5/200+0.1);
    },
    // update (dt) {},
});
