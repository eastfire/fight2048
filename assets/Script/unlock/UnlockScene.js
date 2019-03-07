import Global from "global";
import Common from "common"
import Storage from "storage";
import unlocks from "unlockEntry";

cc.Class({
    extends: cc.Component,

    properties: {
      unlockScroll: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.log("Storage.unlocked")
      cc.log(Storage.unlocked)
      Global.UnlockScene = this;

      this.initData()
      this.unlockScroll.getComponent("listCtrl").setDataset(this.unlocks)
      this.unlockScroll.getComponent("listCtrl").initialize()

      // this.refresh();
    },

    initData(){
      var i = 0;
      this.unlocks = [];
      unlocks.unlocks.forEach(function(entry){
        if ( !Storage.unlocked[entry.name] && this.passPrerequest(entry) ) {
          this.unlocks.push(entry)
          entry.itemID = i;
          entry.avaiable = Global.MenuScene.star >= entry.price;
        }
        i++;
      },this)
    },
    passPrerequest(entry){
      return !entry.prerequests || (entry.prerequests && Common.all(entry.prerequests,function(request){
        return Storage.unlocked[request];
      },this) )
    },
    unlock(entry){
      if ( Global.MenuScene.star >= entry.price) {
        Global.MenuScene.star -= entry.price;
        Storage.unlock(entry.name);
        if ( entry.onUnlock ) {
          entry.onUnlock();
        }
        this.refresh();
        Global.ModeSelectScene.refresh();
      }
    },

    refresh(){
      this.initData();
      this.unlockScroll.getComponent("listCtrl").setDataset(this.unlocks)
      this.unlockScroll.getComponent("listCtrl").initialize();
    }
    // update (dt) {},
});
