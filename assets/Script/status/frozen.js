const Status = require("status");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "冻结"
      }
    },
    desc:{
      get(){
        return "无法移动"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "frozen"
  },

  start () {

  },

  // update (dt) {},
});
