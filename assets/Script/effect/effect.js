const Global = require("global");
const Movable = require("movable");

var labelNodePool = new cc.NodePool();
var arrowNodePool = new cc.NodePool();
var stoneNodePool = new cc.NodePool();
var starNodePool = new cc.NodePool();

var getLabelEffectPosition = function(defenderPosition, attackerPosition){
  let r = 50;
  let dx = attackerPosition.x - defenderPosition.x;
  let dy = attackerPosition.y - defenderPosition.y;
  let distance = Math.sqrt(dx*dx+dy*dy)
  return {
    x: r/distance*dx+defenderPosition.x,
    y: r/distance*dy+defenderPosition.y
  }
}

var labelEffect = function(str, color, parent, position) {
  var label = labelNodePool.get();

  if ( !label ) {
    label = new cc.Node();
    label.addComponent(cc.Label)
  }
  label.getComponent(cc.Label).string = str;
  label.opacity = 255;
  position = position || {x:Math.random()*40-20,y:Math.random()*40-20}
  label.x = position.x+parent.x;
  label.y = position.y+parent.y;
  label.color = color;
  Global.currentRoom.node.addChild(label);
  label.runAction(cc.sequence(cc.moveBy(0.4+Math.random()*0.2, 0, 60+Math.random()*20),
    cc.fadeOut(0.2),
    cc.callFunc(function(){
      label.removeFromParent(true);
      labelNodePool.put(label)
    },this)
  ))
}

const PI = 3.1415926;
var radianToAngle = function(radian){
  return radian / Math.PI / 2 * 360;
}

var projectArrow = function( from, to ) {
  var angle = 0;
  if (from.x == to.x ) {
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
  var arrow = arrowNodePool.get();
  if ( !arrow ) {
    arrow = cc.instantiate(Global.currentRoom.arrowPrefab)
  }
  arrow.x = from.x;
  arrow.y = from.y;
  arrow.rotation = -angle;
  Global.currentRoom.node.addChild(arrow)
  arrow.runAction(cc.sequence(
    cc.moveTo(Global.ENEMY_ATTACK_TIME/2, to.x, to.y ),
    cc.callFunc(function(){
      arrow.removeFromParent(true);
      arrowNodePool.put(arrow)
    },this)
  ))
}

var projectFireball = function( from, to, opt ) {
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
  var stone = stoneNodePool.get();
  if ( !stone ) {
    stone = cc.instantiate(Global.currentRoom.stonePrefab)
  }
  stone.x = from.x;
  stone.y = from.y;
  Global.currentRoom.node.addChild(stone)
  stone.rotation = Math.random()*360;
  stone.runAction(cc.sequence(
    cc.spawn(
      cc.moveTo(Global.ENEMY_ATTACK_TIME/2, to.x, to.y ),
      cc.rotateBy(Global.ENEMY_ATTACK_TIME/2, 360),
    ),
    cc.callFunc(function(){
      stone.removeFromParent(true);
      stoneNodePool.put(stone)
    },this)
  ))
}

var gainStarInRoom = function(fromPosition, amount) {
  amount = amount || 1;
  var star = starNodePool.get();
  if ( !star ) {
    star = cc.instantiate(Global.currentRoom.starPrefab);
    star.setScale(2)
  }
  let worldPos = Global.currentRoom.node.convertToWorldSpaceAR(
    {
      x: fromPosition.x,
      y: fromPosition.y
    }
  );
  let viewPos = Global.currentRoomScene.node.convertToNodeSpaceAR(worldPos);
  star.position = viewPos;
  Global.currentRoomScene.node.addChild(star);

  let destPos = Global.currentRoomScene.moneyLabel.node.position;
  star.runAction(cc.sequence(
    cc.moveTo(Global.GET_STAR_TIME, destPos.x, destPos.y).easing(cc.easeQuadraticActionIn()),
    cc.callFunc(function(){
      Global.currentRoomScene.gainStar(amount)
      Global.currentRoomScene.moneyLabel.node.stopAllActions();
      Global.currentRoomScene.moneyLabel.node.runAction(cc.sequence(
        cc.scaleTo(Global.GET_STAR_TIME/2,1.3),
        cc.scaleTo(Global.GET_STAR_TIME/2,1)
      ))
    },this),
    cc.callFunc(function(){
      this.removeFromParent(true);
      starNodePool.put(this)
    },star)
  ))
}

var useStarInRoom = function(toPosition, toParentNode, amount){
  var starCount = Math.min(amount, 5);
  for ( var i = 0; i < starCount; i++ ) {
    var star = starNodePool.get();
    if ( !star ) {
      star = cc.instantiate(Global.currentRoom.starPrefab);
      star.setScale(2)
    }
    let fromPos = Global.currentRoomScene.moneyLabel.node.position;

    star.position = fromPos;

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
      cc.callFunc(function(){
        this.removeFromParent(true);
        starNodePool.put(this)
      },star)
    ))
  }
}

