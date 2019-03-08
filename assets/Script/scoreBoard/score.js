import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"

cc.Class({
  extends: cc.Component,

  properties: {
    nicknameLabel: cc.Label,
    avatar: cc.Sprite,
    scoreLabel:cc.Label,
    turnLabel:cc.Label,
    perkLayout: cc.Layout,
    killByLabel: cc.Label,
    killByIcon: cc.Sprite,
    timeLabel: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
  },

  updateItem: function(entry, itemID) {
    this.itemID = itemID;
    this.entry = entry;
    this.nicknameLabel.string = entry.nickname;
    this.scoreLabel.string = entry.score;
    this.turnLabel.string = entry.turn;
    if ( entry.type == "enemy" ) {
      this.killByLabel.string = "死于Lv"+entry.enemy.level;
      cc.loader.loadRes("Texture/Enemy/"+entry.enemy.type, cc.SpriteFrame,
        (err, frame)=>{
          this.killByIcon.spriteFrame = frame;
      })
    } else if ( entry.type == "poison" ) {
      this.killByLabel.string = "死于";
      cc.loader.loadRes("Texture/Status/status-poison", cc.SpriteFrame,
        (err, frame)=>{
          this.killByIcon.spriteFrame = frame;
      })
    }
    this.timeLabel.string = entry.time;

    cc.loader.load({
      url: entry.avatarUrl,
      type: "jpeg"
    }, function (err, texture) {
      if (err) {
        return;
      }
      this.avatar.spriteFrame = new cc.SpriteFrame(texture);
    });
    this.layoutPerk();
  },

  layoutPerk(){
    this.perkLayout.node.removeAllChildren();
    this.entry.perks.forEach(function(perkName){
      var perkNode = new cc.Node();
      perkNode.addComponent(cc.Sprite);
      perkNode.getComponent(cc.Sprite).spriteFrame
      cc.loader.loadRes("Texture/Perk/"+perkName, cc.SpriteFrame,
        (err, frame)=>{
          perkNode.spriteFrame = frame;
      })
      this.perkLayout.addChild(perkNode);
    },this)
  }
  // update (dt) {},
});
