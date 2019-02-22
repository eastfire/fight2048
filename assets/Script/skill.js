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
    icon:"",
    countDown: {
      default: 0,
      notify(oldValue){
        if ( oldValue == this.countDown ) return;
        this.countDownLabel.string = this.countDown == 0 ? "":this.countDown;
      }
    },
  },

  start() {
    cc.log(this.displayName)
    cc.find("skillName",this.node).getComponent(cc.Label).string = this.displayName;
    var iconLayout = cc.find("iconLayout",this.node);
    this.iconBg = cc.find("iconBg",iconLayout).getComponent(cc.Sprite);
    this.countDownIcon = cc.find("countDownIcon",iconLayout).getComponent(cc.Sprite);
    this.countDownLabel = cc.find("countDown",iconLayout).getComponent(cc.Label);

    this.countDownLabel.string = "";
    cc.loader.loadRes("Texture/Skill/"+this.icon, cc.SpriteFrame, (err, spriteFrame) => {
      this.iconBg.spriteFrame = this.countDownIcon.spriteFrame = spriteFrame;
    });
    this.iconBg.node.on('touchend', this.useSkill, this)
  },
  onDestroy(){
    this.iconBg.node.off("touchend")
  },
  levelUp(level) {
    level = level || 1;
    this.level += level;
  },
  useSkill() {
    if ( this.canUse() ) {
      this.countDown = this.coolDown;
    }
  },
  canUse(){
    return Global.currentRoom.isAcceptInput() && this.countDown <= 0;
  },
  reduceWait(turn){
    turn = turn || 1;
    this.countDown = Math.max(0, this.countDown - turn)
  },
  onGain() {

  },
  onTurnStart(){
    this.reduceWait()
  }
})