var gainStarInMenu = function(opt){
  var fromPosition = opt.fromPosition;
  var fromParentNode = opt.fromParentNode;
  var toPosition = opt.toPosition;
  var toParentNode = opt.toParentNode;
  var effectParentNode = opt.effectParentNode;
  var amount = opt.amount;
  var beforeStepCallback = opt.beforeStepCallback;
  var stepCallback = opt.stepCallback;
  var callback = opt.callback;
  var context = opt.context;
  var starPrefab = opt.starPrefab

  var starCount = Math.min(amount, 5)
  var amountLeft = amount;
  for ( var i = 0; i < starCount; i++ ){
    var step = Math.round(amountLeft/(starCount-i));
    amountLeft -= step;

    var star = starNodePool.get();
    if ( !star ) {
      star = cc.instantiate(starPrefab);
      star.setScale(2)
    }
    let worldPos = fromParentNode.convertToWorldSpaceAR(fromPosition);
    let viewPos = effectParentNode.convertToNodeSpaceAR(worldPos);
    star.position = viewPos;
    effectParentNode.addChild(star);

    let destPos = effectParentNode.convertToNodeSpaceAR(toParentNode.convertToWorldSpaceAR(toPosition));
    star.runAction(cc.sequence(
      cc.delayTime(0.1*i),
      cc.callFunc(function(){
        if ( beforeStepCallback ) {
          beforeStepCallback.call(context, step);
        }
      }),
      cc.moveTo(Global.GET_STAR_TIME, destPos.x, destPos.y).easing(cc.easeQuadraticActionIn()),
      cc.callFunc(function(){
        if ( stepCallback ) {
          stepCallback.call(context,step)
        }
      }),
      i==(starCount-1)?cc.callFunc(
        callback,
        context
      ): cc.delayTime(0.01),
      cc.callFunc(function(){
        this.removeFromParent(true);
        starNodePool.put(this)
      },star)
    ))
  }
}


const HomingEffect = cc.Class({
  extends: cc.Component,

  homingTo(position, initVelocity){
    this.toPosition = position;
    this.velocity = initVelocity;
    this.maxVelocity = 2400;
    this.maxAcc= 2400;
  },

  update(dt){
    if (!this.toPosition) return;
    let node = this.getComponent(Movable).node;
    let dx = node.x - this.toPosition.x;
    let dy = node.y - this.toPosition.y;
    let distance = Math.sqrt(dx*dx+dy*dy);
    distance = Math.max(10,distance);
    let acc = Math.min(this.maxAcc, 1000000/distance);
    
    let ax = -acc*dx/distance;
    let ay = -acc*dy/distance;
//TODO max speed
    this.velocity.x += ax*dt;
    this.velocity.y += ay*dt;

    this.velocity.x *= 1-5/distance;
    this.velocity.y *= 1-5/distance

    let absV = Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y)
    let realV = Math.min(this.maxVelocity, absV);
    let rate = realV / absV;
    if (realV===this.maxAcc){
      cc.log("maxV")
    }
    node.x += this.velocity.x*dt*rate;
    node.y += this.velocity.y*dt*rate;
    
    if ( Math.abs(node.x - this.toPosition.x) < 15 && Math.abs(node.y-this.toPosition.y)<15){
      this.node.destroy();
    }
  }
})

const gravityTo=function(opt) {
  var cloneFrom = cc.clone(opt.movingNode);
  var fromParentNode = opt.fromParentNode;
  var toPosition = opt.toPosition;
  var toParentNode = opt.toParentNode;
  var effectParentNode = opt.effectParentNode;
  var context = opt.context;

  let worldPos = fromParentNode.convertToWorldSpaceAR(opt.movingNode.position);
  let viewPos = effectParentNode.convertToNodeSpaceAR(worldPos);
  let destPos = effectParentNode.convertToNodeSpaceAR(toParentNode.convertToWorldSpaceAR(toPosition));
  effectParentNode.addChild(cloneFrom)
  cloneFrom.position = viewPos;
}

module.exports = {
  getLabelEffectPosition,
  labelEffect,
  projectArrow,
  projectStone,
  projectFireball,
  gainStarInRoom,
  useStarInRoom,
  gainStarInMenu,
  HomingEffect
}
