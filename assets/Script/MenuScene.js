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
    Storage.clearData("rewardTaken")
    Storage.clearData("progress")
    cc.director.loadScene("IntroScene")
  },
  clearStatistics(){
    Storage.clearData("statistics")
  },
  starGame(){
    Storage.game.prevHeroType = Global.currentHeroType;
    Storage.saveGame();

    Global.reset();
    var positiveCount = 0;
    var negativeCount = 0;
    Global.selectedPerk.forEach(function(perkEntry){
      perkEntry.apply();
    },this)
    var adjust = Global.ModeSelectScene.calculateScoreAdjust()

    Global.SCORE_INFLATION_RATE = Global.ORIGIN_SCORE_INFLATION_RATE * (1+adjust.scoreAdjust*Global.PERK_SCORE_ADJUST)

    cc.director.loadScene("RoomScene");
  }
  // update (dt) {},
});
