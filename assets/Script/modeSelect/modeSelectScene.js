import Global from "global"
import Storage from "storage"
import perks from "../perk/perkEntry"

cc.Class({
    extends: cc.Component,

    properties: {
      heroTypeOptions: [cc.Sprite],

      perk:{
        type: cc.Prefab,
        default: null,
      },
      selectedPerkList:{
        type: cc.Layout,
        default: null
      },
      availablePerkList:{
        type: cc.Layout,
        default: null
      }
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
    },

    refresh(){
      this.heroTypeOptions.forEach(function(sprite){
        sprite.getComponent("heroOption").validate()
      },this)
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
      this.availablePerkList.node.children.forEach(function(perkNode){
        perkNode.getComponent("perk").validate();
      },this)
    },
    initPerkList(){
      perks.perks.forEach(function(perkEntry){
        this.addPerk(perkEntry)
      },this)
    },
    addPerk(entry){
      var perkNode = cc.instantiate(this.perk)
      perkNode.x = 0;
      var perk = perkNode.getComponent("perk")
      perk.title = entry.title;
      perk.desc = entry.desc;
      perk.value = entry.value;
      perk.icon = entry.icon;
      perk.perkName = entry.name;

      this.availablePerkList.node.addChild(perkNode)
    },

    selectPerk(perkName, perkIcon) {
      //find first empty perkSlot
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        if ( !slot.perkName ) {
          slot.fill(perkName, perkIcon)
          break;
        }
      }

      Global.selectedPerk.push(perkName)

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
        if ( Global.selectedPerk[i] === perkName ) {
          Global.selectedPerk.splice(i,1)
          break;
        }
      }
      this.refreshPerkList();
    },
    clearSelectedPerk(){
      this.availablePerkList.node.children.forEach(function(perkNode){
        perkNode.getComponent("perk").toggle.isChecked = false;
        perkNode.getComponent("perk").toggle.interactable = true;
      },this)
      Global.selectedPerk = [];
      for ( var i = 0; i < Global.MAX_PERK; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        slot.empty(perkName)
      }
    }

    // update (dt) {},
});
