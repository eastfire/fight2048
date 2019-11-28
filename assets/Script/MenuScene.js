const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const Effect = require("effect");
const Perks = require("perkEntry");

const MS_OF_MINUTE = 60000;
const MS_OF_DAY = 3600*24*1000;

cc.Class({
  extends: cc.Component,

  properties: {
    
    loading: cc.Prefab
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    Storage.loadUnlock();
    Global.MenuScene = this;
  },

  start () {    

    Global.reset();
  },  
  starGame(){
    
    Global.ModeSelectScene = null;

    Common.loadScene("RoomScene",this.node, this.loading);
  },
  loadMovablePrefabs(){

  }
  // update (dt) {},
});
