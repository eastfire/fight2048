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

var traverseMap = function(map, width, height, direction, callback){
    var t = __getTraverse(direction, width, height);
    var x = t.start.x;
    var y = t.start.y;
    while ( true ) {
        var iterator = map[x][y]
        if ( iterator ) {
            callback(iterator, x, y);
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

var contains = function(array1, item) {
  for ( var i = 0; i < array1.length; i++ ) {
    if ( item == array1[i] ) return true;
  }
  return false;
}

var random = function(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

var sample = function(array, n) {
  if (n == null) {
    return array[random(array.length - 1)];
  }
  var sample = array.slice();
  var length = sample.length;
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;
  for (var index = 0; index < n; index++) {
    var rand = random(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }
  return sample.slice(0, n);
};

var min = function(array, callback, context) {
  var value = null;
  var valueItem = null;
  array.forEach((item)=>{
    var result = callback.call(context, item);
    if ( value === null || value > result ) {
      value = result;
      valueItem = item;
    }
  })
  return valueItem;
}

var max = function(array, callback, context) {
  var value = null;
  var valueItem = null;
  array.forEach((item)=>{
    var result = callback.call(context, item);
    if ( value === null || value < result ) {
      value = result;
      valueItem = item;
    }
  })
  return valueItem;
}

var any = function(array, callback, context) {
  for ( var i = 0; i < array.length; i++ ) {
    if ( callback.call(context, array[i]) ) return true;
  }
  return false;
}

var all = function(array, callback, context) {
  for ( var i = 0; i < array.length; i++ ) {
    if ( !callback.call(context, array[i]) ) return false;
  }
  return true;
}

var getPointDistance = function(p1,p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}



var ATTACK_TYPE_MELEE = 1;
var ATTACK_TYPE_RANGE = 2;
var ATTACK_TYPE_SKILL = 3;

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
  contains,
  random,
  sample,
  max,
  min,
  any,
  all,
  getPointDistance,

  ATTACK_TYPE_MELEE,
  ATTACK_TYPE_RANGE,
  ATTACK_TYPE_SKILL,

  SHIFT_RESULT_NORMAL: 1,
  SHIFT_RESULT_MERGE_AND_DISAPPEAR: 2,
  SHIFT_RESULT_MERGE_AND_STAY: 3,
}
