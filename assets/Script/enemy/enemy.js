const Movable = require("movable");
const Global = require("global")
const Common = require("common")
const Storage = require("storage")
const Effect = require("effect")

cc.Class({
    extends: Movable,

    properties: {
      attackRage: {
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
      score: {
        get(){
          return (this.level+1)*this.level*Global.SCORE_INFLATION_RATE
        }
      },
      attackType:{
        default:Common.ATTACK_TYPE_MELEE,
        visible:false,
      },
      dexterity: {
        default:0,
        visible:false,
      },

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
      if ( this.starList ) {
        this.starList = this.starList.getComponent(cc.Layout);
        this.star = this.starOfLevel(this.level)
        for ( var i = 0; i < this.star; i++){
          var star = cc.instantiate(Global.currentRoom.starPrefab)
          this.starList.node.addChild(star)
        }
      }

      this.starAnimation();
    },
    starAnimation(){
      this.mainSprite.node.anchorY = 0;
      this.mainSprite.node.y = -Global.TILE_HEIGHT/2+20;
      // this.mainSprite.node.skewX=10;
      this.mainSprite.node.setScale(0.9,1.1)
      var time = 0.4;
      this.mainSprite.node.runAction(cc.repeatForever(
        cc.sequence(
          // cc.spawn(
            // cc.skewTo(TIME,0,0).easing(cc.easeIn(1)),
            cc.scaleTo(time,1.1,0.9).easing(cc.easeIn(1)),
          // ),
          // cc.spawn(
            // cc.skewTo(TIME,0,-10).easing(cc.easeOut(1)),
            cc.scaleTo(time,0.9,1.1).easing(cc.easeOut(1)),
          // ),
          // cc.spawn(
            // cc.skewTo(TIME,0,0).easing(cc.easeIn(1)),
            // cc.scaleTo(TIME,1.1,0.9).easing(cc.easeIn(1)),
          // ),
          // cc.spawn(
            // cc.skewTo(TIME,0,10).easing(cc.easeOut(1)),
            // cc.scaleTo(TIME,0.9,1.1).easing(cc.easeOut(1)),
          // )
        )
      ))
    },
    starOfLevel(level){
      return Math.min(Global.MAX_STAR, Math.floor(this.level/Global.STAR_THRESHOLD))
    },
    beforeBeAttacked(hero) {

    },
    checkHit(hero, attackDetail){
      if ( attackDetail.type === Common.ATTACK_TYPE_MELEE )
        return Math.random()>this.dexterity*Global.ENEMY_DEXTERITY_EFFECT;
      else return true;
    },
    dodgeAttack(hero, fromPosition){
      Effect.labelEffect("Miss",cc.Color.BLUE,hero.node)
    },
    onLevelUp(levelUp){
      if ( this.starList ) {
        var starNumber = this.starOfLevel(this.level)
        for ( var i = this.star; i < starNumber; i++){
          var star = cc.instantiate(Global.currentRoom.starPrefab)
          this.starList.node.addChild(star)
        }
        this.star = starNumber
      }
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
      detail.enemyDie = this.willDieAfterBeHit(hero, detail)
      if ( detail.enemyDie ) {
        detail.dropItemPosition = this.willDropItem();
        this.node.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ).easing(cc.easeCubicActionOut()),
          cc.callFunc(function(){
            this.afterBeAttacked(hero);
            this.die(hero);
          },this)
        ))
        this.node.runAction( cc.fadeOut(Global.HERO_ATTACK_TIME/2).easing(cc.easeCubicActionIn()) );
        return detail;
      } else {
        this.node.runAction(cc.sequence(
          cc.moveBy(Global.HERO_ATTACK_TIME/2, -deltaX, -deltaY ).easing(cc.easeCubicActionOut()),
          cc.callFunc(function(){
            this.afterBeAttacked(hero);
          },this),
          cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ).easing(cc.easeCubicActionIn()),
        ))
        return detail;
      }
    },
    willDieAfterBeHit(hero, detail){
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
    willDropItem() {
      if (this.checkDropItem() || Global.currentRoom.hero.getComponent("hero").getStatus("treasure")) {
        this.dropItemPosition = Common.sample(this.positions);
      } else {
        this.dropItemPosition = null;
      }
      return this.dropItemPosition;
    },
    afterDie(hero){
      var realExp = hero.adjustExp(this.exp, this);
      hero.gainExp(realExp);
      Global.currentRoomScene.gainScore(this.score);

      Storage.recordKill(this.type, this.level, Global.currentRoom.turn);
      var enemyLevel = this.level;

      Global.currentRoom.removeMovable(this);
      if ( this.dropItemPosition ) {
        Global.currentRoom.itemFactory.generateOneRandomItem(this.dropItemPosition, enemyLevel)
      }
      //drop start
      var drawPosition = Global.currentRoom.getDrawPosition(this.positions[0].x, this.positions[0].y)
      var hero = Global.currentRoom.hero.getComponent("hero")
      var heroPosition = Global.currentRoom.getDrawPosition(hero.positions[0].x, hero.positions[0].y)
      for ( var i = 0; i < this.star; i++ ){
        Effect.gainStarInRoom({
          x:Math.random()*Global.TILE_WIDTH + drawPosition.x - Global.TILE_WIDTH/2,
          y:Math.random()*Global.TILE_HEIGHT + drawPosition.y - Global.TILE_HEIGHT/2
        })
      }
    },
    checkDropItem(){
      // cc.log("drop rate"+this.getDropRate());
      return Math.random() < this.getDropRate();
    },
    getDropRate(){
      return Math.min(0.6, (this.level+this.star) * Global.ENEMY_LUCK_EFFECT
        + Global.currentRoom.hero.getComponent("hero").luck * Global.LUCK_EFFECT )
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
    damageHero(hero, attackDetail){
      this.beforeDamageHero(hero);
      attackDetail.damage = attackDetail.originDamage
      return attackDetail;
    },
    beBlocked(hero, attackDetail){

    },
    miss(hero) {

    },
    hitOrMiss(hero){
      if (hero.checkHit(this)) {
        //hit
        var attackDetail = {
          originAttackPoint: this.hit(hero) //怪物输出
        }
        attackDetail.attackPoint = this.getStatus("angry") ?  attackDetail.originAttackPoint*2: attackDetail.originAttackPoint;

        attackDetail = hero.beHit(this, attackDetail); //调整
        if ( attackDetail.originDamage > 0 ) { //能造成伤害
          attackDetail = this.damageHero(hero, attackDetail); //第二次调整
          hero.takeDamage(this, attackDetail); //real damage
        } else {
          //blocked
          this.beBlocked(hero, attackDetail);
          hero.blocked(attackDetail)
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
