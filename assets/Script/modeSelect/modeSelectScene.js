import Global from "global"
import Storage from "storage"
import perks from "../perk/perkEntry"

cc.Class({
    extends: cc.Component,

    properties: {
      heroTypeOptions: [cc.Sprite],

      perk:cc.Prefab,
      selectedPerkList:cc.Layout,
      availablePerkList:{
        type: cc.Layout,
        default: null
      },
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
      this.selectedPerk = [];

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
      // this.availablePerkList.node.children.forEach(function(perkNode){
      //   perkNode.getComponent("perk").validate();
      // },this)
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
    },
    initPerkList(){
      // perks.perks.forEach(function(perkEntry){
      //   this.addPerk(perkEntry)
      // },this)
      for ( var i = 0; i < perks.perks.length; i++){
        perks.perks[i].itemId = i;
      }
      this.perkScroll.getComponent("listCtrl").setDataset(perks.perks)
      this.perkScroll.getComponent("listCtrl").initialize()
    },
    // addPerk(entry){
    //   var perkNode = cc.instantiate(this.perk)
    //   perkNode.x = 0;
    //   var perk = perkNode.getComponent("perk")
    //   perk.perkEntry = entry;
    //
    //   this.availablePerkList.node.addChild(perkNode)
    // },

    selectPerk(perk) {
      //find first empty perkSlot
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        if ( slot.isEmpty ) {
          slot.fill(perk.name, perk.icon)
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
      this.refreshPerkList();
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
      this.availablePerkList.node.children.forEach(function(perkNode){
        perkNode.getComponent("perk").toggle.isChecked = false;
        perkNode.getComponent("perk").toggle.interactable = true;
      },this)
      Global.selectedPerk = [];
      for ( var i = 0; i < Global.MAX_PERK; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        slot.empty()
      }
    }

    // update (dt) {},
});
