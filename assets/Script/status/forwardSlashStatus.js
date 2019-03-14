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
    this.statusName = "forwardSlashStatus"
  },

  start () {

  },

  beforeNormalAttack(hero){
    this.scheduleOnce(()=>{
      var forwardPosition = Common.getIncrementPosition(hero.positions[0], hero.face)
      var enemy2 = Global.currentRoom.getMovableByPosition(
        Common.getIncrementPosition(forwardPosition, hero.face));
      if ( enemy2 && enemy2.getComponent("enemy") ){
        var attackDetail = {
          fromPosition: forwardPosition,
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
