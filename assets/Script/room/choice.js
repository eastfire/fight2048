cc.Class({
    extends: cc.Component,

    properties: {
      choiceIconSprite: cc.Sprite,
      choiceNameLabel: cc.Label,
      choiceDescLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      cc.loader.loadRes(this.choice.icon, cc.SpriteFrame, (err, spriteFrame) => {
        this.choiceIconSprite.spriteFrame = spriteFrame;
      });
      this.choiceNameLabel.string = this.choice.name;
      if ( typeof this.choice.desc === "function") {
        this.choiceDescLabel.string = this.choice.desc();
      } else {
        this.choiceDescLabel.string = this.choice.desc;
      }

      this.node.on("touchend",this.choose,this)
    },
    choose(){
      this.node.off("touchend",this.choose,this)
      this.choice.onChosen();
      this.dialog.onOk();
    }
    // update (dt) {},
});
