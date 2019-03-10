import Global from "global"
import Common from "common"
import Storage from "storage"
import LeanCloudDataSource from "LeanCloudDataSource";

cc.Class({
    extends: cc.Component,

    properties: {
      scoreScroll:cc.ScrollView
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      //set datasource
      this.dataSource = new LeanCloudDataSource();
      //get data
      this.scoreList = []

      this.fetchData();
    },
    fetchData(){
      //TODO show loading
      this.dataSource.loadScore({
        success(list){
          //TODO hide loading
          this.scoreList = list;
          for ( var i = 0; i < this.scoreList.length; i++){
            this.scoreList[i].itemID = i;
          }

          this.initScoreBoard();
        },
        error(error){
          cc.log("Error!!!")
          cc.log(error)
          //TODO hide loading
          //TODO error hint
        },
        context: this
      })
    },
    initScoreBoard(){
      this.scoreScroll.getComponent("listCtrl").setDataset(this.scoreList)
      this.scoreScroll.getComponent("listCtrl").initialize()
    },
    refresh(){

      this.unlockScroll.getComponent("listCtrl").setDataset(this.scoreList)
      this.unlockScroll.getComponent("listCtrl").initialize();
    }
    // update (dt) {},
});
