const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const perks = require("perkEntry");

cc.Class({
    extends: cc.Component,

    properties: {
      heroTypeOptions: [cc.Sprite],

      selectedPerkList:cc.Layout,

      scoreAdjustLabel: cc.Label,
      scoreAdjustTitle: cc.Label,
      perkScroll: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.ModeSelectScene = this;
      this.selectHeroType(Storage.game.prevHeroType || "normal");
      this.scheduleOnce(this.refresh, 1)
      this.selectHeroType(Global.currentHeroType);
      this.initPerkList();
    },

    selectHeroType(heroType){
      this.heroTypeOptions.forEach(function(sprite){
        if ( sprite.getComponent("heroOption").heroType == heroType ) {
          sprite.node.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME, 1.5));
        } else {
          sprite.node.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME, 1));
        }
      }, this)
      Global.currentHeroType = heroType;
      this.refreshPerkSlot();
      this.refreshPerkList();
    },

    refresh(){
      this.heroTypeOptions.forEach(function(sprite){
        sprite.getComponent("heroOption").validate()
      },this)
      this.refreshPerkSlot();
      this.refreshPerkList();
    },
    refreshPerkSlot(){
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        this.selectedPerkList.node.children[i].getComponent("perkSlot").unlock();
      }
      for ( var i = maxPerk; i < Global.MAX_PERK; i++ ){
        this.selectedPerkList.node.children[i].getComponent("perkSlot").lock();
      }
      if ( Global.selectedPerk.length > maxPerk ) {
        this.clearSelectedPerk();
      }
    },
    refreshPerkList(){
      // var adjust = this.calculateScoreAdjust();
      // if ( adjust.scoreAdjust == 0 ) {
      //   this.scoreAdjustLabel.node.active = false;
      //   this.scoreAdjustTitle.node.active = false;
      // } else {
      //   this.scoreAdjustLabel.node.active = true;
      //   this.scoreAdjustTitle.node.active = true;
      //   this.scoreAdjustLabel.string = Math.round(100+adjust.scoreAdjust*Global.PERK_SCORE_ADJUST*100)+"%";
      //   // if ( adjust.extra ) {
      //   //   if ( adjust.extra > 0 ) {
      //   //     this.scoreAdjustLabel.string += "\n(额外奖励"
      //   //   } else {
      //   //     this.scoreAdjustLabel.string += "\n(额外惩罚"
      //   //   }
      //   //   this.scoreAdjustLabel.string +=Math.round(adjust.extra*Global.PERK_SCORE_ADJUST*100)+"%)"
      //   // }
      // }

      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      var isActive = Global.selectedPerk.length < maxPerk;
      perks.perks.forEach(function(perk){
        if ( !perk.isSelected ) {
          perk.active = isActive;
        } else {
          perk.active = true;
        }
      },this)
      this.perkScroll.getComponent("listCtrl").refresh();
    },
    initPerkList(){
      for ( var i = 0; i < perks.perks.length; i++){
        perks.perks[i].itemID = i;
        perks.perks[i].active = true;
        perks.perks[i].isSelected = false;
      }
      this.perkScroll.getComponent("listCtrl").setDataset(perks.perks)
      this.perkScroll.getComponent("listCtrl").initialize()

      var tempSelectedPerk = Global.selectedPerk;
      Global.selectedPerk = [];
      tempSelectedPerk.forEach(function(entry){
        perks.perks[entry.itemID].isSelected = true;
        this.selectPerk(entry)
      }, this);

      for ( var i = 0; i < Global.MAX_PERK; i++ ){
        var self = this;
        (function(i){
          self.selectedPerkList.node.children[i].on("touchend",function(event){
            self.perkSlotClicked(i);
          },self);
        })(i);
      }
    },

    selectPerk(perk) {
      //find first empty perkSlot
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        if ( slot.isEmpty ) {
          slot.fill(perk.name)
          break;
        }
      }

      Global.selectedPerk.push(perk)

      this.refreshPerkList();
    },
    unselectPerk(perkName){
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        if ( slot.perkName === perkName ) {
          slot.empty(perkName)
          break;
        }
      }

      for ( var i = 0 ; i < Global.selectedPerk.length; i++ ){
        if ( Global.selectedPerk[i].name === perkName ) {
          Global.selectedPerk.splice(i,1)
          break;
        }
      }
      for ( var i = 0; i < perks.perks.length; i++){
        if ( perks.perks[i].name == perkName ) {
          perks.perks[i].active = true;
          perks.perks[i].isSelected = false;
        }
      }
      this.refreshPerkList();
    },

    perkSlotClicked(index){
      var slot = this.selectedPerkList.node.children[index].getComponent("perkSlot");
      if ( slot.perkName ) {
        this.unselectPerk(slot.perkName)
      } else {
        if ( slot.lockSprite.node.active ) {
          Global.MenuScene.toPage(null, 1)
        }
      }
    },

    calculateScoreAdjust(){
      var positiveCount = 0;
      var negativeCount = 0;
      var scoreAdjust = 0
      Global.selectedPerk.forEach(function(perkEntry){
        if ( perkEntry.value > 0 ) {
          negativeCount ++
        } else if ( perkEntry.value < 0 ) {
          positiveCount ++;
        }
        scoreAdjust += perkEntry.value
      },this)
      var extra = 0;
      // if ( negativeCount > positiveCount+1) {
      //   extra = negativeCount-positiveCount-1
      // } else if ( negativeCount + 1 < positiveCount) {
      //   extra = -(positiveCount-negativeCount-1)
      // }
      scoreAdjust += extra;
      return {
        scoreAdjust,
        extra
      }
    },
    clearSelectedPerk(){

      Global.selectedPerk = [];
      for ( var i = 0; i < Global.MAX_PERK; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        slot.empty()
      }
      for ( var i = 0; i < perks.perks.length; i++){
        perks.perks[i].active = true;
        perks.perks[i].isSelected = false;
      }
    }

    // update (dt) {},
});
