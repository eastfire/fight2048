const Global = require("global");
const Storage = require("storage");
const Common = require("common");
const Perks = require("perkEntry");
const RoomEntry = require("roomEntry")
import {cloneDeep} from "lodash";

cc.Class({
    extends: cc.Component,

    properties: {
      gemTypeSelect: cc.ToggleContainer,
      generateSelect: cc.ToggleContainer,
      thresholdSelect: cc.ToggleContainer,
      mapSelect: cc.ToggleContainer,
      loading: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.ModeSelectScene = this;
      this.gemType = 4;
      this.generateGem = 2;
      this.threshold = 2;
      this.map = "5x5";
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

    starGame(){
    
      Global.ModeSelectScene = null;
      Global.reset();
      Global.ITEM_POOL = cloneDeep(Global.initItemPool)

      cc.log(Global.ITEM_POOL)
      Global.ITEM_POOL.splice(this.gemType,10);
      Global.GEM_PER_TURN = this.generateGem;
      Global.DISAPPEAR_THRESHOLD = this.threshold;
      cc.log(Global.ITEM_POOL)
      cc.log(RoomEntry[this.map])
      Global.loadRoomEntry(RoomEntry[this.map])
      Common.loadScene("RoomScene",this.node, this.loading);
    },
});
