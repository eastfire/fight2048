import Global from "global"

var labelEffect = function(str, color, parent, position) {
  var label = new cc.Node();
  label.addComponent(cc.Label)
  label.getComponent(cc.Label).string = str;
  position = position || {x:Math.random()*40-20,y:Math.random()*40-20}
  label.x = position.x;
  label.y = position.y;
  label.color = color;
  parent.addChild(label);
  label.runAction(cc.sequence(cc.moveBy(0.4+Math.random()*0.2, 0, 60+Math.random()*20),
    cc.fadeOut(0.2),
    cc.removeSelf()
  ))
}

const PI = 3.1415926;
var radianToAngle = function(radian){
  return radian / Math.PI / 2 * 360;
}

var projectArrow = function( from, to ) {
  var angle = 0;
  if ( from.x == to.x ) {
    if ( from.y > to.y ) {
      angle = 90
    } else if ( from.y < to.y ) {
      angle = -90
    } else {
      cc.log("x==x y==y")
      return;
    }
  } else if ( from.y == to.y ) {
      if ( from.x > to.x ) {
        angle = 180
      } else if ( from.x < to.x ) {
        angle = 0
      }
  } else {
    angle = radianToAngle(Math.atan((to.y-from.y)/(to.x-from.x)));
  }
  var arrow = cc.instantiate(Global.currentRoom.arrowPrefab)
  arrow.x = from.x;
  arrow.y = from.y;
  arrow.rotation = -angle;
  Global.currentRoom.node.addChild(arrow)
  arrow.runAction(cc.sequence(
    cc.moveTo(Global.ENEMY_ATTACK_TIME/2, to.x, to.y ),
    cc.removeSelf()
  ))
}

var projectFireball = function( from, to ) {
  var angle = 0;
  if ( from.x == to.x ) {
    if ( from.y > to.y ) {
      angle = 90
    } else if ( from.y < to.y ) {
      angle = -90
    } else {
      cc.log("x==x y==y")
      return;
    }
  } else if ( from.y == to.y ) {
      if ( from.x > to.x ) {
        angle = 180
      } else if ( from.x < to.x ) {
        angle = 0
      }
  } else {
    angle = radianToAngle(Math.atan((to.y-from.y)/(to.x-from.x)));
  }
  var projectile = cc.instantiate(Global.currentRoom.fireballPrefab)
  projectile.x = from.x;
  projectile.y = from.y;
  projectile.rotation = angle;
  Global.currentRoom.node.addChild(projectile)
  projectile.runAction(cc.sequence(
    cc.moveTo(Global.ENEMY_ATTACK_TIME/2, to.x, to.y ),
    cc.removeSelf()
  ))
}

var projectStone = function( from, to ) {
  var stone = cc.instantiate(Global.currentRoom.stonePrefab)
  stone.x = from.x;
  stone.y = from.y;
  Global.currentRoom.node.addChild(stone)
  stone.rotation = Math.random()*360;
  stone.runAction(cc.sequence(
    cc.spawn(
      cc.moveTo(Global.ENEMY_ATTACK_TIME/2, to.x, to.y ),
      cc.rotateBy(Global.ENEMY_ATTACK_TIME/2, 360),
    ),
    cc.removeSelf()
  ))
}

var gainStarInRoom = function(fromPosition, callback, context) {
  var star = cc.instantiate(Global.currentRoom.starPrefab);
  let worldPos = Global.currentRoom.node.convertToWorldSpaceAR(
    {
      x: fromPosition.x,
      y: fromPosition.y
    }
  );
  let viewPos = Global.currentRoomScene.node.convertToNodeSpaceAR(worldPos);
  star.position = viewPos;
  star.setScale(2)
  Global.currentRoomScene.node.addChild(star);

  let destPos = Global.currentRoomScene.moneyLabel.node.position;
  star.runAction(cc.sequence(
    cc.moveTo(Global.GET_STAR_TIME, destPos.x, destPos.y).easing(cc.easeQuadraticActionIn()),
    cc.callFunc(function(){
      Global.currentRoomScene.gainStar(1)
      Global.currentRoomScene.moneyLabel.node.stopAllActions();
      Global.currentRoomScene.moneyLabel.node.runAction(cc.sequence(
        cc.scaleTo(Global.GET_STAR_TIME/2,1.3),
        cc.scaleTo(Global.GET_STAR_TIME/2,1)
      ))
    },this),
    cc.removeSelf()
  ))
}

