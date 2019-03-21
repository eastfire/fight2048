const Status = require("status");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "眩晕"
      }
    },
    desc:{
      get(){
        return "行动与操作相反"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "dizzy"
  },

  start () {

  },

  // update (dt) {},
});
