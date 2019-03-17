import Status from "status"
import Global from "global"
import Common from "common"

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
    this.statusName = "nail"
  },

  onGain(tile){

    cc.loader.loadRes("Prefab/nail", cc.Prefab,
      (err, prefab)=>{
        this.nailSprite = cc.instantiate(prefab)
        this.nailSprite.x = this.nailSprite.y = 0;
        if ( tile.effectLayer ) {
          tile.effectLayer.addChild(this.nailSprite)
          this.hideNail();
        }
    })
  },
  showNail(){
    cc.find("attackSprite", this.nailSprite).active = true
    cc.log(cc.find("attackSprite", this.nailSprite))
  },
  hideNail(){
    cc.find("attackSprite", this.nailSprite).active = false;
    cc.log(cc.find("attackSprite", this.nailSprite))
  },
  onLost(tile){
    this.nailSprite.destroy()
  },
  onTurnEnd(tile){
    this.showNail();
    var hero = Global.currentRoom.hero.getComponent("hero");
    var movable = Global.currentRoom.getMovableByTile(tile)
    if ( movable ) {
      if ( movable.getComponent("enemy") ) {
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
  }
  // update (dt) {},
});
