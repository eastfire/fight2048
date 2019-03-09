import Global from "global"
import Common from "common"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {
      scoreScroll:cc.ScrollView
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      //set datasource
      //get data
      this.scoreList = []
      this.scoreScroll.getComponent("listCtrl").setDataset(this.scoreList)
      this.scoreScroll.getComponent("listCtrl").initialize()
    },

    // update (dt) {},
});
