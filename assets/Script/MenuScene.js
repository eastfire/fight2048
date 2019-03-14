import Global from "global"
import Storage from "storage"
import Effect from "effect"

const MS_OF_MINUTE = 60000;
const MS_OF_DAY = 3600*24*1000;

cc.Class({
  extends: cc.Component,

  properties: {
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
    pageView:cc.PageView,
    checkInButton: cc.Button,
    checkInLabel: cc.Label,
    checkedIcon: cc.Sprite,
    starPrefab: cc.Prefab,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    Storage.loadUnlock();
    Global.MenuScene = this;
  },

  start () {
    this.star = Storage.star;
    this.moneyLabel.string = Storage.star;
    this.rewards = [5,10,15,20,25,30,50];
    this.checkCheckIn()

    Global.reset();
  },
  checkCheckIn(){
    if ( Storage.progress.lastCheckInDay ) {
      var now = new Date();
      var nowDay = Math.floor( (now.getTime()-now.getTimezoneOffset()*MS_OF_MINUTE)/MS_OF_DAY )
      if ( nowDay == Storage.progress.lastCheckInDay+1 ) {
        this.checkInButton.interactable = true;
        this.checkInLabel.string = "签到+"+this.rewards[Math.min(this.rewards.length -1,Storage.progress.continueCheckInDay)]
        this.checkedIcon.node.active = false;
      } else if ( nowDay == Storage.progress.lastCheckInDay ) { //已签到
        this.checkInLabel.string = "已签到";

        this.checkInButton.interactable = false;
        this.checkedIcon.node.active = true;
      } else {
        this.checkInLabel.string = "签到+"+this.rewards[0];
        Storage.progress.lastCheckInDay = 0;
        Storage.saveProgress();
        this.checkInButton.interactable = true;
        this.checkedIcon.node.active = false;
      }
    } else {
      this.checkInLabel.string = "签到+"+this.rewards[0];
      Storage.progress.continueCheckInDay = 0;
      Storage.saveProgress();
      this.checkInButton.interactable = true;
      this.checkedIcon.node.active = false;
    }
  },
  checkIn(){
    //TODO show a dialog
    var now = new Date();
    var nowDay = Math.floor( (now.getTime()-now.getTimezoneOffset()*MS_OF_MINUTE)/MS_OF_DAY )
    Storage.progress.lastCheckInDay = nowDay;
    Storage.progress.continueCheckInDay = Storage.progress.continueCheckInDay || 0;
    //TODO show effect
    Effect.gainStarInMenu( this.checkInButton.node.position, this.node,
      this.rewards[Math.min(this.rewards.length -1,Storage.progress.continueCheckInDay)],
      function(){
        if ( Global.UnlockScene )
          Global.UnlockScene.refresh();
      }, this);
    Storage.progress.continueCheckInDay++;
    Storage.saveProgress();
    this.checkCheckIn();
  },
  toPage(event, index){
    this.pageView.scrollToPage(index,0.2)
  },
  starGame(){
    Storage.game.prevHeroType = Global.currentHeroType;
    Storage.saveGame();


    var positiveCount = 0;
    var negativeCount = 0;
    Global.selectedPerk.forEach(function(perkEntry){
      perkEntry.apply();
    },this)
    var adjust = Global.ModeSelectScene.calculateScoreAdjust()

    Global.SCORE_INFLATION_RATE = Global.ORIGIN_SCORE_INFLATION_RATE * (1+adjust.scoreAdjust*Global.PERK_SCORE_ADJUST)

    Global.ModeSelectScene = null;
    Global.UnlockScene = null;
    Global.AchievementScene = null;
    cc.director.loadScene("RoomScene");
  }
  // update (dt) {},
});
