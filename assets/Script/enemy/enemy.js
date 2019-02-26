const Movable = require("movable");
const Global = require("global")
const Common = require("common")

cc.Class({
    extends: Movable,

    properties: {
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
      attackType:{
        default:Common.ATTACK_TYPE_MELEE,
        visible:false,
      },
      dexterity: 0,

      immune: [cc.String]
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
      this.attackOver = true;
      this.starList = cc.find("levelIcon/starList",this.node);
      this.starList = this.starList && this.starList.getComponent(cc.Layout);
      this.star = this.starOfLevel(this.level)
      for ( var i = 0; i < this.star; i++){
        var star = cc.instantiate(Global.currentRoom.starPrefab)
        this.starList.node.addChild(star)
      }
    },

    starOfLevel(level){
      return Math.min(Global.MAX_STAR, Math.floor(this.level/Global.STAR_THRESHOLD))
    },
    beforeBeAttacked(hero) {

    },
    checkHit(hero, attackDetail){
      if ( attackDetail.type === Common.ATTACK_TYPE_MELEE )
        return Math.random()>this.dexterity/100;
      else return true;
    },
    dodgeAttack(hero, fromPosition){
      Common.labelEffect("Miss",cc.Color.BLUE,hero.node)
    },
    onLevelUp(levelUp){
      var starNumber = this.starOfLevel(this.level)
      for ( var i = this.star; i < starNumber; i++){
        var star = cc.instantiate(Global.currentRoom.starPrefab)
        this.starList.node.addChild(star)
      }
      this.star = starNumber
      this._super();
    },
    getClosestPoint(p){
      return Common.min(this.positions, function(position){
        return Common.getPointDistance(position, p )
      },this)
    },
    beforeBeHit(hero, detail){
      return detail;
    },
    beHit(hero, detail){
      detail = this.beforeBeHit(hero, detail);
      var fromPosition = detail.fromPosition
      var point = this.getClosestPoint(fromPosition)
      var deltaX = Global.TILE_WIDTH*(Math.max(-1,Math.min(1,fromPosition.x - point.x)) )/4;
      var deltaY = Global.TILE_HEIGHT*(Math.max(-1,Math.min(1,fromPosition.y - point.y)) )/4;
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
      //drop start
      var drawPosition = Global.currentRoom.getDrawPosition(this.positions[0].x, this.positions[0].y)
      var hero = Global.currentRoom.hero.getComponent("hero")
      var heroPosition = Global.currentRoom.getDrawPosition(hero.positions[0].x, hero.positions[0].y)
      for ( var i = 0; i < this.star; i++ ){
        var star = cc.instantiate(Global.currentRoom.starPrefab);
        star.x = Math.random()*Global.TILE_WIDTH + drawPosition.x - Global.TILE_WIDTH/2;
        star.y = Math.random()*Global.TILE_HEIGHT + drawPosition.y - Global.TILE_HEIGHT/2;
        star.setScale(2)
        Global.currentRoom.node.addChild(star);
        star.runAction(cc.sequence(
          cc.moveTo(Global.GET_STAR_TIME, heroPosition.x, heroPosition.y).easing(cc.easeQuadraticActionIn()),
          cc.callFunc(function(){
            Global.currentRoomScene.gainStar(1)
          },this),
          cc.removeSelf()
        ))
      }
    },
    checkDropItem(){
      return Math.random() < this.getDropRate();
    },
    getDropRate(){
      return Math.min(0.5, (this.level + Global.currentRoom.hero.getComponent("hero").luck)) * Global.LUCK_EFFECT
    },
    canAttack(hero){
      //TODO other status effect
      if ( this.checkRange(hero) && !this.getStatus("stun") ) {
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
        if ( this.getStatus("angry") ) {
          attackPoint*=2;
        }
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
      var deltaX = Global.TILE_WIDTH*(heroPosition.x - point.x );
      var deltaY = Global.TILE_HEIGHT*(heroPosition.y - point.y );
      var d = deltaX*deltaX + deltaY*deltaY
      deltaX = deltaX / Math.sqrt(d) * Global.TILE_WIDTH/2;
      deltaY = deltaY / Math.sqrt(d) * Global.TILE_HEIGHT/2;
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
