const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");
const Effect = require("effect");

cc.Class({
    extends: Enemy,

    properties: {
      weakPoint: cc.Sprite,
      hpList: cc.Layout,
      life: {
        default: 0,
        notify(oldValue) {
          if ( oldValue == this.life ) return;
          this.setLife(this.life)
        }
      }
    },

    ctor: function() {
      this.isBoss = true;
      this.relativePositions = [{x:0, y:0},
      {x:1,y:0},
      {x:1,y:1},
      {x:0,y:1}];
    },

    start(){
      this._super();
      this.life = this.hpList.node.children.length;
      this.resetWeakPoint();
      this.setLife(this.life)
    },
    starAnimation(){
      //override animation
    },
    resetWeakPoint(){
      this.weakPointRelativePosition = Common.sample(this.relativePositions);
      this.weakPoint.node.x = Global.TILE_WIDTH*this.weakPointRelativePosition.x
      this.weakPoint.node.y = Global.TILE_HEIGHT*this.weakPointRelativePosition.y
    },
    setLife(life){
      for ( var  i = 0; i < this.hpList.node.children.length; i++ ) {
        var hp = this.hpList.node.children[i]
        if ( i+1 > life ) {
          hp.children[0].active = false;
        } else {
          hp.children[0].active = true;
        }
      }
    },
    willDieAfterBeHit(hero, detail){
      this.life--;
      if ( this.life > 0 ) {
        if ( detail.type == Common.ATTACK_TYPE_MELEE
          && this.checkHitWeakPoint(detail.fromPosition) ) {
            this.gainStatus("stun")
          }
        return false;
      }
      return true;
    },

    checkHitWeakPoint(position){
      var weakPointX = this.weakPointRelativePosition.x + this.positions[0].x
      var weakPointY = this.weakPointRelativePosition.y + this.positions[0].y
      if ( ( position.x == weakPointX && Math.abs(position.y-weakPointY)==1) ||
        ( position.y == weakPointY && Math.abs(position.x-weakPointX)==1) ) {
          this.resetWeakPoint();
          return true;
        }
      return false;
    }
    // update (dt) {},
});
