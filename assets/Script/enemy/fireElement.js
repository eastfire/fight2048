import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "火元素";
      },
      override: true,
    },
    desc: {
      get(){
        return "攻击命中时有可能使英雄失明（看不见怪物和道具的等级）\n怪物等级越高概率越高，时间越长\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){ //较高
        var l = this.level + this.star;
        return (Math.round(Math.log(l+1.5)*l)+1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){  //较高
        return Math.round(Math.log(this.level+1)*this.level)+1;
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "fireElement"
  },

  afterAttack(hero){
    this.checkEffect(hero, 2);
    this._super(hero);
  },
  getEffectRate(hero){
       // return 1;
    return Math.min(0.6,this.level*5/100+0.05);
  },
  checkEffect(model, turn){
    if (this.getEffectRate(model) > Math.random() ){
      turn += Math.min(2, Math.floor(this.level/12));
      model.gainStatus("blind",turn)
    }
  },
  // update (dt) {},
});
