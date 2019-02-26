import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "萨满";
      },
      override: true,
    },
    desc: {
      get(){
        return "出现或合并时周围敌人狂暴（攻击力加倍）。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){
        return  (this.level*2-1)*Global.EXP_INFLATION_RATE; //一般
      },
      override: true
    },
    attack: {
      get(){
        return this.level*2-1; //一般
      },
      override: true
    },
    score:{
      get(){
        return (this.level+1)*this.level/2*Global.SCORE_INFLATION_RATE
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "shaman"
  },
  generate(){
    this._super();
    setTimeout(()=>{
      var position = this.positions[0];
      Common.INCREMENTS.forEach(function(increment){
          var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
          if ( model && model.getComponent("enemy") ) {
            model.gainStatus("angry", -1);
          }
      },this);
    },Global.GENERATE_TIME)
  },

  afterBeMerged(movable){
    this._super(movable);

    var position = this.positions[0];
    Common.INCREMENTS.forEach(function(increment){
        var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
        if ( model && model.getComponent("enemy") ) {
          model.gainStatus("angry", -1);
        }
    },this);
  },

  // update (dt) {},
});
