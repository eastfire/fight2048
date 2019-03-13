import Skill from "skill";
import Global from "../global"
import Common from "../common";
import Enemy from "../enemy/enemy"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return this.level;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "exchangeSkill"
    this.icon="Skill/exchangeSkill";
    this.displayName = "安装炸弹"
    this.desc = "将所有道具变为炸弹";
  },
  levelUpDesc(level){
    return "冷却时间减少1回合"
  },
  onLoad () {
    this._super()
  },
  start () {
    this._super()
    this.coolDown = 12+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown --;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero")
    var itemList = Global.currentRoom.filterMovable(function(movable){
      return movable.getComponent("item") && movable.getComponent("item").exchangeable;
    },this)

    itemList.forEach(function(item){
      var position = item.positions[0]
      Global.currentRoom.removeMovable(item);
      Global.currentRoom.itemFactory.generateOneItem(position, "bomb", 3)
    },this)
    //TODO skill EFFECT
    this.scheduleOnce(function(){
      hero.afterUseSkill()
    }, Global.HERO_ATTACK_TIME/2);
  },
  // update (dt) {},
});
