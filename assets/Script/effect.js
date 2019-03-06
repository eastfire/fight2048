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
    } if ( from.y == to.y ) {
      angle = -90
    } else {
      return;
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
    } if ( from.y == to.y ) {
      angle = -90
    } else {
      return;
    }
  } else {
    angle = radianToAngle(Math.atan((to.y-from.y)/(to.x-from.x)));
  }
  var projectile = cc.instantiate(Global.currentRoom.fireballPrefab)
  projectile.x = from.x;
  projectile.y = from.y;
  projectile.rotation = -angle;
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

export default {
  labelEffect,
  projectArrow,
  projectStone
}
