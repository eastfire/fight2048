const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const DataSource = require("LeanCloudDataSource");
const Effect = require("effect")

cc.Class({
    extends: cc.Component,

    properties: {
      scoreLabel: cc.Label,
      skillPerkList: cc.Layout,
      submitButton: cc.Button,
      inputNameDialog: cc.Prefab,
      doubleReward: cc.Button,
      rewardLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.submitScore();
      this.rewardTaken = 0;
      this.doubleRewardTaken = false;
      this.checkAd()
      this.getReward();
    },

    submitScore(callback, context){
      if ( !Global.dataSource ) {
        Global.dataSource = new DataSource();
      }
      //TODO 显示loading
      this.scoreEntry.nickname = Storage.userInfo.nickname;
      this.scoreEntry.avatarUrl = Storage.userInfo.avatarUrl;
      Global.dataSource.submitScore(this.scoreEntry, {
        success(){
          //TODO 结束loading
          if ( callback ) {
            callback.call(context)
          }
        },
        error(error){
          //TODO 结束loading
        },
        context: this
      })
    },

    loadIcon(sprite, icon){
      cc.loader.loadRes(icon, cc.SpriteFrame,
        (err, frame)=>{
          sprite.spriteFrame = frame;
          sprite.node.width = 50
          sprite.node.height = 50
      })
    },

    getReward(){
      var turn = Global.currentRoom.turn;
      var reward = 1;
      turn -= Global.REWARD_THRESHOLD;
      reward += Math.ceil(Math.max(0,turn)/10)
      var sliceNumber = 10;
      var slice = Math.ceil(reward/sliceNumber);
      var self = this;
      for ( var i = 0; i < sliceNumber; i++ ) {
        if ( reward <= 0 ) break;
        reward -= slice;
        if ( reward < 0 ) slice = slice+reward;
        (function(slice, delay){
          self.scheduleOnce(()=>{
            self.rewardTaken += slice;
            self.rewardLabel.string = self.rewardTaken;
            Effect.gainStarInRoom(self.rewardLabel.node.position,slice)
          }, delay);
        })(slice, 0.1*i)
      }
    },

    checkAd(){
      this.adPrepared = true;

      if ( this.adPrepared && !this.doubleRewardTaken ) {
        this.doubleReward.node.active = true;
      } else {
        this.doubleReward.node.active = false;
      }
    },

    takeDoubleReward(){
      this.playAd({
        success: function(){
          this.doubleRewardTaken = true;
          this.checkAd();
          this.getReward();
        },
        context: this,
      })

    },

    playAd(opt){
      //todo play ad
      opt.success.call(opt.context)
    },

    setReason(reason){
      cc.log("setReason")
      this.scoreEntry = {
        detail:{}
      };
      if ( Storage.userInfo ) {
        this.scoreEntry.nickname = Storage.userInfo.nickname
        this.scoreEntry.avatarUrl = Storage.userInfo.avatarUrl
      }

      Storage.recordGameOver(reason, Global.currentRoom, Global.currentRoom.hero.getComponent("hero"));
      this.scoreLabel.string = "";
      this.scoreLabel.string += "分数："+Global.currentRoomScene.score+"\n"
      this.scoreLabel.string += "经过"+Global.currentRoom.turn+"回合\n"
      this.scoreLabel.string += "升到Lv"+Global.currentRoom.hero.getComponent("hero").level+"\n"
      this.scoreLabel.string += "受到"+reason.damage+"伤害"
      this.scoreLabel.string += "死于"

      if ( reason.type === "poison" ) {
        this.scoreLabel.string += "中毒"
      } else if ( reason.type === "nail" ) {
        this.scoreLabel.string += "陷阱"
      } else if ( reason.type === "enemy" ) {
        if ( reason.enemy.isBoss ) {
          this.scoreLabel.string += reason.enemy.title
        } else {
          this.scoreLabel.string += "LV"+reason.enemy.level+reason.enemy.title
        }
      }

      var slot = new cc.Node()
      slot.addComponent(cc.Sprite)
      this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Hero/unlock-"+Global.currentRoom.hero.getComponent("hero").subtype)
      slot.y = 0;
      this.skillPerkList.node.addChild(slot)

      this.scoreEntry.detail.skills = [];
      Global.currentRoomScene.forEachActiveSkill(function(skill){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Skill/"+skill.skillName)
        this.scoreEntry.detail.skills.push(skill.skillName)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this)
      this.scoreEntry.detail.perks = [];
      Global.selectedPerk.forEach(function(name){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Perk/"+name)
        this.scoreEntry.detail.perks.push(name)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this);

      Storage.recordLastGame(Global.currentRoom, Global.currentRoom.hero.getComponent("hero"), this.scoreEntry.detail.perks);

      Global.currentRoom.node.active = false;
      Global.currentRoomScene.effectLayer.active = false;
      Global.currentRoomScene.exitButton.node.active = false;

      this.scoreEntry.score = Global.currentRoomScene.score;
      this.scoreEntry.turn = Global.currentRoom.turn;
      this.scoreEntry.detail.level = Global.currentRoom.hero.getComponent("hero").level
      this.scoreEntry.detail.type = Global.currentRoom.hero.getComponent("hero").subtype;
      this.scoreEntry.detail.killedBy = {
        type:reason.type,
        damage: reason.damage
      }
      if ( reason.type === "enemy" ) {
        this.scoreEntry.detail.killedBy.enemy = reason.enemy.type;
        this.scoreEntry.detail.killedBy.level = reason.enemy.level;
      }
    },
    toScoreBoard() {
      Global.currentRoom.destroy();
      Global.currentRoom = null;
      Common.loadScene("LeaderBoardScene",Global.currentRoomScene.node, Global.loading, function(){
      });
      Global.currentRoomScene = null;
    },
    home() {
      Global.currentRoom.destroy();
      Global.currentRoom = null;
      Common.loadScene("MenuScene",Global.currentRoomScene.node,Global.loading);
      Global.currentRoomScene = null;
    },
    restart(){
      this.node.runAction(cc.sequence(
        cc.fadeOut(Global.DIALOG_EXIT_TIME),
        cc.callFunc(function(){
          Common.loadScene("RoomScene", Global.currentRoomScene.node, Global.loading)
        },this)
      ))
    },
    onDestroy(){
      if ( this.wxUserInfoButton ) {
        this.wxUserInfoButton.destroy()
      }
    }
    // update (dt) {},
});