var useStarInRoom = function(toPosition, toParentNode, amount){
  var starCount = Math.min(amount, 5);
  for ( var i = 0; i < starCount; i++ ) {
    var star = cc.instantiate(Global.currentRoom.starPrefab);
    let fromPos = Global.currentRoomScene.moneyLabel.node.position;

    star.position = fromPos;
    star.setScale(2)

    let worldPos = toParentNode.convertToWorldSpaceAR(
      {
        x: toPosition.x,
        y: toPosition.y
      }
    );
    let toPos = Global.currentRoomScene.node.convertToNodeSpaceAR(worldPos);

    Global.currentRoomScene.node.addChild(star);

    Global.currentRoomScene.moneyLabel.node.stopAllActions();
    Global.currentRoomScene.moneyLabel.node.runAction(cc.sequence(
      cc.scaleTo(Global.GET_STAR_TIME/2,0.8),
      cc.scaleTo(Global.GET_STAR_TIME/2,1)
    ))

    star.runAction(cc.sequence(
      cc.delayTime(0.1*i),
      cc.moveTo(Global.GET_STAR_TIME, toPos.x, toPos.y).easing(cc.easeQuadraticActionIn()),
      cc.removeSelf()
    ))
  }
}

var gainStarInMenu = function(fromPosition, parentNode, amount, callback, context){
  var starCount = Math.min(amount, 5)
  var amountLeft = amount;
  for ( var i = 0; i < starCount; i++ ){
    var step = Math.round(amountLeft/(starCount-i));
    amountLeft -= step;

    var star = cc.instantiate(Global.MenuScene.starPrefab);
    let worldPos = parentNode.convertToWorldSpaceAR(
      {
        x: fromPosition.x,
        y: fromPosition.y
      }
    );
    let viewPos = Global.MenuScene.node.convertToNodeSpaceAR(worldPos);
    star.position = viewPos;
    star.setScale(2)
    Global.MenuScene.node.addChild(star);

    let destPos = Global.MenuScene.moneyLabel.node.position;
    star.runAction(cc.sequence(
      cc.delayTime(0.1*i),
      cc.moveTo(Global.GET_STAR_TIME, destPos.x, destPos.y).easing(cc.easeQuadraticActionIn()),
      cc.callFunc(function(){
        Global.MenuScene.star += step
        Global.MenuScene.moneyLabel.node.stopAllActions();
        Global.MenuScene.moneyLabel.node.runAction(cc.sequence(
          cc.scaleTo(Global.GET_STAR_TIME/2,1.3),
          cc.scaleTo(Global.GET_STAR_TIME/2,1)
        ))
      },this),
      i==(starCount-1)?cc.callFunc(
        callback,
        context
      ): cc.delayTime(0.01),
      cc.removeSelf()
    ))
  }
}

var useStarInMenu = function(toPosition, parentNode, amount, callback, context){
  var starCount = Math.min(amount, 5);
  var amountLeft = amount;
  for ( var i = 0; i < starCount; i++ ) {
    var step = Math.round(amountLeft/(starCount-i));
    amountLeft -= step;

    var star = cc.instantiate(Global.MenuScene.starPrefab);
    let fromPos = Global.MenuScene.moneyLabel.node.position;

    star.position = fromPos;
    star.setScale(2)

    let worldPos = parentNode.convertToWorldSpaceAR(
      {
        x: toPosition.x,
        y: toPosition.y
      }
    );
    let toPos = Global.MenuScene.node.convertToNodeSpaceAR(worldPos);

    Global.MenuScene.node.addChild(star);

    Global.MenuScene.moneyLabel.node.stopAllActions();
    Global.MenuScene.moneyLabel.node.runAction(cc.sequence(
      cc.scaleTo(Global.GET_STAR_TIME/2,0.8),
      cc.scaleTo(Global.GET_STAR_TIME/2,1)
    ))

    star.runAction(cc.sequence(
      cc.delayTime(0.1*i),
      cc.callFunc(function(){
        Global.MenuScene.star -= step
        Global.MenuScene.moneyLabel.node.stopAllActions();
        Global.MenuScene.moneyLabel.node.runAction(cc.sequence(
          cc.scaleTo(Global.GET_STAR_TIME/2,0.8),
          cc.scaleTo(Global.GET_STAR_TIME/2,1)
        ))
      },this),
      cc.moveTo(Global.GET_STAR_TIME, toPos.x, toPos.y).easing(cc.easeQuadraticActionIn()),
      i==(starCount-1)?cc.callFunc(
        callback,
        context
      ): cc.delayTime(0.01),
      cc.removeSelf()
    ))
  }
}

export default {
  labelEffect,
  projectArrow,
  projectStone,
  projectFireball,
  gainStarInRoom,
  useStarInRoom,
  gainStarInMenu,
  useStarInMenu,
}
