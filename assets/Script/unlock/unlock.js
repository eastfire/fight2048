import Global from "global";
import Storage from "storage";

cc.Class({
  extends: cc.Component,

  properties: {
    displayName: "",

    type: "",
    unlockName: "",
    price: 0,
    icon: "",
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },

  validate() {
    return !Storage.unlocked[this.unlockName];
  },

  onUnlock(){

  },

  click(){
    Storage.money -= this.price
  }
  // update (dt) {},
});
