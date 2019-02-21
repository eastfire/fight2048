import Movable from "movable";
import Global from "global";
import Common from "common";
import Enemy from "enemy";

cc.Class({
  extends: cc.Component,

  properties: {
    level: 1,
    maxLevel: 5,
    displayName: "",
    desc: "",
    levelUpDesc: "",
    coolDown: 5,
    countDown: 0,
  },
  start() {
    cc.find("skillName",this.node).getComponent(cc.Label).string = this.displayName;
    this.icon = cc.find("skillIcon",this.node).getComponent(cc.Sprite);
    this.countDownLabel = cc.find("countDown",this.node).getComponent(cc.Label);
  },
  levelUp(level) {
    level = level || 1;
    this.level += level;
  },
  useSkill() {
    this.countDown = this.coolDown;
  },
  canUse(){
    return this.countDown <= 0;
  },
  reduceWait(turn){
    turn = turn || 1;
    this.countDown = Math.max(0, this.countDown - turn)
  },
  onGain() {

  },
})
