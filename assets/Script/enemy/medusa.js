const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "美杜莎";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并或攻击时有可能冻结周围角色（等级越高概率越高，时间越长）。\n攻击力一般。\n经验值一般。";
      },
      override: true,
    },
    exp: { //一般
      get(){
        var l = this.level + this.star;
        return (Math.round(l*2.5)-1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){ //一般
        return this.level*2-1;
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "medusa"
  },

  afterBeMerged(movable){
    this._super(movable);

        //Effect around
    var position = this.positions[0];
    Common.INCREMENTS.forEach(function(increment){
        var model = Global.currentRoom.getMovableByPosition(position.x+increment.x, position.y+increment.y);
        if ( model ) {
          this.checkEffect(model, 1);
        }
    },this);

  },
  afterAttack(hero){
    this.checkEffect(hero, 2);
    this._super(hero);
  },
  getEffectRate(hero){
       // return 1;
    return Math.min(0.7,this.level*5/200+0.1);
  },
  checkEffect(model, turn){
    if (model.getComponent("item")) return;
    if (this.getEffectRate(model) > Math.random() ){
      turn += Math.min(2, Math.floor(this.level/12));
      model.gainStatus("frozen",turn)
    }
  },
  // update (dt) {},
});
