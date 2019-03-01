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
      default: 0,
      notify(oldValue){
        if ( this.star == oldValue ) return;
        Storage.saveMoney(this.star);
        this.moneyLabel.string = this.star;
      },
      visible:false
    },
    pageView:{
      default:null,
      type: cc.PageView
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    Storage.loadUnlock();
    Global.MenuScene = this;
  },

  start () {
    this.star = Storage.star;
    this.moneyLabel.string = Storage.star;
  },

  toPage(event, index){
    this.pageView.scrollToPage(index,0.2)
  },
  addStar(){
    this.star += 100;
    Global.UnlockScene.refresh();
  },
  clearData(){
    Storage.clearData("unlocked")
    Storage.clearData("star")
  },
  clearStatistics(){
    Storage.clearData("statistics")
  },
  starGame(){
    Storage.game.prevHeroType = Global.currentHeroType;
    Storage.saveGame();
    cc.director.loadScene("RoomScene");
  }
  // update (dt) {},
});
