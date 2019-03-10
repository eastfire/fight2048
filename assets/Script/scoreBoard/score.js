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
    detailLayout: cc.Layout,
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
    cc.log(entry)
    this.turnLabel.string = entry.turn;
    this.timeLabel.string = entry.time;

    if ( entry.avatarUrl ) {
      cc.loader.load({
        url: entry.avatarUrl,
        type: "jpeg"
      }, function (err, texture) {
        if (err) {
          return;
        }
        this.avatar.spriteFrame = new cc.SpriteFrame(texture);
      });
    }
    this.layoutDetail();
  },

  loadIcon(sprite, icon){
    cc.loader.loadRes(icon, cc.SpriteFrame,
      (err, frame)=>{
        sprite.spriteFrame = frame;
        sprite.node.width = 45
        sprite.node.height = 45
    })
  },

  layoutDetail(){
    this.detailLayout.node.removeAllChildren();
    if ( !this.entry.detail ) return;
    var slot = new cc.Node();
    slot.addComponent(cc.Sprite);
    this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Hero/unlock-"+this.entry.detail.type)
    slot.y = 0;
    this.detailLayout.node.addChild(slot)
    this.entry.detail.skills.forEach(function(skill){
      var slot = new cc.Node()
      slot.addComponent(cc.Sprite)
      this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Skill/"+skill)
      slot.y = 0;
      this.detailLayout.node.addChild(slot)
    },this)
    this.entry.detail.perks.forEach(function(perkName){
      var slot = new cc.Node();
      slot.addComponent(cc.Sprite);
      slot.getComponent(cc.Sprite).spriteFrame
      cc.loader.loadRes("Texture/Perk/"+perkName, cc.SpriteFrame,
        (err, frame)=>{
          if ( err ) {
            cc.log(err)
          } else {
            slot.spriteFrame = frame;
          }
      })
      this.detailLayout.node.addChild(slot);
    },this)

    if ( this.entry.detail.killedBy.type == "enemy" ) {
      this.killByLabel.string = "Lv"+this.entry.detail.killedBy.level;
      var enemyType = this.entry.detail.killedBy.enemy;
      if ( enemyType == "slime" ) {
        enemyType = "slime-red"
      }
      cc.loader.loadRes("Texture/Enemy/"+enemyType, cc.SpriteFrame,
        (err, frame)=>{
          if ( err ) {
            cc.log(err)
          } else {
            this.killByIcon.spriteFrame = frame;
          }
      })
    } else if ( this.entry.detail.killedBy.type == "poison" ) {
      this.killByLabel.string = "";
      cc.loader.loadRes("Texture/Status/status-poison", cc.SpriteFrame,
        (err, frame)=>{
          this.killByIcon.spriteFrame = frame;
      })
    }
  }
  // update (dt) {},
});
