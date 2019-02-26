import Skill from "skill";
import Global from "../global"
const Common = require("common");
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "spiderWebSkill"
    this.icon="Skill/spiderWebSkill";
    this.displayName = "蛛网术"
    this.desc = "所有敌人不能移动1回合";
  },
  levelUpDesc(level){
    return "冷却时间减少2回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 24;
  },
  onLevelUp(level){
    this.coolDown-=3;
    this.reduceWait(3)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");

    Global.currentRoom.foreachMovable(function(movable){
      if ( movable.getComponent("enemy") ) {
        movable.gainStatus("frozen",1)
      }
    },this)

    hero.afterUseSkill()
  }
  // update (dt) {},
});
