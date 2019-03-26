const Global = require("global");
const Common = require("common");
const Storage = require("storage");

cc.Class({
  extends: cc.Component,

  properties: {
    effectSlider: cc.Slider,
    musicSlider: cc.Slider,
    soundToggle: cc.Toggle,
    soundTitle: cc.Label,
    musicTitle: cc.Label,
    allSoundTitle: cc.Label,
  },

  start () {
    Global.currentRoom.setAcceptInput(false);
    if ( cc.sys.platform === cc.sys.WECHAT_GAME ) {
      this.effectSlider.node.active = this.musicSlider.node.active = this.soundTitle.node.active = this.musicTitle.node.active = false;
      this.soundToggle.isChecked = cc.audioEngine.getMusicVolume() > 0;
    } else {
      this.soundToggle.node.active = false;
      this.effectSlider.progress = cc.audioEngine.getEffectsVolume()
      this.musicSlider.progress = cc.audioEngine.getMusicVolume()
    }
  },

  cancel(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.removeSelf()
    ))
    Global.currentRoom.setAcceptInput(true);
  },

  exitGame(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.callFunc(function(){
        Common.loadScene("MenuScene", Global.currentRoomScene.node, Global.loading)
      },this)
    ))
    Global.currentRoom.setAcceptInput(true);
  },
  restartGame(){
    this.node.runAction(cc.sequence(
      cc.fadeOut(Global.DIALOG_EXIT_TIME),
      cc.callFunc(function(){
        Common.loadScene("RoomScene", Global.currentRoomScene.node, Global.loading)
      },this)
    ))
  },
  toggleSound(){
    if ( this.soundToggle.isChecked ) {
      Storage.game.effectVolume = 1;
      Storage.game.musicVolume = 1;
      cc.audioEngine.setEffectsVolume(1)
      cc.audioEngine.setMusicVolume(1)
    } else {
      Storage.game.effectVolume = 0;
      Storage.game.musicVolume = 0;
      cc.audioEngine.setEffectsVolume(0)
      cc.audioEngine.setMusicVolume(0)
    }
    Storage.saveGame();
  },
  adjustEffect(){
    Storage.game.effectVolume = this.effectSlider.progress;
    cc.audioEngine.setEffectsVolume(this.effectSlider.progress )
    Storage.saveGame();
  },
  adjustMusic(){
    Storage.game.musicVolume = this.musicSlider.progress;
    cc.audioEngine.setMusicVolume(this.musicSlider.progress );
    Storage.saveGame();
  }
})
