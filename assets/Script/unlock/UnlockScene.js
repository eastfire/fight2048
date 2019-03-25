const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");
const unlocks = require("unlockEntry");

cc.Class({
    extends: cc.Component,

    properties: {
      unlockScroll: cc.ScrollView,
      starPrefab: cc.Prefab,
      loading: cc.Prefab,
      moneyLabel:cc.Label, 
      star:{
        default: 0,
        notify(oldValue){
          if ( this.star == oldValue ) return;
          Storage.saveMoney(this.star);
          this.moneyLabel.string = this.star;
        },
        visible:false
      },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.log("Storage.unlocked")
      cc.log(Storage.unlocked)
      Global.UnlockScene = this;

      this.star = Storage.star;
      this.moneyLabel.string = Storage.star;

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
          entry.avaiable = this.star >= entry.price;
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
      if ( this.star >= entry.price) {
        Effect.gainStarInMenu( {
          fromPosition: this.moneyLabel.node.position,
          fromParentNode: this.node,
          toPosition: button.node.position,
          toParentNode: button.node.parent,
          effectParentNode: this.node,
          amount: entry.price,
          beforeStepCallback: function(step){
            this.star -= step;
            this.moneyLabel.node.stopAllActions();
            this.moneyLabel.node.runAction(cc.sequence(
              cc.scaleTo(Global.GET_STAR_TIME/2,0.8),
              cc.scaleTo(Global.GET_STAR_TIME/2,1)
            ))
          },
          callback: function(){
            Storage.unlock(entry.name);
            if ( entry.onUnlock ) {
              entry.onUnlock();
            }
            this.refresh();
          },
          context: this,
          starPrefab: this.starPrefab
        } );
      }
    },
    refresh(){
      this.initData();
      this.unlockScroll.getComponent("listCtrl").setDataset(this.unlocks)
      this.unlockScroll.getComponent("listCtrl").initialize();
    },
    back(){
      Global.UnlockScene = null;
      Common.loadScene("MenuScene",this.node, this.loading);
    }
    // update (dt) {},
});
