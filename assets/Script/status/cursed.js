const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "被诅咒"
      }
    },
    desc:{
      get(){
        return "下一次恢复生命量减半"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "cursed"
  },
});
