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
    levelUpDialog:{
      type: cc.Prefab,
      default: null
    },
    maxHp: {
      get(){
        return Global.BASE_HP+this.level*Global.HP_INFLATION_RATE;
      },
    },
    hp: {
      default: Global.HP_INFLATION_RATE,
      notify(oldValue) {
          //减少无效赋值
        if (oldValue === this.hp) {
          return;
        }
        if ( Global.currentRoomScene ) {
          Global.currentRoomScene.lifeLabel.string = this.hp+"/"+this.maxHp;
        }
      }
    },
    exp: {
      default: 0,
      notify(oldValue) {
          //减少无效赋值
        if (oldValue === this.exp) {
          return;
        }
        if ( Global.currentRoomScene ) {
          Global.currentRoomScene.expLabel.string = this.exp+"/"+this.maxExp;
        }
      }
    },
    extraExp: 0,
    level: {
      override: true,
      default: 1,
      visible: false,
      notify(oldValue){
          //减少无效赋值
        if (oldValue === this.exp) {
          return;
        }
        //升级
        this.exp = 0;
        this.gainHp(this.maxHp-this.hp)
        if ( Global.currentRoomScene ) {
          Global.currentRoomScene.levelLabel.string = this.level;
        }
        if (Global.currentRoomScene) {
          Global.currentRoomScene.lifeLabel.string = this.hp+"/"+this.maxHp;
        }
        if (Global.currentRoomScene) {
          Global.currentRoomScene.expLabel.string = this.exp+"/"+this.maxExp;
        }
      }
    },
    maxExp: {
      get() {
        var lv = this.level;
        return Math.round((Math.log10(lv) * lv * 16.61 + 10) * (1 - (Global.CUNNING_EFFECT / 100) * this.cunning) * Global.EXP_INFLATION_RATE);
      }
    },
    extraExp: 0,

    dodge: 0,
    cunning: 0,
    choiceNumber:{
      get(){
        return Global.ORIGIN_CHOICE_NUMBER
      }
    },

    //status
    dizzy: 0,
    luck: 0,
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.isAllFaceSame = false;
    this.type = "hero";
    this.subtype = "normal";
    this.isMergeToSelfType = false;
    this.forwardAfterKill = false;
    this.accept = ["item"]
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
    } else {
      cc.log("PHASE:heroAttack skipped")
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
      enemy.beHit(this, this.positions[0]);
      return true;
    } else {
      //miss
      this.miss(enemy);
      enemy.dodgeAttack(this, this.positions[0]);
      return false;
    }
  },
  hit(enemy){
    this.beforeHit(enemy);
    if ( this.forwardAfterKill ) {
      var p = Global.currentRoom.getDrawPosition(Common.getIncrementPosition(this.positions[0], this.face));
      this.node.runAction(cc.sequence(
        cc.moveTo(Global.HERO_ATTACK_TIME/2+0.1, p.x, p.y ), //留时间给enemy做特效
        cc.callFunc(function(){
            this.afterHit(enemy);
        },this)
      ))
    } else {
      var p = Global.currentRoom.getDrawPosition(this.positions[0])
      this.node.runAction(cc.sequence(
        cc.moveTo(Global.HERO_ATTACK_TIME/2+0.1, p.x, p.y ), //留时间给enemy做特效
        cc.callFunc(function(){
            this.afterHit(enemy);
        },this)
      ))
    }
  },
  beforeHit(enemy){

  },
  afterHit(enemy){
    Global.currentRoom.node.emit("hero-attack-complete",this)
  },
  miss(enemy){
    var p = Global.currentRoom.getDrawPosition(this.positions[0])
    this.node.runAction(cc.sequence(
      cc.moveTo(Global.HERO_ATTACK_TIME/2+0.1, p.x, p.y ), //留时间给enemy做特效
      cc.callFunc(function(){
        Global.currentRoom.node.emit("hero-attack-complete",this)
      },this)
    ))
  },
  gainExp(exp){
    cc.log("gain exp:"+exp)
    if ( exp+this.exp <= this.maxExp ) {
      this.exp += exp;
    } else {
      this.extraExp = exp - ( this.maxExp - this.exp );
      this.exp = this.maxExp;
    }
  },
  gainHp(hp){
    var amount = Math.min(this.maxHp, this.hp+hp) - this.hp;
    if ( this.getStatus("cursed") ) {
      amount = Math.round(amount/2)
      this.lostStatus("cursed");
    }
    this.hp += amount;
    this.lostStatus("poison");
  },
  checkLevelUp(){
    if ( this.exp >= this.maxExp ) {
      this.exp = 0;
      this.level++;
      //show Level Up dialog
      var dialog = cc.instantiate(this.levelUpDialog);
      dialog.getComponent("levelUpDialog").initChoicePool(Global.currentChoicePool, this.choiceNumber,function(){
        this.afterLevelupDialog();
      },this)
      Global.currentRoomScene.node.addChild(dialog)
      return true;
    }
    return false;
  },
  afterLevelupDialog(){
    this.gainExp(this.extraExp);
    if ( this.checkLevelUp() ) {

    } else {
      if ( Global.currentRoom._phase == "heroAttack") {
        Global.currentRoom.node.emit("enemy-attack-start")
      } else { //另一种phase是waitUserInput
        Global.currentRoom.setAcceptInput(true);
      }
    }
  },
  afterUseSkill(){
    if ( this.checkLevelUp() ) {

    } else {
      Global.currentRoom.setAcceptInput(true);
    }
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
    return attackPoint;
  },
  afterBeHit(enemy, attackPoint){ //called by view
    this.afterBeAttacked(enemy)
  },
  blocked(attackPoint){
    //TODO block effect
  },
  beforeDodgeAttack(enemy){
  },
  dodgeAttack(enemy){
    this.beforeDodgeAttack(enemy);
    //TODO dodge effect

  },
  afterDodgeAttack(enemy){
    this.afterBeAttacked(enemy);
  },
  beforeTakeDamage(enemy, damage){
  },
  takeDamage(enemy, damage){
      this.beforeTakeDamage(enemy, damage)
      //TODO damage effect
      this.loseHp(damage, "damage");
  },
  loseHp(damage, reason){
    //TODO effect
    this.hp = Math.max(0, this.hp - damage)
  },
  afterTakeDamage(enemy, damage){
  },
  afterBeMerged(movable){
    //hero不要在合并后升级，所以重载movable的afterBeMerged
  },
  showDescDialog(){

  },
    // update (dt) {},
});
