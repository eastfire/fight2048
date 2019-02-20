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

      this.hp = 20;
      this.maxHp = 20;
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
          this.node.runAction(cc.sequence(
              cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ),
              cc.callFunc(function(){
                this.hitOrMiss(enemy)
              },this)
          ))
          setTimeout(()=>{
            Global.currentRoom.node.emit("hero-attack-complete",this)
          }, Global.HERO_ATTACK_TIME*1.1*1000)
      } else {
        Global.currentRoom.node.emit("hero-attack-complete",this)
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
        this.node.runAction(cc.sequence(
          cc.moveTo(Global.HERO_ATTACK_TIME/2, p.x, p.y ),
          cc.callFunc(function(){
              this.afterHit(enemy);
          },this)
        ))
      } else {
        var p = Global.currentRoom.getDrawPosition(this.positions[0])
        this.node.runAction(cc.sequence(
          cc.moveTo(Global.HERO_ATTACK_TIME/2, p.x, p.y ),
          cc.callFunc(function(){
              this.afterHit(enemy);
          },this)
        ))
      }
    },
    beforeHit(enemy){

    },
    afterHit(enemy){

    },
    miss(enemy){

    },
    gainExp(exp){

    },
    beforeBeAttacked(enemy){

    },
    checkHit(enemy){
      return true;
    },
    beforeBeHit(enemy, attackPoint){
    },
    beHit(enemy, attackPoint){
      this.beforeBeHit(enemy, attackPoint);
      // this.trigger("beHit",this, enemy);
      return attackPoint;
    },
    afterBeHit(enemy, attackPoint){ //called by view
      this.afterBeAttacked(enemy)
    },
    blocked(attackPoint){
      //TODO
      // this.trigger("blocked")
    },
    beforeDodgeAttack(enemy){
    },
    dodgeAttack(enemy){
      this.beforeDodgeAttack(enemy);
      //TODO
      // this.trigger("dodgeAttack",this, enemy);
    },
    afterDodgeAttack(enemy){
      this.afterBeAttacked(enemy);
    },
    beforeTakeDamage(enemy, damage){
    },
    takeDamage(enemy, damage){
        this.beforeTakeDamage(enemy, damage)
        //TODO
        // this.trigger("takeDamage", this, enemy, damage);
        this.loseHp(damage);
    },
    loseHp(damage){
      cc.log("lose hp " + damage)
      this.hp = Math.max(0, this.hp - damage)
    },
    afterTakeDamage(enemy, damage){
    }
    // update (dt) {},
});
