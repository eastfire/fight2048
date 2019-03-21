const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");

cc.Class({
  extends: cc.Component,

  properties: {
    titleLabel: cc.Label,
    descLabel: cc.Label,
    priceLabel: cc.Label,
    upgradeButton: cc.Button,
    lockedIcon: cc.Sprite,
    unlockIcon: cc.Sprite,
    upgradeIcon: cc.Sprite,
    iconSprite: cc.Sprite,
    toggle: cc.Toggle,
    itemID: 0
  },

  onLoad: function () {
    this.node.on('touchend', function () {
      this.click();
    }, this);
  },

  click(){
    if ( !Storage.progress.perk[this.perkEntry.name] ) return;
    if ( this.perkEntry.active === true ) {
      if ( this.perkEntry.isSelected ) {
        this.perkEntry.isSelected = false;
        Global.ModeSelectScene.unselectPerk(this.perkEntry.name)
      } else {
        this.perkEntry.isSelected = true;
        Global.ModeSelectScene.selectPerk(this.perkEntry)
      }
    }
  },

  upgradePerk(){
    var level = Storage.progress.perk[this.perkEntry.name] || 0
    var price = this.perkEntry.price[level]
    if ( Global.MenuScene.star >= price ) {

      Storage.progress.perk[this.perkEntry.name] = level+1;
      Storage.saveProgress();
      Effect.useStarInMenu( this.upgradeButton.node.position, this.upgradeButton.node.parent,
        price,
        function(){
          this.updateItem(this.perkEntry, this.itemID);
          if ( Global.UnlockScene )
            Global.UnlockScene.refresh();
        }, this);
    }
  },

  updateItem: function(entry, itemID) {
    this.itemID = itemID;
    this.perkEntry = entry;
    var level = Storage.progress.perk[this.perkEntry.name] || 0
    var title = this.perkEntry.title;
    if ( level && this.perkEntry.price.length !== 1) {
      title += "Lv"+level
    }
    this.titleLabel.string = title;
    if ( typeof this.perkEntry.desc === "function") {
      this.descLabel.string = this.perkEntry.desc(Math.max(1,level));
    } else {
      this.descLabel.string = this.perkEntry.desc;
    }


    if ( this.perkEntry.isSelected ) {
      this.toggle.node.active = true;
      this.toggle.isChecked = true;
    } else {
      if (this.perkEntry.active && Storage.progress.perk[this.perkEntry.name]) {
        this.toggle.node.active = true;
        this.toggle.isChecked = false;
      } else {
        this.toggle.node.active = false;
      }
    }

    cc.loader.loadRes("Texture/Perk/"+this.perkEntry.name, cc.SpriteFrame,
      (err, frame)=>{
        this.iconSprite.spriteFrame = frame;
    })


    if ( level ) {
      this.lockedIcon.node.active = false;
      if ( level === this.perkEntry.price.length ) {
        this.upgradeButton.node.active = false;
      } else {
        var price = this.perkEntry.price[level]
        this.upgradeButton.node.active = true;
        this.priceLabel.string = "-"+price
        this.unlockIcon.node.active = false;
        this.upgradeIcon.node.active = true;
        this.upgradeButton.interactable = Global.MenuScene.star >= price
      }
    } else {
      this.lockedIcon.node.active = true;
      var price = this.perkEntry.price[level]
      this.upgradeButton.node.active = true;
      this.priceLabel.string = "-"+price
      this.unlockIcon.node.active = true;
      this.upgradeIcon.node.active = false;
      this.upgradeButton.interactable = Global.MenuScene.star >= price
    }
  },
});
