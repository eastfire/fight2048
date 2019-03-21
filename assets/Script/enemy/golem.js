const Global = require("global");
const Enemy = require("enemy");
const Common = require("common");

cc.Class({
    extends: Enemy,

    properties: {
      title: {
        get(){
          return "魔像";
        },
        override: true,
      },
      desc: {
        get(){
          return "你的技能攻击对他无效，且会让他升级。\n攻击力很高。\n经验值很高。";
        },
        override: true,
      },
      exp: {
        get(){ //很高
          var l = this.level + this.star;
          return  Math.round(Math.log(l+1)*l+1)*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){  //很高
          return 2*Math.round(Math.log(this.level+1)*this.level+1)
        },
        override: true
      },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type = "golem"
    },

    beHit(hero, detail){
      if ( detail.type === Common.ATTACK_TYPE_SKILL ) {
        this.level++;
        this._super(hero, detail);
        return false;
      } else {
        return this._super(hero, detail);
      }
    },
    willDieAfterBeHit(hero, detail){
      if ( detail.type === Common.ATTACK_TYPE_SKILL ) {
        return false;
      }
      return true;
    },
    // update (dt) {},
});
