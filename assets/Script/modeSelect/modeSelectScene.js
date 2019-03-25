const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const Perks = require("perkEntry");

cc.Class({
    extends: cc.Component,

    properties: {
      heroTypeOptions: [cc.Sprite],
      selectedPerkList:cc.Layout,
      loading: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.ModeSelectScene = this;

      this.perkMap = {};
      Perks.perks.forEach(function(entry){
        this.perkMap[entry.name] = entry;
      },this)

      this.heroTypeOptions.forEach(function(sprite){
        sprite.getComponent("heroOption").validate()
      },this)
      this.selectHeroType(Global.currentHeroType);

      this.selectedPerkList.node.on("touchend",this.pickPerk,this)
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
    },
    refreshPerkSlot(){
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      Global.selectedPerk.splice(maxPerk);
      for ( var i = 0; i < maxPerk; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot")
        slot.unlock();
        if ( Global.selectedPerk[i] ){
          slot.fill(Global.selectedPerk[i])
        }
      }
      for ( var i = maxPerk; i < Global.MAX_PERK; i++ ){
        var slot = this.selectedPerkList.node.children[i].getComponent("perkSlot");
        slot.lock();
        slot.empty()
      }
    },
    pickPerk(){
      Common.loadScene("PerkScene",Global.MenuScene.node, Global.MenuScene.loading);
    }
});
