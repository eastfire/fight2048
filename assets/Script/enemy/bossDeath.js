const Global = require("global");
const Boss = require("boss");
const Effect = require("effect");
const Common = require("common")

cc.Class({
    extends: Boss,

    properties: {
      title: {
        get(){
          return "死神";
        },
        override: true,
      },
      desc: {
        get(){
          return "在你脚下生成钉板\n攻击力"+this.attack+"。\n经验值非常高。";
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
          return this.level*400*Global.EXP_INFLATION_RATE
        },
        override: true
      },
      attack: {
        get(){
          return this.level*50;
        },
        override: true
      },
    },

    ctor: function() {
      this.type = "bossDeath"
    },
    generate(){
      this._super();
      this.generateNail();
    },
    onTurnStart(){
      this._super()
      this.generateNail();
    },
    generateNail(){
      var hero = Global.currentRoom.hero.getComponent("hero")
      var tile = Global.currentRoom.getTile(hero.positions[0])
      if ( tile ) {
        tile.gainStatus("nail",5)
      }
    },

    // update (dt) {},
});
