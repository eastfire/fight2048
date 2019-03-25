const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const perks = require("perkEntry");

cc.Class({
    extends: cc.Component,

    properties: {
      selectedPerkList:cc.Layout,
      perkScroll: cc.ScrollView,
      loading:cc.Prefab,
      moneyLabel:cc.Label,
      starPrefab: cc.Prefab,
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
      this.star = Storage.star;
      this.moneyLabel.string = Storage.star;
      Global.PerkScene = this;

      this.initPerkList();
      this.initPerkSlot();
    },

    initPerkSlot(){
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot")
        // (function(i){
        //   this.selectedPerkList.node.children[i].on("touchend",function(event){
        //     this.perkSlotClicked(i);
        //   },this);
        // })(i);

        slot.unlock();
        if ( this.selectedPerk[i] ){
          slot.fill(this.selectedPerk[i])
        }
      }
      for ( var i = maxPerk; i < Global.MAX_PERK; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        slot.lock();
        slot.empty()
      }
    },

    refresh(){
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      var isActive = this.selectedPerk.length < maxPerk;
      perks.perks.forEach(function(perk){
        if ( !perk.isSelected ) {
          perk.active = isActive && Storage.progress.perk[perk.name];
        } else {
          perk.active = true;
        }
      },this)

      this.perkScroll.getComponent("listCtrl").refresh();
    },

    initPerkList(){
      this.perkMap = {};
      for ( var i = 0; i < perks.perks.length; i++){
        this.perkMap[perks.perks[i].name] = perks.perks[i];
        perks.perks[i].itemID = i;
        perks.perks[i].active = true;
        perks.perks[i].isSelected = false;
      }

      this.perkScroll.getComponent("listCtrl").setDataset(perks.perks)
      this.perkScroll.getComponent("listCtrl").initialize()

      this.selectedPerk = [];
      Global.selectedPerk.forEach(function(name){
        var entry = this.perkMap[name];
        perks.perks[entry.itemID].isSelected = true;
        this.selectPerk(name)
      }, this);

    },

    selectPerk(perkName) {
      //find first empty perkSlot
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        if ( slot.isEmpty ) {
          slot.fill(perkName)
          break;
        }
      }

      this.selectedPerk.push(perkName)

      this.refresh();
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

      for ( var i = 0 ; i < this.selectedPerk.length; i++ ){
        if ( this.selectedPerk[i] === perkName ) {
          this.selectedPerk.splice(i,1)
          break;
        }
      }

      for ( var i = 0; i < perks.perks.length; i++){
        if ( perks.perks[i].name == perkName ) {
          perks.perks[i].isSelected = false;
        }
      }
      this.refresh();
    },

    perkSlotClicked(index){
      var slot = this.selectedPerkList.node.children[index].getComponent("perkSlot");
      if ( slot.perkName ) {
        this.unselectPerk(slot.perkName)
      } else {
        if ( slot.lockSprite.node.active ) {
          // Global.MenuScene.toPage(null, 1)
        }
      }
    },

    confirm(){
      Global.PerkScene = null;
      Global.selectedPerk = this.selectedPerk;
      Common.loadScene("MenuScene",this.node, this.loading);
    },
    back(){
      Global.PerkScene = null;
      Common.loadScene("MenuScene",this.node, this.loading);
    }
    // update (dt) {},
});
