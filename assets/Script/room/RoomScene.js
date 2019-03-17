const Room = require("Room");
const Skill = require("skill");
const Common = require("common");
const Global = require("global");
const ChoiceFactory = require("choiceFactory")
import Storage from "storage"

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_DIRECTION = {}
KEY_DIRECTION[KEY_UP] = 0;
KEY_DIRECTION[KEY_RIGHT] = 1;
KEY_DIRECTION[KEY_DOWN] = 2;
KEY_DIRECTION[KEY_LEFT] = 3;

const SWIPE_THRESHOLD_WIDTH = 20;
const SWIPE_THRESHOLD = 50;

cc.Class({
    extends: cc.Component,

    properties: {
      scoreLabel: cc.Label,
      turnLabel: cc.Label,
      moneyLabel: cc.Label,
      lifeLabel: cc.Label,
      levelLabel: cc.Label,
      expLabel: cc.Label,
      room: Room,
      skillLayout: cc.Layout,
      skillSlotFrame:  cc.SpriteFrame,
      skillSlotLayout: cc.Layout,
      skillPrefab: cc.Prefab,
      effectLayer: cc.Node,
      dyingIndicator: cc.Sprite,
      exitButton: cc.Button,

      score:{
        default: "",
        notify(oldValue){
          if ( oldValue == this.score ) return;
          this.scoreLabel.string = this.score;
        },
        visible: false
      },
      star: {
        default: 0,
        notify(oldValue){
          if ( oldValue == this.star ) return;
          Storage.saveMoney(this.star)
          this.moneyLabel.string = this.star;
        },
        visible: false
      },
      descDialog: cc.Prefab,
      gameOverDialog: cc.Prefab,
      dieDialog: cc.Prefab,
      shiftArrowSprite: cc.Sprite,
      exitDialog: cc.Prefab,
      loading: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      Global.currentRoomScene = this;
      Global.currentRoom = this.room;
      Global.loading = this.loading;
      this.skill = [];

      this.initEvent();
      this.initChoicePool()
      this.initSkill();
    },

    onDestroy(){
      this.node.off('touchstart');
      this.node.off('touchmove');
      this.node.off('touchend');
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);

      Global.currentRoom = null;
      Global.currentRoomScene = null;
    },
    start () {
      this.score = 0; //TODO fetch from save
      this.star = Storage.star;
    },
    gainScore(score) {
      this.score = Math.round(this.score+score);
    },
    gainStar(star){
      this.star += star;
    },
    initEvent() {
      this.node.on('touchstart', ( event ) => {
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          if (this.room.node.getBoundingBoxToWorld().contains(locationInNode)) {
              this.prevX = locationInNode.x;
              this.prevY = locationInNode.y;
              return true;
          }
        }
      });
      this.node.on('touchmove', ( event) => {
        if (!this.room.isAcceptInput()) return;
        var locationInNode = event.getLocation();
        if (!this.room.node.getBoundingBoxToWorld().contains(locationInNode))
          return;
        var currentX = locationInNode.x;
        var currentY = locationInNode.y;
        if ( this.prevX === null ) {
          this.prevX = locationInNode.x;
          this.prevY = locationInNode.y;
          return;
        }

        var deltaX = currentX - this.prevX;
        var deltaY = currentY - this.prevY;
        var isDizzy = Global.currentRoom.hero.getComponent("hero").getStatus("dizzy");
        if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation=isDizzy? 180:0;
        } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy? 0:180;
        } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy?270:90;
        } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
          this.shiftArrowSprite.node.opacity = 100;
          this.shiftArrowSprite.node.rotation = isDizzy?90:270;
        } else {
          this.shiftArrowSprite.node.opacity = 0;
        }
      })
      this.node.on('touchend', ( event ) => {
        this.shiftArrowSprite.node.opacity = 0;
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          if (!this.room.node.getBoundingBoxToWorld().contains(locationInNode))
            return;
          var currentX = locationInNode.x;
          var currentY = locationInNode.y;

          var deltaX = currentX - this.prevX;
          var deltaY = currentY - this.prevY;
          var shiftHappend = false;
          if ( deltaY > SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
            this.room.shift(Common.DIRECTION_UP)
          } else if ( deltaY < - SWIPE_THRESHOLD && Math.abs(deltaX) < Math.abs(deltaY) ) {
            this.room.shift(Common.DIRECTION_DOWN)
          } else if ( deltaX > SWIPE_THRESHOLD && Math.abs(deltaY) <  Math.abs(deltaX) ) {
            this.room.shift(Common.DIRECTION_RIGHT)
          } else if ( deltaX < - SWIPE_THRESHOLD && Math.abs(deltaY) < Math.abs(deltaX) ) {
            this.room.shift(Common.DIRECTION_LEFT)
          } else {
            this.room.click(currentX, currentY)
          }
          this.prevX = this.prevY = null;
        }
      });
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ( event ) => {
        if (this.room.isAcceptInput()) {
          var key = event.keyCode;
          if ( KEY_DIRECTION[key] !== undefined ) {
              this.room.shift(KEY_DIRECTION[key])
          }
        }
      });
      this.room.node.on("PHASE:turnStart",()=>{
        for ( var i in this.skills ) {
          this.skills[i].getComponent("skill").onTurnStart()
        }
      })
    },

    initRules() {

    },
    initChoicePool(){
      Global.currentChoicePool = [];
      Global.currentChoicePool.push(ChoiceFactory.getScore({number:500}))

      Global.basicSkill.forEach(function(choice){
        Global.currentChoicePool.push(ChoiceFactory.getSkill({name:choice, minSkillCount: choice == "coolingSkill"?1:0}))
      },this)
      if ( Global.MANY_SKILL ) {
        ["normal","cleric","wizard","thief"].forEach(function(heroType){
          if ( Storage.unlocked[heroType] ) {
            Global.heroBasicSkill[heroType].forEach(function(choice){
              Global.currentChoicePool.push(ChoiceFactory.getSkill({name:choice, minSkillCount: 0}))
            },this)
            Global.heroUnlockableSkill[heroType].forEach(function(choice){
              if ( Storage.unlocked[choice] ) {
                Global.currentChoicePool.push(ChoiceFactory.getSkill({name:choice, minSkillCount: 0}))
              }
            },this)
          }
        },this)
      } else {
        Global.heroBasicSkill[Global.currentHeroType].forEach(function(choice){
          Global.currentChoicePool.push(ChoiceFactory.getSkill({name:choice, minSkillCount: 0}))
        },this)
        Global.heroUnlockableSkill[Global.currentHeroType].forEach(function(choice){
          if ( Storage.unlocked[choice] ) {
            Global.currentChoicePool.push(ChoiceFactory.getSkill({name:choice, minSkillCount: 0}))
          }
        },this)
      }
    },
    initSkill(){
      this.skills={};
      var maxSkill = Storage.progress.maxSkill[Global.currentHeroType]||2;
      for ( var i =0 ;i < maxSkill; i++ ) {
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        slot.getComponent(cc.Sprite).spriteFrame = this.skillSlotFrame;
        slot.y = 0;
        slot.width = 120;
        slot.height = 140;
        this.skillSlotLayout.node.addChild(slot)
      }
    },
    gainSkill(skillName){
      var skill = cc.instantiate(this.skillPrefab)
      skill.addComponent(skillName)
      skill.y = 0;
      skill.x = 0;
      this.skills[skillName] = skill;
      if ( skill.getComponent("skill").isPassive ) {
        skill.removeComponent(cc.Node)
        skill.removeComponent(cc.Layout)
        skill.getComponent("skill").onGain();
      } else {
        this.skillLayout.node.addChild(skill)
        skill.getComponent("skill").onGain();
        if ( this.room.hero.getComponent("hero").getStatus("forbid") ) {
          setTimeout(function(){
            skill.getComponent("skill").forbid = true
          },1)
        }
      }
    },
    getSkill(skillName){
      return this.skills[skillName];
    },
    activeSkillCount(){
      return this.skillLayout.node.children.length
      /*var count = 0;
      for ( var i in this.skills ) {
        if ( !this.skills[i].getComponent("skill").isPassive )
          count++;
      }
      return count;*/
    },
    forEachSkill(callback, context){
      for ( var i in this.skills ) {
        callback.call(context, this.skills[i].getComponent("skill"))
      }
    },
    forEachActiveSkill(callback, context){
      for ( var i in this.skills ) {
        var skill = this.skills[i].getComponent("skill")
        if ( !skill.isPassive )
          callback.call(context, skill)
      }
    },
    gameOver(reason){
      var dialog = cc.instantiate(this.gameOverDialog)
      dialog.getComponent("gameOverDialog").setReason(reason);
      Global.currentRoomScene.node.addChild(dialog)
    },

    exitGame(){
      //show Level Up dialog
      var dialog = cc.instantiate(this.exitDialog);
      this.node.addChild(dialog)
    },

    dying(isDying){
      if ( isDying ) {
        if ( this.dyingIndicator.node.active ) return;
        this.dyingIndicator.node.active = true;
        this.dyingIndicator.node.stopAllActions();
        this.dyingIndicator.node.opacity = 0;
        this.dyingIndicator.node.runAction(cc.repeatForever(
          cc.sequence(
            cc.fadeTo(1,55).easing(cc.easeIn(1)),
            cc.fadeTo(1,0).easing(cc.easeOut(1))
        )))
      } else {
        if ( !this.dyingIndicator.node.active ) return;
        this.dyingIndicator.node.stopAllActions();
        this.dyingIndicator.node.active = false;
      }
    }
    // update (dt) {},
});
