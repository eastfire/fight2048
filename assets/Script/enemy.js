const Movable = require("movable");
const Global = require("global")
const Common = require("common")

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
        attackRage: {
          get() {
            return 1;
          },
          visible: false
        },
        score: {
          get() {
            return 1;
          },
          visible: false
        },
        exp: {
          get() {
            return 1;
          },
          visible: false
        },
        attack: {
          get() {
            return 1;
          },
          visible: false
        },
      attackOver: true,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.isAllFaceSame = true;
      this.isMergeToSelfType = true;

    },

    onLoad () {
      this._super();
    },

    start () {
      this._super();
    },

    beforeBeAttacked(hero) {

    },
    checkHit(hero){
      return true;
    },
    dodgeAttack(hero){

    },
    getClosestPoint(p){
      return Common.min(this.positions, function(position){
        return Common.getPointDistance(position, p )
      },this)
    },
    beforeBeHit(hero){
    },
    beHit(hero){
      this.beforeBeHit(hero);
      var heroPosition = hero.positions[0]
      var point = this.getClosestPoint(heroPosition)
      var deltaX = Global.TILE_WIDTH*(Math.max(-1,Math.min(1,heroPosition.x - point.x)) )/4;
      var deltaY = Global.TILE_HEIGHT*(Math.max(-1,Math.min(1,heroPosition.y - point.y)) )/4;
      if ( this.willDieAfterBeHit(hero) ) {
        this.node.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ).easing(cc.easeCubicActionOut()),
          cc.callFunc(function(){
            this.afterBeAttacked(hero);
            this.die(hero);
          },this)
        ))
        this.node.runAction( cc.fadeOut(Global.HERO_ATTACK_TIME/2).easing(cc.easeCubicActionIn()) );
      } else {
        this.node.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ).easing(cc.easeCubicActionOut()),
          cc.callFunc(function(){
            this.afterBeAttacked(hero);
          },this),
          cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ).easing(cc.easeCubicActionIn()),
        ))
      }
    },
    willDieAfterBeHit(hero){
      return true;
    },
    afterBeHit(hero){  //called by view
      this.afterBeAttacked(hero);
      this.die(hero)
    },
    afterBeAttacked(hero){
    },
    beforeDie(hero){
        this.__dead = true;
    },
    die(hero){
        this.beforeDie(hero);
        this.afterDie(hero);
    },
    afterDie(hero){ //called by view
        var realExp = this.exp;
        //TODO
        // if ( this.level >= 12 && MORE_EXP_ABOVE12) {
        //     realExp = Math.round(realExp*1.5);
        // } else if ( this.get("level") <= 6 && LESS_EXP_BELOW6) {
        //     realExp = Math.round(realExp*0.5);
        // }
        hero.gainExp(realExp);
        Global.currentRoomScene.gainScore(this.score);

        // currentRoom.logEnemyDie(this);
        var enemyLevel = this.level;
        var dropItem = false;
        var p = null;
        if ( this.__dropItemPredetermined ) {
            if ( this.__willDropItem ) {
                dropItem = true;
                p = this.positions[0];
            }
        } else {
            Common.any(this.positions, function (position) { //generate one item is enough ?
                if (this.checkDropItem()) {
                    dropItem = true;
                    p = position;
                    return true;
                }
            }, this);
        }

        Global.currentRoom.removeMovable(this);
        if ( dropItem ) {
            Global.currentRoom.generateOneItem(p, enemyLevel)
        }
    },
    checkDropItem(){
      return Math.random() < this.getDropRate();
    },
    getDropRate(){
      return Math.min(0.5, (this.level + Global.currentRoom.hero.luck)) * Global.LUCK_EFFECT
    },
    canAttack(hero){
      //TODO other status effect
      if ( this.checkRange(hero) ) {
        return true;
      }
      return false
    },
    checkRange(hero){
      var heroPosition = hero.positions[0];
      var range = this.attackRage;
      return Common.any(this.positions, function(position){
        return Common.getPointDistance(position, heroPosition ) <= range
      },this)
    },
    passAttack(){
    },
    beforeAttack(hero){

    },
    hit(hero){
      return this.attack;
    },
    beforeDamageHero(hero, damage){
    },
    damageHero(hero, damage){
      this.beforeDamageHero(hero);
      return damage;
    },
    beBlocked(hero, attackPoint){

    },
    miss(hero) {

    },
    hitOrMiss(hero){
      if (hero.checkHit(this)) {
        //hit
        var attackPoint = this.hit(hero); //输出
        var damage = hero.beHit(this, attackPoint); //调整
        if ( damage > 0 ) { //能造成伤害
          damage = this.damageHero(hero, damage); //第二次调整
          hero.takeDamage(this, damage); //real damage
        } else {
          //blocked
          this.beBlocked(hero, attackPoint);
          hero.blocked(attackPoint)
        }
        return true;
      } else {
        //miss
        this.miss(hero);
        hero.dodgeAttack(this);
        return false;
      }
    },
    afterAttack(hero){
      this.attackOver = true;
      Global.currentRoom.checkAllEnemyAttacked();
    },
    attackHero(hero){
      this.attackOver = false;
      hero.beforeBeAttacked(this)
      this.beforeAttack(hero);
      var heroPosition = hero.positions[0]
      var point = this.getClosestPoint(heroPosition)
      var deltaX = Global.TILE_WIDTH*(heroPosition.x - point.x )/2;
      var deltaY = Global.TILE_HEIGHT*(heroPosition.y - point.y )/2
      //TODO animation
      this.node.runAction(cc.sequence(
          cc.moveBy(Global.ENEMY_ATTACK_TIME/2, deltaX, deltaY ),
          cc.callFunc(function(){
            this.hitOrMiss(hero)
          },this),
          cc.moveBy(Global.ENEMY_ATTACK_TIME/2, -deltaX, -deltaY ),
          cc.callFunc(function(){
            this.afterAttack(hero)
          },this)
      ))
    },
    // update (dt) {},
});
