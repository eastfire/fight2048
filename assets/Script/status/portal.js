const Status = require("status");
const Global = require("global");
const Common = require("common");

cc.Class({
  extends: Status,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  ctor(){
    this.statusName = "portal";

  },

  onGain(tile){
    cc.loader.loadRes("Prefab/portal"+this.extra.type, cc.Prefab,
      (err, prefab)=>{
        this.sprite = cc.instantiate(prefab)
        this.sprite.x = this.sprite.y = 0;
        if ( tile.effectLayer ) {
          tile.effectLayer.addChild(this.sprite)
          this.attackSprite = cc.find("attackSprite", this.nailSprite)
          this.hideNail();
        }
    })
  },
  showNail(){
    this.attackSprite.opacity = 255
  },
  hideNail(){
    this.attackSprite.opacity = 0;
  },
  onLost(tile){
    this.nailSprite.destroy()
  },
  onTurnEnd(tile){
    this.showNail();
    var hero = Global.currentRoom.hero.getComponent("hero");
    var movable = Global.currentRoom.getMovableByTile(tile)
    if ( movable ) {
      if ( movable.getComponent("enemy") && !movable.getComponent("boss") ) {
        var attackDetail = {
          fromPosition:{
            x:tile.x,
            y:tile.y-1
          },
          type:Common.ATTACK_TYPE_ENV
        };
        movable.beHit(hero, attackDetail);
      } else if ( movable.getComponent("hero") ) {
        hero.loseHp(this.effect,{type:"nail", amount: this.effect})
      }
    }
    Global.currentRoom.scheduleOnce(()=>{
      this.hideNail();
    }, Global.HERO_ATTACK_TIME)
    Global.currentRoom.setDelayPhaseTime( Global.HERO_ATTACK_TIME+0.05 );

    this._super(tile);
  }
  // update (dt) {},
});
