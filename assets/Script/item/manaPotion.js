const Item = require("item");
const Global = require("global")

cc.Class({
    extends: Item,

    properties: {
      title: {
        get(){
          return "魔法药";
        },
        override: true,
      },
      desc: {
        get(){
          return "冷却技能\n等级越高效果越好。";
        },
        override: true,
      },
      score: {
        get(){
          return this.level*Global.SCORE_INFLATION_RATE
        },
        override: true
      },
      effect: {
        get(){
          return this.level
        },
      }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
      this.type="manaPotion"
      this.breakable = true;
    },

   onTaken() {
     Global.currentRoomScene.forEachActiveSkill(function(skill){
       if ( !skill.isPassive )
         skill.getComponent("skill").reduceWait(this.effect)
     },this)
    },
    // update (dt) {},
});
