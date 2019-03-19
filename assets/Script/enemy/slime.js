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
        return "攻击力始终为1。\n经验值极低。";
      },
      override:true
    },
    exp: {
      get(){
        return this.level*Global.EXP_INFLATION_RATE
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
