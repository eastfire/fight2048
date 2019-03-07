import Global from "global"
const Boss = require("boss");
import Effect from "effect"

cc.Class({
    extends: Boss,

    properties: {
      title: {
        get(){
          return "九头蛇";
        },
        override: true,
      },
      desc: {
        get(){
          return "boss不会被你一击杀死\n如果普通攻击击中它的弱点，它就不会在本回合攻击你。\n攻击力"+this.attack+"。\n经验值很高。";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*1000*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){
          return this.level*100*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){
          return this.level*50;
        },
        override: true
      },
    },

    ctor: function() {
      this.type = "bossHydra"
    },

    start(){
      this._super();
    },
    // update (dt) {},
});
