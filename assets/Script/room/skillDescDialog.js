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
    },

    setSkill(skillName, level){
      var skill = new cc.Node();
      skill.addComponent(skillName)
      skill = skill.getComponent(skillName);
      skill.initProperties(level)

      cc.loader.loadRes("Texture/Skill/"+skillName, cc.SpriteFrame,
        (err, frame)=>{
          cc.log(frame)
          this.icon.spriteFrame = frame;
      })
      this.titleLabel.string = "Lv"+level+" "+skill.displayName;
      this.descLabel.string = skill.desc+"\n\n冷却时间:"+skill.coolDown+"回合";
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
