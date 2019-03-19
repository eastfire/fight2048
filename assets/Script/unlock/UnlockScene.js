const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");
const unlocks = require("unlockEntry");

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
    unlock(entry, button){
      if ( Global.MenuScene.star >= entry.price) {
        Effect.useStarInMenu( button.node.position, button.node.parent,
          entry.price,
          function(){
            Storage.unlock(entry.name);
            if ( entry.onUnlock ) {
              entry.onUnlock();
            }
            this.refresh();
            Global.ModeSelectScene.refresh();
          }, this);
      }
    },
    refresh(){
      this.initData();
      this.unlockScroll.getComponent("listCtrl").setDataset(this.unlocks)
      this.unlockScroll.getComponent("listCtrl").initialize();
    }
    // update (dt) {},
});
