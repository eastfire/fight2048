const Status = require("status");
const Global = require("global");

cc.Class({
  extends: Status,

  properties: {
    title:{
      get(){
        return "麻痹"
      }
    },
    desc:{
      get(){
        return "不能进行普通攻击"
      }
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "stun"
  },
  // update (dt) {},
});
