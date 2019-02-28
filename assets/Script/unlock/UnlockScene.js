import Global from "global";
import Common from "common"
import Storage from "storage";
import unlocks from "unlockEntry";

cc.Class({
    extends: cc.Component,

    properties: {
      unlockList:{
        default: null,
        type:cc.Layout
      },
      unlock:{
        default:null,
        type:cc.Prefab
      }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.log("Storage.unlocked")
      cc.log(Storage.unlocked)
      Global.UnlockScene = this;

      unlocks.unlocks.forEach(function(entry){
        if ( !Storage.unlocked[entry.name] ){
          this.addUnlock(entry)
        }
      },this)

    },

    addUnlock(entry){
      var unlockNode = cc.instantiate(this.unlock)
      unlockNode.x = 0;
      var unlock = unlockNode.getComponent("unlock")
      unlock.unlockName = entry.name;
      unlock.displayName = entry.displayName;
      unlock.type = entry.type;
      unlock.price = entry.price;
      unlock.icon = entry.icon;
      unlock.prerequests = entry.prerequests;
      unlock.onUnlock = entry.onUnlock;

      this.unlockList.node.addChild(unlockNode)

    },
    refresh(){
      this.unlockList.node.children.forEach(function(child){
        child.getComponent("unlock").validate();
      })
      // this.unlockList.getComponent(cc.Layout).updateLayout();
    }
    // update (dt) {},
});
