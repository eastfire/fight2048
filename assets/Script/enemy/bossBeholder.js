import Global from "global"
const Boss = require("boss");
import Effect from "effect"
const Common = require("common")

cc.Class({
    extends: Boss,

    properties: {
      title: {
        get(){
          return "眼魔";
        },
        override: true,
      },
      desc: {
        get(){
          return "每回合使你得到一种异常状态\n攻击力"+this.attack+"。\n经验值非常高。";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*1000*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      exp: {
        get(){
          return this.level*300*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){
          return this.level*15;
        },
        override: true
      },
    },

    ctor: function() {
      this.type = "bossBeholder"
    },
    generate(){
      this._super();
      this.giveNegativeStatus();
    },
    onTurnStart(){
      this._super()
      this.giveNegativeStatus();
    },
    giveNegativeStatus(){
      var hero = Global.currentRoom.hero.getComponent("hero")
      var candidate = [];
      Global.NEGATIVE_EFFECTS.forEach(function(statusName){
        if ( !hero.getStatus(statusName) ) {
          candidate.push(statusName)
        }
      },this)
      if ( candidate.length ) {
        var statusName = Common.sample(candidate)
        var negativeDuration = {
          frozen: Math.floor(Math.random()*2)+1,
          cursed: -1,
          dizzy: Math.floor(Math.random()*2)+2,
          forbid: Math.floor(Math.random()*2)+1,
          poison: -1,
          blind: Math.floor(Math.random()*3)+1,
          stun: 1,
          slowed: Math.floor(Math.random()*3)+1,
        }[statusName]
        hero.gainStatus(statusName, negativeDuration);
      }
    },

    // update (dt) {},
});
