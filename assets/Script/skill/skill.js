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
    coolDown: {
      default: 5,
      notify(oldValue){
        if ( oldValue == this.coolDown || this.countDownIcon == null ) return;
        if ( this.countDownIcon ) {
          this.countDownIcon.fillRange = (this.coolDown - this.countDown)/this.coolDown;
        }
      }
    },
    icon:"",
    countDown: {
      default: 0,
      notify(oldValue){
        if ( oldValue == this.countDown || this.countDownLabel == null) return;
        this.countDownLabel.string = this.countDown == 0 ? "":this.countDown;
        this.countDownIcon.fillRange = (this.coolDown - this.countDown)/this.coolDown;
      }
    },
    forbid: {
      default: false,
      notify(oldValue){
        if ( oldValue == this.forbid ) return;
        this.forbidIcon.node.active = this.forbid;
      }
    }
  },
  onLoad(){
    var iconLayout = cc.find("iconLayout",this.node);
    this.iconBg = cc.find("iconBg",iconLayout).getComponent(cc.Sprite);
    this.countDownIcon = cc.find("countDownIcon",iconLayout).getComponent(cc.Sprite);
    this.countDownLabel = cc.find("countDown",iconLayout).getComponent(cc.Label);
    this.forbidIcon = cc.find("forbidIcon",iconLayout).getComponent(cc.Sprite);
  },
  start() {
    this.forbidIcon.node.active = this.forbid;
    cc.find("skillName",this.node).getComponent(cc.Label).string = this.displayName;
    this.countDownLabel.string = "";
    cc.loader.loadRes("Texture/"+this.icon, cc.SpriteFrame, (err, spriteFrame) => {
      this.iconBg.spriteFrame = this.countDownIcon.spriteFrame = spriteFrame;
    });
    this.iconBg.node.on('touchcancel', this.cancelSkillDesc, this)
    this.iconBg.node.on('touchmove', this.cancelSkillDesc, this)
    this.iconBg.node.on('touchstart', this.startSkillDesc, this)
    this.iconBg.node.on('touchend', this.useSkill, this)

    this.countDownIcon.fillRange = (this.coolDown - this.countDown)/this.coolDown;
  },
  onDestroy(){
  },
  startSkillDesc(){
    this.scheduleOnce(this.showSkillDesc, 1);
    cc.log("start count")
  },
  cancelSkillDesc(){
    cc.log("cancel count")
    this.unschedule(this.showSkillDesc);
  },
  showSkillDesc(){
    var dialog = cc.instantiate(Global.currentRoomScene.skillDescDialog)
    dialog.getComponent("skillDescDialog").setSkill(this.skillName, this.level);
    dialog.x = dialog.y = 0;
    Global.currentRoomScene.node.addChild(dialog)
  },
  initProperties(level, countDown, forbid) {
    for ( var i = this.level; i < level; i++ ) {
      this.levelUp();
    }
    this.forbid = forbid || false;
    this.countDown = countDown || 0;
  },
  levelUp() {
    //允许超过最大等级，检查是否超过由choiceFactory决定
    this.level ++;
    this.onLevelUp();
  },
  useSkill() {
    this.cancelSkillDesc();
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
