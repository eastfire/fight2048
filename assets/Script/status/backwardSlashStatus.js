import Status from "status"
import Global from "../global"
import Common from "../common"

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
    this.scheduleOnce(()=>{
      var enemy2 = Global.currentRoom.getMovableByPosition(Common.getDecrementPosition(hero.positions[0], hero.face));
      if ( enemy2 && enemy2.getComponent("enemy") ){
        var attackDetail = {
          fromPosition: hero.positions[0],
          type: Common.ATTACK_TYPE_MELEE
        }
        if ( enemy2.checkHit(hero, attackDetail) ) {
          enemy2.beHit(hero, attackDetail);
        } else {
          enemy2.dodgeAttack(hero, attackDetail);
        }
      }
    },Global.HERO_ATTACK_TIME/2)
  },
  // update (dt) {},
});
