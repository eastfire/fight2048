// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
      this.choiceDescLabel.string = this.choice.desc;
      this.node.on("touchend",this.choose,this)
    },
    choose(){
      this.choice.onChosen();
      this.dialog.onOk();
    }
    // update (dt) {},
});
