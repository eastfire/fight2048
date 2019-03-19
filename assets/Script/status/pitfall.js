const Status = require("status");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Status,

  properties: {
    effect:{
      get(){
        return 10
      },
      visible: false
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "pitfall"
  },

  onGain(tile){
    tile._isCapture = true;
    cc.loader.loadRes("Prefab/pitfall", cc.Prefab,
      (err, prefab)=>{
        this.trapSprite = cc.instantiate(prefab)
        this.trapSprite.x = this.trapSprite.y = 0;
        if ( tile.effectLayer ) {
          tile.effectLayer.addChild(this.trapSprite)
        }
    })
  },
  onLost(tile){
    this.trapSprite.destroy()
    tile._isCapture = false;
  },

  // update (dt) {},
});
