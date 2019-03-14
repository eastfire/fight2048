import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    unlockNameLabel: cc.Label,
    unlockIcon: cc.Sprite,
    unlockButton: cc.Button,
    starIcon:cc.Sprite,
    priceLabel: cc.Label,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    this.node.on("touchend",function(){
      if ( this.entry.type == "skill" ) {
        if ( this.toggle ) {
          this.unlockNameLabel.string = this.entry.displayName;
          this.toggle = false;
        } else {
          var skill = new cc.Node();
          skill.addComponent(this.entry.name)
          skill = skill.getComponent(this.entry.name)
          this.unlockNameLabel.string = skill.desc;
          this.toggle = true;
        }
      }
    },this)
  },

  updateItem: function(entry, itemID) {
    this.itemID = itemID;
    this.entry = entry;
    this.priceLabel.string = this.entry.price;
    this.unlockNameLabel.string = this.entry.displayName;
    cc.loader.loadRes(this.entry.icon, cc.SpriteFrame,
      (err, frame)=>{
        this.unlockIcon.spriteFrame = frame;
    })

    if ( this.entry.avaiable ) {
      this.unlockButton.interactable = true;
    } else {
      this.unlockButton.interactable = false;
    }
    this.toggle = false;
  },

  click(){
    if ( Global.MenuScene.star >= this.entry.price
    && !Storage.unlocked[this.entry.name]) {
      this.unlockButton.interactable = false;
      Global.UnlockScene.unlock(this.entry, this.unlockButton);
    }
  },
  // update (dt) {},
});
