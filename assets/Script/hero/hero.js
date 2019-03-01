import Movable from "movable";
import Global from "global";
import Common from "common";
import Enemy from "enemy";
import Storage from "storage"

cc.Class({
  extends: Movable,

  properties: {
    levelUpDialog:{
      type: cc.Prefab,
      default: null
    },
    maxHp: {
      get(){
        return Global.BASE_HP+this.level*Global.HP_INFLATION_RATE+
        this.constitution*Global.CONSTITUTION_EFFECT;
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
        if (oldValue === this.level) {
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

    choiceNumber:{
      get(){
        return Global.ORIGIN_CHOICE_NUMBER
      }
    },

    luck: 0,
    constitution: {
      default:0,
      notify(oldValue){
        if (oldValue === this.constitution) return;
        this.gainHp(Global.CONSTITUTION_EFFECT*(this.constitution - oldValue));
      }
    },
    dexterity: 0,
    dodge: 0,
    cunning: 0,

    maxSkill: Storage.progress.maxSkill.normal || 2,
    maxPerk: Storage.progress.maxPerk.normal || 1,
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    cc.log("hero ctor")
    this.isAllFaceSame = false;
    this.type = "hero";
    this.subtype = "normal";
    this.isMergeToSelfType = false;
    this.forwardAfterKill = false;
    this.accept = ["potion","poisonPotion"]
    this.dead = false;
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
  beforeNormalAttack(){
    this.forEachStatus(function(status){
      if (status.beforeNormalAttack)
        status.beforeNormalAttack(this)
    },this)
  },
  normalAttack() {
    this.beforeNormalAttack();
    var enemy = Global.currentRoom.getMovableByPosition(Common.getIncrementPosition(this.positions[0], this.face));
    if ( enemy instanceof Enemy && this.canAttack(enemy)){
        enemy.beforeBeAttacked(this);
        var increment = Common.INCREMENTS[this.face]
        var deltaX = Global.TILE_WIDTH*increment.x/2;
        var deltaY = Global.TILE_HEIGHT*increment.y/2
        //TODO animation
        this.node.runAction(cc.sequence(
            cc.moveBy(Global.HERO_ATTACK_TIME/2, deltaX, deltaY ),
            cc.callFunc(function(){
              this.hitOrMiss(enemy);
            },this)
        ))
    } else {
      cc.log("PHASE:heroAttack skipped")
      Global.currentRoom.node.emit("hero-attack-complete",this)
    }
  },
  canAttack( enemy ){
    return !this.getStatus("stun");
  },
  hitOrMiss(enemy) {
    var attackDetail = {
      fromPosition:this.positions[0],
      type:Common.ATTACK_TYPE_MELEE
    }
    if ( enemy.checkHit(this, attackDetail) ) {
        //hit
      this.hit(enemy);
      enemy.beHit(this, attackDetail);
      return true;
    } else {
      //miss
      this.miss(enemy);
      enemy.dodgeAttack(this, attackDetail);
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

    Common.labelEffect("+"+amount, cc.Color.RED, this.node)

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
    return Math.random()>this.dexterity/100;
  },
  beforeBeHit(enemy, attackDetail){
    return attackDetail;
  },
  beHit(enemy, attackDetail){
    return this.beforeBeHit(enemy, attackDetail);
  },
  afterBeHit(enemy, attackDetail){ //called by view
    this.afterBeAttacked(enemy)
  },
  blocked(attackPoint){
    //TODO block effect
  },
  beforeDodgeAttack(enemy){
  },
  dodgeAttack(enemy){
    this.beforeDodgeAttack(enemy);

    Common.labelEffect("Miss",cc.Color.BLUE,enemy.node)
  },
  afterDodgeAttack(enemy){
    this.afterBeAttacked(enemy);
  },
  beforeTakeDamage(enemy, damage){
  },
  takeDamage(enemy, damage){
      this.beforeTakeDamage(enemy, damage)
      this.loseHp(damage, {type:"enemy", enemy });
  },
  loseHp(damage, reason){
    if (reason.type == "poison") {
      Common.labelEffect("-"+damage, cc.Color.GREEN, this.node)
    } else if (reason.type == "enemy") {
      Common.labelEffect("-"+damage, cc.Color.RED, this.node)
    }

    this.hp = Math.max(0, this.hp - damage)
    if ( !this.dead && this.hp == 0 ) {
      this.dead = true;
      if ( this.checkDead(reason) ) {
        reason.damage = damage;
        Global.currentRoomScene.gameOver(reason);
      }
    }
  },
  checkDead(reason){
    return true;//real dead
  },
  afterTakeDamage(enemy, damage){
  },
  afterBeMerged(movable){
    //hero不要在合并后升级，所以重载movable的afterBeMerged
  },
  showDescDialog(){

  },
//英雄mergeTo道具的逻辑与普通movable不同
  mergeTo(movable){
    movable.node.runAction(cc.sequence(
      cc.fadeOut(Global.STEP_TIME/2-0.01),
      cc.callFunc(function(){
        movable.afterMergeTo(this)
      },this)
    ))
  },
  gainStatus(statusName, amount){
    if ( this.getStatus("prevent") && Common.contains(Global.NEGATIVE_EFFECTS, statusName) ) return;
    this._super(statusName, amount)
  },
  getDisturb(amount){
    if ( this.getStatus("prevent") ) return;
    Global.currentRoomScene.forEachSkill(function(skill){
      skill.disturb(amount)
    })
  }
    // update (dt) {},
});
