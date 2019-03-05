import Global from "global";
import Common from "common"
import Storage from "storage";

cc.Class({
  extends: cc.Component,

  properties: {
    titleLabel:{
      default: null,
      type: cc.Label
    },
    descLabel:{
      default: null,
      type: cc.Label
    },
    valueLabel:{
      default: null,
      type: cc.Label
    },
    iconSprite:{
      default: null,
      type: cc.Sprite
    },
    toggle:{
      default: null,
      type: cc.Toggle
    },
    itemID: 0
  },

  onLoad: function () {
    this.node.on('touchend', function () {
      console.log("Item " + this.itemID + ' clicked');
      if ( this.toggle.active === true ) {
        if ( this.toggle.isChecked ) {
          this.toggle.isChecked = false;
          Global.ModeSelectScene.unselectPerk(this.perkEntry.name)
        } else {
          this.toggle.isChecked = true;
          Global.ModeSelectScene.selectPerk(this.perkEntry)
        }
      }
    }, this);
  },

  updateItem: function(entry, itemId) {
    this.itemID = itemId;
    this.perkEntry = entry;
    this.titleLabel.string = this.perkEntry.title;
    this.descLabel.string = this.perkEntry.desc;
    if ( this.perkEntry.value ) {
      var adjust = Math.round(this.perkEntry.value * Global.PERK_SCORE_ADJUST*100)
      if ( adjust > 0 ) {
        this.valueLabel.string = "+"+adjust+"%"
        this.valueLabel.color = cc.Color.BLUE
      } else {
        this.valueLabel.string = adjust+"%"
        this.valueLabel.color = cc.Color.RED
      }
    } else {
      this.valueLabel.string = ""
    }
    if ( this.perkEntry.isSelected ) {
      this.toggle.active = true;
      this.toggle.isChecked = true;
    } else {
      var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
      if ( Global.selectedPerk.length >= maxPerk ) {
        this.toggle.active = false;
      } else {
        this.toggle.active = true;
        this.toggle.isChecked = false;
      }
    }

    cc.loader.loadRes(this.perkEntry.icon, cc.SpriteFrame,
      (err, frame)=>{
        this.iconSprite.spriteFrame = frame;
    })
  },
});
