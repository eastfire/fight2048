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
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.toggle.isChecked = false;

    this.titleLabel.string = this.title;
    this.descLabel.string = this.desc;
    if ( this.value ) {
      var adjust = Math.round(this.value * Global.PERK_SCORE_ADJUST*100)
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

    cc.loader.loadRes(this.icon, cc.SpriteFrame,
      (err, frame)=>{
        this.iconSprite.spriteFrame = frame;
    })
    this.validate()
  },

  click() {
    if ( this.toggle.isChecked ) {
      this.select();
    } else {
      this.unselect();
    }
  },

  select() {
    Global.ModeSelectScene.selectPerk(this.perkName,this.icon)
  },

  unselect() {
    Global.ModeSelectScene.unselectPerk(this.perkName)
  },

  validate(){
    var maxPerk = Storage.progress.maxPerk[Global.currentHeroType] || 1;
    if ( !this.toggle.isChecked && Global.selectedPerk.length >= maxPerk ) {
      this.toggle.interactable = false
    } else {
      this.toggle.interactable = true
    }
  },
   // update (dt) {},
});
