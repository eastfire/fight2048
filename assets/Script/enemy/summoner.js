const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "唤云师";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并时在场上生成一朵乌云阻挡你的视线。（等级越高云朵越多）。\n攻击力较低。\n经验值较低。";
      },
      override: true,
    },
    exp: {
      get(){
        var l = this.level+this.star
        return (Math.round(l*3/2) - 1)*Global.EXP_INFLATION_RATE; //较低
      },
      override: true
    },
    attack: {
      get(){
        return this.level; //较低
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "summoner"
  },
  getCloudNumber(){
    return Math.min(3, Math.ceil(this.level / 10 ));
  },
  getCloudTime(){
    return Math.min(4, Math.ceil(this.level / 6 ))+1+Global.NEGATIVE_EFFECT_TIME_ADJUST;
  },
  afterBeMerged(movable){
    this._super(movable);
    if ( movable.getComponent("summoner") ) {
      var emptyTiles = Global.currentRoom.filterTile(function(tile){
        return tile.getComponent("tile").isPassable(this) && !tile.getComponent("tile").getStatus("cloud")
      },this)
      Common.sample(emptyTiles, this.getCloudNumber() ).forEach(function(tile){
        tile.getComponent("tile").gainStatus("cloud", this.getCloudTime())
      },this)
    }
  },

  // update (dt) {},
});
