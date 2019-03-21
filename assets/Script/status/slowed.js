const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "减速"
      }
    },
    desc:{
      get(){
        return "只能移动1格"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "slowed"
  },

  // update (dt) {},
});
