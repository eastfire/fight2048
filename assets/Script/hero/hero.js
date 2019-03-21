const Movable = require("movable");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");
const Storage = require("storage");
const Effect = require("effect");

cc.Class({
  extends: Movable,

  properties: {
    levelUpDialog: cc.Prefab,
    maxHp: {
      get(){
        return Math.round(Global.BASE_HP+(this.level-1)*Global.HP_PER_LEVEL+
        this.constitution*Global.CONSTITUTION_EFFECT);
      },
    },
    hp: {
      default: 0,
      notify(oldValue) {
          //减少无效赋值
        if (oldValue === this.hp) {
          return;
        }
        if ( Global.currentRoomScene ) {
          Global.currentRoomScene.lifeLabel.string = this.hp+"/"+this.maxHp;
          if ( this.hp <= this.maxHp/5 && this.hp !== 0 ) {
            Global.currentRoomScene.dying(true)
          } else {
            Global.currentRoomScene.dying(false)
          }
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
        return Math.round((Math.log10(lv) * lv * 16.61 + 10) * Global.EXP_INFLATION_RATE);
      }
    },
    extraExp: 0,

    choiceNumber:{
      get(){
        return Global.CHOICE_NUMBER
      }
    },

    luck: 0,
    constitution: {
      default:0,
      notify(oldValue){
        if (oldValue === this.constitution) return;
        this.gainHp(Math.round(Global.CONSTITUTION_EFFECT*(this.constitution - oldValue)));
      }
    },
    dexterity: 0,
    dodge: 0,
    wisdom: 0,
    defend: 0,
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.isAllFaceSame = false;
    this.type = "hero";
    this.subtype = "normal";
    this.isMergeToSelfType = false;
    this.accept = ["potion","poisonPotion","tomb","manaPotion"]
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
    if ( Global.INIT_HP )
      this.hp = Global.INIT_HP
    else this.hp = Global.BASE_HP
    if ( Global.currentRoomScene ) {
      Global.currentRoomScene.lifeLabel.string = this.hp+"/"+this.maxHp;
    }
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
      Global.currentRoom.scheduleOnce(()=> {
        Global.currentRoom.node.emit("hero-attack-complete",this)
      },Global.currentRoom.delayPhaseTime)

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
    if ( enemy.checkHit(this, attackDetail) ) { //是否命中
      this.beforeHit(enemy);
      var hitResult = enemy.beHit(this, attackDetail)
      if ( hitResult.enemyDie ) { //是否死亡
        //前方是否为空
        var newPosition = Common.getIncrementPosition(this.positions[0],this.face);
        var noItemAhead = !hitResult.dropItemPosition || hitResult.dropItemPosition.x !== newPosition.x ||
        hitResult.dropItemPosition.y !== newPosition.y;

        if ( Global.FORWARD_AFTER_KILL && this.isMovable() && noItemAhead ) {
          this.forward(function(){
            this.afterHit(enemy);
          },this);
        } else {
          this.backward(function(){
            this.afterHit(enemy);
          },this);
        }
      } else {
        this.backward(function(){
          this.afterHit(enemy);
        },this);
      }
      return true;
    } else {
      //miss
      this.miss(enemy);
      enemy.dodgeAttack(this, attackDetail);
      return false;
    }
  },
  forward(callback, context){
    var newPosition = Common.getIncrementPosition(this.positions[0], this.face)
    var p = Global.currentRoom.getDrawPosition(newPosition);
    this.node.runAction(cc.sequence(
      cc.moveTo(Global.HERO_ATTACK_TIME/2+0.1, p.x, p.y ), //留时间给enemy做特效
      cc.callFunc(function(){
        this.__removeOldMapping();
        this.setNewPosition(newPosition);
      },this),
      cc.callFunc(callback, context)
    ))
  },
  backward(callback, context){
    var p = Global.currentRoom.getDrawPosition(this.positions[0])
    this.node.runAction(cc.sequence(
      cc.moveTo(Global.HERO_ATTACK_TIME/2+0.1, p.x, p.y ), //留时间给enemy做特效
      cc.callFunc(callback, context)
    ))
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
  adjustExp(exp, enemy){
    var extraAdjust = 0;
    if ( enemy ) {//排除非怪物提供的exp
      if ( Global.LESS_EXP_BELOW_6 && enemy.level <= 6) {
        extraAdjust = -0.4;
      } else if ( Global.MORE_EXP_ABOVE_12 && enemy.level >= 12 ) {
        extraAdjust = Global.MORE_EXP_ABOVE_12*0.1;
      }
    }
    return Math.round((1+this.wisdom*Global.WISDOM_EFFECT+extraAdjust)*exp) + Global.ENEMY_EXP_ADJUST;
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

    Effect.labelEffect("+"+amount, cc.Color.RED, this.node)

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
      } else if ( Global.currentRoom._phase == "turnEnd") {
        Global.currentRoom.afterTurnEnd();
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
    Storage.saveStatistics();
  },
  beforeBeAttacked(enemy){

  },
  checkHit(enemy){
    return Math.random()>this.dexterity*Global.DEXTERITY_EFFECT;
  },
  beforeBeHit(enemy, attackDetail){
    attackDetail.originDamage = Math.max(0, attackDetail.attackPoint - this.defend )
    return attackDetail;
  },
  beHit(enemy, attackDetail){
    return this.beforeBeHit(enemy, attackDetail);
  },
  afterBeHit(enemy, attackDetail){ //called by view
    this.afterBeAttacked(enemy)
  },
  blocked(enemy, attackPoint){
    var p = Effect.getLabelEffectPosition(this.positions[0],enemy.positions[0]);
    Effect.labelEffect("Block", cc.Color.BLUE, this.node, p)
  },
  beforeDodgeAttack(enemy){
  },
  dodgeAttack(enemy){
    this.beforeDodgeAttack(enemy);
    var p = Effect.getLabelEffectPosition(this.positions[0],enemy.positions[0]);
    Effect.labelEffect("Miss", cc.Color.BLUE, this.node, p)
  },
  afterDodgeAttack(enemy){
    this.afterBeAttacked(enemy);
  },
  beforeTakeDamage(enemy, attackDetail){
  },
  takeDamage(enemy, attackDetail){
      this.beforeTakeDamage(enemy, attackDetail)
      this.loseHp(attackDetail.damage, {type:"enemy", enemy });
  },

  loseHp(damage, reason){
    if (reason.type == "enemy") {
      var p = Effect.getLabelEffectPosition(this.positions[0], reason.enemy.positions[0]);
      Effect.labelEffect("-"+damage, cc.Color.RED, this.node, p)
    } else if (reason.type == "poison" ) {
      Effect.labelEffect("-"+damage, cc.Color.GREEN, this.node, {x:0,y:0})
    } else {
      Effect.labelEffect("-"+damage, cc.Color.RED, this.node, {x:0,y:0})
    }

    this.hp = Math.max(0, this.hp - damage)
    if ( !this.dead && this.hp == 0 ) {
      this.dead = true;
      reason.damage = damage;
      this.deadReason = reason;
    }
  },
  checkDead(){
    if ( this.dead ) {//real dead
      var resurrection = this.getStatus("resurrection");
      if ( resurrection ) {
        this.gainHp(Math.round(this.maxHp*resurrection.effect))
        this.dead = false;
        this.deadReason = null;
        return false;
      }
      Global.currentRoomScene.gameOver(this.deadReason);
      return true;
    }
    return false
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
  gainStatus(statusName, amount, extra){
    if ( Common.contains(Global.NEGATIVE_EFFECTS, statusName) ) {
      if ( this.getStatus("prevent") ) return;
      if ( amount !== -1) //非永久
        amount += Global.NEGATIVE_EFFECT_TIME_ADJUST
    }

    this._super(statusName, amount, extra)
  },
  getDisturb(amount){
    if ( this.getStatus("prevent") ) return;
    Global.currentRoomScene.forEachActiveSkill(function(skill){
      skill.disturb(amount)
    })
  },
  onTurnEnd(){
    //achievement "survive1hp"
    if ( this.hp === 1) {
      Storage.recordInfo("survive1hp");
    }
      //achievement "allClear" "allFull"
    var haveEnemy = false;
    var haveEmpty = false;
    Global.currentRoom.foreachTile(function(tile){
      var movable = Global.currentRoom.getMovableByTile(tile);
      if ( movable ) {
        if ( movable.getComponent("enemy") ) {
          haveEnemy = true;
        }
      } else {
        haveEmpty = true;
      }
    },this)
    if (!haveEnemy) {
      Storage.recordInfo("allClear");
    }
    if (!haveEmpty) {
      Storage.recordInfo("allFull");
    }

    this._super();
  }
    // update (dt) {},
});
