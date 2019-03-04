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

      cc.loader.loadRes(this.perkEntry.icon, cc.SpriteFrame,
        (err, frame)=>{
          this.iconSprite.spriteFrame = frame;
      })
  },
});
