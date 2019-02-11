var DIRECTION_UP = 0;
var DIRECTION_RIGHT = 1;
var DIRECTION_DOWN = 2;
var DIRECTION_LEFT = 3;
var DIRECTIONS = [DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN,DIRECTION_LEFT  ];
var REVERSE_DIRECTIONS = [DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_RIGHT ];

var INCREMENTS = [{
    x:0,
    y:1
},{
    x:1,
    y:0
},{
    x:0,
    y:-1
},{
    x:-1,
    y:0
}];

var DECREMENTS = [{
    x:0,
    y:-1
},{
    x:-1,
    y:0
},{
    x:0,
    y:1
},{
    x:1,
    y:0
}];

var getIncrementPosition = function(x, y, direction){
    if ( x instanceof  Object ) {
        direction = y;
        y = x.y;
        x = x.x;
    }
    var increment = INCREMENTS[direction]
    return {
        x: x + increment.x,
        y: y + increment.y
    }
}

var getDecrementPosition = function(x, y, direction){
    if ( x instanceof  Object ) {
        direction = y;
        y = x.y;
        x = x.x;
    }
    var increment = DECREMENTS[direction]
    return {
        x: x + increment.x,
        y: y + increment.y
    }
}

var __getTraverse = function(direction, width, height){
    return [
        { //up
            start: {
                x: 0,
                y: 0
            },
            step: function (x, y) {
                x++;
                if (x >= width) {
                    x = 0;
                    y++;
                    if (y >= height) return null;
                }
                return {
                    x: x,
                    y: y
                }
            }
        },
        { //right
            start: {
                x: 0,
                y: 0
            },
            step: function (x, y) {
                y++;
                if (y >= height ) {
                    y = 0;
                    x++;
                    if (x >= width) return null;
                }
                return {
                    x: x,
                    y: y
                }
            }
        },
        { //down
            start: {
                x: 0,
                y: height-1
            },
            step: function (x, y) {
                x++;
                if (x >= width) {
                    x = 0;
                    y--;
                    if (y < 0) return null;
                }
                return {
                    x: x,
                    y: y
                }
            }
        },
        { //left
            start: {
                x: width-1,
                y: 0
            },
            step: function (x, y) {
                y++;
                if (y >= height ) {
                    y = 0;
                    x--;
                    if (x < 0) return null;
                }
                return {
                    x: x,
                    y: y
                }
            }
        }
    ][direction];
}

var traverseMap = function(map, width, height, direction, callback, context){
    var t = __getTraverse(direction, width, height);
    var x = t.start.x;
    var y = t.start.y;
    while ( true ) {
        var iterator = map[x][y]
        if ( iterator ) {
            if ( context ) callback.call(context, iterator, x, y);
            else callback(iterator);
        }
        var after = t.step(x,y)
        if ( !after ) return;
        x = after.x;
        y = after.y;
    }
}

var getPointDistance = function(p1,p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

var ATTACK_TYPE_MELEE = 1;
var ATTACK_TYPE_RANGE = 2;
var ATTACK_TYPE_MAGIC = 3;

export default {
  DIRECTION_UP,
  DIRECTION_RIGHT,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTIONS,
  REVERSE_DIRECTIONS,
  INCREMENTS,
  DECREMENTS,

  getIncrementPosition,
  getDecrementPosition,
  traverseMap,
  getPointDistance,

  ATTACK_TYPE_MELEE,
  ATTACK_TYPE_RANGE,
  ATTACK_TYPE_MAGIC,
}
