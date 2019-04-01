"use strict";

const Storage = require("storage");
const Global = require("global");
const Common = require("common");
const RoomEntry = require("roomEntry")

cc.Class({
  extends: cc.Component,

  properties: {
    loading: cc.Prefab,
    inputNameDialog: cc.Prefab,
    hintLabel: cc.Label
  },
  onLoad: function() {
    cc.debug._resetDebugSetting(cc.debug.DebugMode.INFO);
    cc.log(cc.sys)
  },
  start(){
    Storage.loadUserInfo();
    Storage.loadGame();
    cc.log(Storage.game)
    cc.audioEngine.setEffectsVolume(Storage.game.effectVolume  === undefined ? 1 : Storage.game.effectVolume )
    cc.audioEngine.setMusicVolume(Storage.game.musicVolume === undefined ? 1 : Storage.game.musicVolume );

    if ( cc.sys.platform === cc.sys.WECHAT_GAME ) {
      this.hintLabel.node.active = false;
      this.getWXUserInfo(this.startGame, this)
    } else {
      this.node.on('touchend', this.onTouchEnded, this);
      this.node.on(cc.SystemEvent.EventType.KEY_DOWN, this.onTouchEnded, this);
    }
  },
  onDestroy () {
    this.node.off('touchend', this.onTouchEnded, this);
    this.node.off(cc.SystemEvent.EventType.KEY_DOWN, this.onTouchEnded, this);
  },
  onKeyDown(event){

  },
  onTouchBegan: function (touch, event) {
      return true;
  },
  //Trigger when moving touch
  onTouchMoved: function (touch, event) {
  },
  onTouchEnded(event){
    if ( Storage.userInfo ) {
      cc.log("Storage.userInfo"+JSON.stringify(Storage.userInfo))
      this.startGame();
    } else {
      this.getUserNickname(function(userInfo){
        this.startGame();
      }, this)
    }
  },

  getWXUserInfo(callback, context){
    var systemInfo = wx.getSystemInfoSync();
    this.wxUserInfoButton = wx.createUserInfoButton({
      type: 'text',
      text: '点击开始',
      style: {
        left: systemInfo.windowWidth/2-200,
        top: systemInfo.windowHeight*3/4-100,
        width: 400,
        height: 200,
        lineHeight: 200,
        backgroundColor: '#000000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 28,
        borderRadius: 4
      }
    })
    this.wxUserInfoButton.onTap((res) => {
      console.log(res)
      if ( res ) {
        var userInfo = {
          nickname: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        }
        Storage.saveUserInfo(userInfo)
        this.wxUserInfoButton.destroy()
        callback.call(context, userInfo)
      }
    })
  },

  getUserNickname(callback, context){
    //弹出输入框
    var dialog = cc.instantiate(this.inputNameDialog);
    dialog.getComponent("inputNameDialog").setCallback(function(nickname){
      var userInfo = {
        nickname: nickname,
      }
      Storage.saveUserInfo(userInfo)
      callback.call(context, nickname)
    }, this)
    this.node.addChild(dialog)
  },

  startGame(){
    //Load data
    Storage.loadMoney();

    Global.currentHeroType = Storage.game.heroType || "normal"
    Global.selectedPerk = Storage.game.perks || [];

    Storage.loadUnlock();
    Storage.loadStatistics();
    Storage.loadRewardTaken();
    Storage.loadAchievement();
    Storage.loadProgress();
    Storage.loadTutorial();

    cc.log(Storage.tutorial);

    var n = cc.instantiate(this.loading);
    n.x = n.y = 0;
    this.node.addChild(n)

    cc.loader.loadResDir("Texture/Perk", cc.SpriteFrame, (err, res)=>{
      cc.loader.loadResDir("Texture/Unlock", cc.SpriteFrame, (err, res)=>{
        cc.loader.loadResDir("Texture/Skill", cc.SpriteFrame, (err, res)=>{
          if ( Storage.statistics.gameTime === 0 ) {
            //first time game
            Global.reset();
            Global.currentHeroType = "normal"
            Global.loadRoomEntry(RoomEntry.tutorial1)
            cc.director.loadScene("RoomScene");
          } else {
            Global.loadRoomEntry(RoomEntry.normal)
            cc.director.loadScene("MenuScene");
          }
        })
      })
    })
  }
});
