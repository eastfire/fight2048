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
    this.statusName = "backwardSlashStatus"
  },

  start () {

  },

  beforeNormalAttack(hero){
    var enemy = Global.currentRoom.getMovableByPosition(Common.getDecrementPosition(hero.positions[0], hero.face));
    if ( enemy && enemy.getComponent("enemy") ){
      this.scheduleOnce(()=>{
      var attackDetail = {
        fromPosition: hero.positions[0],
        type: Common.ATTACK_TYPE_MELEE
      }
      if ( enemy.checkHit(hero, attackDetail) ) {
        enemy.beHit(hero, attackDetail);
      } else {
        enemy.dodgeAttack(hero, attackDetail);
      }
      },Global.HERO_ATTACK_TIME/2)

      Global.currentRoom.setDelayPhaseTime(Global.HERO_ATTACK_TIME+0.1)
    }


  },
  // update (dt) {},
});
