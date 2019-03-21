const Global = require("global");
const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "史莱姆";
      },
      override:true
    },
    desc: {
      get(){
        return "攻击力超低。\n经验值超低。";
      },
      override:true
    },
    exp: {
      get(){
        return this.level*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack:{
      get(){
        return Math.round(Math.log(this.level+1))
      },
      override: true
    }
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "slime"
  },

  onLoad () {
    this._super();
  },

  start () {
    this._super();
  },

  // update (dt) {},
});
