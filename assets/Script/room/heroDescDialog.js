const Global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
      icon: cc.Sprite,
      titleLabel: cc.Label,
      descLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.currentRoom.setAcceptInput(false);

      var type = Global.currentHeroType;

      cc.loader.loadRes("Texture/Hero/unlock-"+type,cc.SpriteFrame,(err,frame)=>{
        this.icon.spriteFrame = frame;
      })

      this.titleLabel.string = {
        "normal":"战士",
        "cleric":"牧师",
        "wizard":"法师",
        "thief":"盗贼"
      }[type]
      var desc = "";

      var hasPassiveSkill = false
      Global.currentRoomScene.forEachSkill(function(skill){
        if ( skill.isPassive ) {
          hasPassiveSkill = true
          desc += "Lv"+skill.level+" "+skill.displayName+":"+skill.desc+"\n"
        }
      },this)
      if ( !hasPassiveSkill ) {
        desc += "无被动技能\n"
      }

      var hasNegativeStatus = false
      Global.currentRoom.hero.getComponent("movable").forEachStatus(function(status){
        if (status.desc) {
          hasNegativeStatus = true;
          desc += status.title
          if ( status.duration !== -1 ) {
            desc += "("+status.duration+"回合)"
          }
          desc +=" :"+status.desc
          desc +="\n"
        }
      },this)
      if ( !hasNegativeStatus ) {
        desc += "无异常状态"
      }

      this.descLabel.string = desc;
    },

    closeDialog(){
      this.node.runAction(cc.sequence(
        cc.fadeOut(Global.DIALOG_EXIT_TIME),
        cc.removeSelf()
      ))
      Global.currentRoom.setAcceptInput(true);
    }
    // update (dt) {},
});
