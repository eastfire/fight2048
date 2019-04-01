const Tile = require("tile");
const Common = require("common")
const Global = require("global")

cc.Class({
    extends: Tile,

    properties: {
      exit: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function () {
      this.type = "door";
      this._isPassable = false;
      this._isCapture = false;
      this._canGenEnemy = false;
    },
    open(){
      this.subtype = "o"+this.subtype.substr(1,1)
      this.exit.node.active = true;
      this.setFrame();
    },
    close(){
      this.subtype = "c"+this.subtype.substr(1,1)
      this.exit.node.active = false;
      this.setFrame();
    },
    isOpen(){
      return this.subtype.substr(0,1) === "o";
    },
    start () {
      this._super();
      var direction = this.subtype.substr(1,1);
      var mapDirection = {
        s: Common.DIRECTION_DOWN,
        n: Common.DIRECTION_UP,
        w: Common.DIRECTION_LEFT,
        e: Common.DIRECTION_RIGHT
      }
      this.direction = mapDirection[direction]
      this.floorPosition = Common.getDecrementPosition(this.position,this.direction)

      if ( this.isOpen() ) {
        this.exit.node.active = true;
      } else {
        this.exit.node.active = false;
      }

      this.exit.node.rotation = 360/4*this.direction;

      this.exit.node.runAction(cc.repeatForever(
        cc.sequence(
          cc.moveBy(0.5, -Common.DECREMENTS[this.direction].x*10, -Common.DECREMENTS[this.direction].y*50),
          cc.moveBy(0.5, Common.DECREMENTS[this.direction].x*10, Common.DECREMENTS[this.direction].y*50),
        )
      ))
    },

    // update (dt) {},
    onTurnEnd(){
      if ( this.isOpen() ) {
        var position = Global.currentRoom.hero.getComponent("hero").positions[0];
        if ( this.floorPosition.x == position.x && this.floorPosition.y == position.y) {
          Global.exit = true;
          Global.exitDirection = this.direction;
        }
      }
    }
});
