const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const Perks = require("perkEntry");
const RoomEntry = require("roomEntry")
import {sampleSize} from "lodash";

cc.Class({
    extends: cc.Component,

    properties: {
      gemTypeSelect: cc.ToggleContainer,
      generateSelect: cc.ToggleContainer,
      thresholdSelect: cc.ToggleContainer,
      mapSelect: cc.ToggleContainer,
      timeoutSelect: cc.ToggleContainer,
      loading: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.ModeSelectScene = this;
      this.gemType = 5;
      this.generateGem = 3;
      this.threshold = 3;
      this.map = "5x5";
      this.timeout = 3;
    },

    selectGemType(event, options){
      this.gemType = options;
    },
    selectGenerate(event, options){
      this.generateGem = options;
    },
    selectThreshold(event, options){
      this.threshold = options;
    },
    selectMap(event, options){
      this.map = options;
    },
    selectTimeout(event, options){
      this.timeout = options;
    },
    starGame(){
    
      Global.ModeSelectScene = null;
      Global.reset();

      Global.ITEM_POOL = sampleSize(Global.initItemPool, this.gemType);
      Global.GEM_PER_TURN = this.generateGem;
      Global.DISAPPEAR_THRESHOLD = this.threshold;
      Global.TURN_TIMEOUT = this.timeout;

      Global.loadRoomEntry(RoomEntry[this.map])
      Common.loadScene("MainGameScene",this.node, this.loading);
    },
});
