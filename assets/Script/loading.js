cc.Class({
  extends: cc.Component,
  properties: {
    iconSprite: cc.Sprite
  },
  start(){
    var time = 0.3
    this.iconSprite.node.runAction(cc.repeatForever(
      cc.scaleTo(time,1.15,0.85).easing(cc.easeIn(1)),
      cc.scaleTo(time,0.85,1.15).easing(cc.easeOut(1)),
    ))
    this.node.x = this.node.y = 0;
  }
})
