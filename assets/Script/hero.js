// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import Movable from "movable";
import Global from "global";
import Common from "common";
import Enemy from "enemy";

cc.Class({
    extends: Movable,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.isAllFaceSame = false;
      this.type = "hero";
      this.subtype = "normal";
      this.isMergeToSelfType = false;
      this.forwardAfterKill = false;
    },

    onLoad () {
      this._super();
      cc.loader.loadRes("Texture/Hero/hero-"+this.subtype,
        cc.SpriteAtlas,
        (err, atlas) => {
          this.atlas = atlas;
          this.setFrame();
        }
      );
    },

    start () {
      this._super();
    },
    beforeNormalAttack(enemy){
    },
    normalAttack() {
      var enemy = Global.currentRoom.getMovableByPosition(Common.getIncrementPosition(this.positions[0], this.face));
      if ( enemy instanceof Enemy && this.canAttack(enemy)){
          this.beforeNormalAttack(enemy);
          enemy.beforeBeAttacked(this);
          var increment = Common.INCREMENTS[this.face]
          var deltaX = Global.TILE_WIDTH*increment.x/2;
          var deltaY = Global.TILE_HEIGHT*increment.y/2
          //TODO animation
          this.runAction(cc.sequence(
              cc.moveBy(Global.HERO_ATTACK_TIME, deltaX, deltaY ),
              cc.callFunc(function(){
                this.hitOrMiss(enemy)
              },this)
          ))
      } else {
          Global.currentRoom.emit("hero-attack-complete",this)
      }
    },
    canAttack( enemy ){
      return true;
    },
    hitOrMiss(enemy) {
      if ( enemy.checkHit(this) ) {
          //hit
        this.hit(enemy);
        enemy.beHit(this);
        return true;
      } else {
        //miss
        this.miss(enemy);
        enemy.dodgeAttack(this);
        return false;
      }
    },
    hit(enemy){
      this.beforeHit(enemy);
      if ( this.forwardAfterKill ) {
        var p = Global.currentRoom.getDrawPosition(Common.getIncrementPosition(this.positions[0], this.face));
        this.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME, p.x, p.y ),
          cc.callFunc(function(){
              this.afterHit(enemy);
          },this)
        ))
      } else {
        var p = Global.currentRoom.getDrawPosition(this.positions[0])
        this.runAction(cc.sequence(
          cc.moveTo(Global.HERO_ATTACK_TIME, p.x, p.y ),
          cc.callFunc(function(){
              this.afterHit(enemyModel);
          },this)
        ))
      }
    },
    beforeHit(enemy){

    },
    afterHit(enemy){

    },
    miss(enemy){

    }
    // update (dt) {},
});
