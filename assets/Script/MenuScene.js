import Global from "global"
import Storage from "storage"

cc.Class({
  extends: cc.Component,

  properties: {
    moneyLabel:{
      type:cc.Label,
      default:null
    },
    star:{
      default: Storage.money,
      notify(oldValue){
        if ( this.star == oldValue ) return;
        this.moneyLabel.string = Storage.money = this.star;
        cc.sys.localStorage.setItem("money",this.star)
      },
      visible:false
    },
    pageView:{
      default:null,
      type: cc.PageView
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.moneyLabel.string = Storage.money;
  },

  toPage(index){
    this.pageView.scrollToPage(index,0.2)
  },

  clearData(){
    Storage.unlocked = {};
    cc.sys.localStorage.setItem("unlocked",Storage.unlocked)
  }
  // update (dt) {},
});
