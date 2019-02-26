import Movable from "movable";
import Global from "global";
import Common from "common";
import Enemy from "enemy";

cc.Class({
  extends: cc.Component,

  properties: {
    level: 1,
    maxLevel: 5,
    skillName: null,
    displayName: "",
    desc: "",
    coolDown: {
      default: 5,
      notify(oldValue){
        if ( oldValue == this.coolDown ) return;
        this.countDownIcon.fillRange = (this.coolDown - this.countDown)/this.coolDown;
      }
    },
    icon:"",
    countDown: {
      default: 0,
      notify(oldValue){
        if ( oldValue == this.countDown ) return;
        this.countDownLabel.string = this.countDown == 0 ? "":this.countDown;
        this.countDownIcon.fillRange = (this.coolDown - this.countDown)/this.coolDown;
      }
    },
    _forbid:false,
    forbid: {
      get(){
        return this._forbid;
      },
      set(value){
        this._forbid = value;
        if ( value ) {
          this.forbidIcon.node.opacity = 255;
        } else {
          this.forbidIcon.node.opacity = 0;
        }
      }
    }
  },
  onLoad(){

  },
  start() {
    cc.find("skillName",this.node).getComponent(cc.Label).string = this.displayName;
    var iconLayout = cc.find("iconLayout",this.node);
    this.iconBg = cc.find("iconBg",iconLayout).getComponent(cc.Sprite);
    this.countDownIcon = cc.find("countDownIcon",iconLayout).getComponent(cc.Sprite);
    this.countDownLabel = cc.find("countDown",iconLayout).getComponent(cc.Label);
    this.forbidIcon = cc.find("forbidIcon",iconLayout).getComponent(cc.Sprite);

    this.countDownLabel.string = "";
    cc.loader.loadRes("Texture/"+this.icon, cc.SpriteFrame, (err, spriteFrame) => {
      this.iconBg.spriteFrame = this.countDownIcon.spriteFrame = spriteFrame;
    });
    this.iconBg.node.on('touchend', this.useSkill, this)
  },
  onDestroy(){
  },
  levelUp(level) {
    level = level || 1;
    this.level += level;
    this.onLevelUp();
  },
  useSkill() {
    if ( this.canUse() ) {
      Global.currentRoom.setAcceptInput(false);
      this.getComponent(this.skillName).onUsed();
      this.countDown = this.coolDown;
    }
  },
  canUse(){
    return !this.forbid && Global.currentRoom.isAcceptInput() && this.countDown <= 0;
  },
  reduceWait(turn){
    turn = turn || 1;
    this.countDown = Math.max(0, this.countDown - turn)
  },
  disturb(amount){
    if ( this.countDown !== 0) {
      this.countDown = Math.min(this.coolDown, amount+this.countDown);
    }
  },
  onGain() {
  },
  onLevelUp(){
  },
  levelUpDesc(){
    return "";
  },
  onTurnStart(){
    this.reduceWait()
  },
})
