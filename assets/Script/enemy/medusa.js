import Global from "global"
import Common from "common"

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    exp: {
      get(){
        return (Math.round(this.level*2.5)-1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){
        return this.level*2-1;
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

  },

  onLoad () {
    this._super();
  },

  start () {
    this._super();
  },

  afterBeMerged(movable){
    this._super(movable);

        //freeze around
    var position = this.positions[0];
    Common.INCREMENTS.forEach(function(increment){
        var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
        if ( model ) {
          cc.log(model)
          this.checkFreeze(model);
        }
    },this);

  },
  afterAttack(hero){
    this.checkFreeze(hero);
    this._super(hero);
  },
  getFreezeRate(hero){
       // return 1;
    return Math.min(0.7,this.level*5/200+0.1);
  },
  checkFreeze(hero){
    if (this.getFreezeRate(hero) > Math.random() ){
      hero.gainStatus("frozen",2)
    }
  },
  // update (dt) {},
});
