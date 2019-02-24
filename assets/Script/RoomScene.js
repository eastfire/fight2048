// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Room = require("Room");
const Skill = require("skill");
const Common = require("common");
const Global = require("global");
const ChoiceList = require("choiceFactory")
import AllSkill from "allSkill"

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
      scoreLabel:{
        default: null,
        type: cc.Label
      },
      turnLabel:{
        default: null,
        type: cc.Label
      },
      moneyLabel:{
        default: null,
        type: cc.Label
      },
      lifeLabel:{
        default: null,
        type: cc.Label
      },
      levelLabel:{
        default: null,
        type: cc.Label
      },
      expLabel:{
        default: null,
        type: cc.Label
      },
      room: {
        default: null,
        type: Room
      },
      skillLayout:{
        default: null,
        type: cc.Layout
      },
      skillPrefab: {
        default: null,
        type: cc.Prefab
      },
      score:{
        default: "",
        notify(oldValue){
          if ( oldValue == this.score ) return;
          this.scoreLabel.string = this.score;
        }
      },
      star: {
        default: 0,
        notify(oldValue){
          if ( oldValue == this.star ) return;
          this.moneyLabel.string = this.star;
        }
      },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      Global.currentRoomScene = this;
      Global.currentRoom = this.room;
      this.skill = [];
      this.maxSkill = 4;

      this.star = 0;
      this.score = 0;

      this.scoreLabel.string = this.score;
      this.moneyLabel.string = this.star;

      this.initEvent();
      this.initChoicePool()
      this.initSkill();
    },

    onDestroy(){
      this.node.off('touchstart');
      this.node.off('touchend');
      cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN);

      Global.currentRoom = null;
      Global.currentRoomScene = null;
    },
    start () {
      this.score = 0; //TODO fetch from save
      this.star = 0;
    },
    gainScore(score) {
      this.score += score;
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
      this.node.on('touchend', ( event ) => {
        if (this.room.isAcceptInput()) {
          var locationInNode = event.getLocation();
          var currentX = locationInNode.x;
          var currentY = locationInNode.y;
          if ( Math.abs(currentX - this.prevX) < SWIPE_THRESHOLD_WIDTH ) {
              if ( currentY > this.prevY + SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_UP)
              } else if ( currentY < this.prevY - SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_DOWN)
              }
          }
          if ( Math.abs(currentY - this.prevY) < SWIPE_THRESHOLD_WIDTH ) {
              if ( currentX > this.prevX + SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_RIGHT)
              } else if ( currentX < this.prevX - SWIPE_THRESHOLD ) {
                  this.room.shift(Common.DIRECTION_LEFT)
              }
          }
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
      Global.currentChoicePool.push(ChoiceList.getScore({number:300}))
      Global.currentChoicePool.push(ChoiceList.getScore({number:200}))
      Global.currentChoicePool.push(ChoiceList.getSkill({name:"healSkill"}))
    },
    initSkill(){
      this.skills={};
    },
    gainSkill(skillName){
      var skill = cc.instantiate(this.skillPrefab)
      skill.addComponent(AllSkill[skillName])
      skill.y = 0;
      skill.x = 0;
      this.skillLayout.node.addChild(skill)
      this.skills[skillName] = skill;
      skill.getComponent("skill").onGain();
    },
    getSkill(skillName){
      return this.skills[skillName];
    }
    // update (dt) {},
});
