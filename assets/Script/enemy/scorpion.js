const Global = require("global");
const Common = require("common");

const Enemy = require("enemy");

cc.Class({
  extends: Enemy,

  properties: {
    title: {
      get(){
        return "蝎子";
      },
      override: true,
    },
    desc: {
      get(){
        return "合并或攻击时有可能使周围角色不能进行普通攻击1回合（等级越高概率越高）。\n攻击力很低。\n经验值一般。";
      },
      override: true,
    },
    exp: {
      get(){ //一般
        var l = this.level + this.star;
        return (Math.round(l*2.5)-1)*Global.EXP_INFLATION_RATE
      },
      override: true
    },
    attack: {
      get(){ //很低
        var l = this.level+this.star
        return 2*Math.round(l/2);
      },
      override: true
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor: function () {
    this.type = "scorpion"
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
    return Math.min(0.25,(this.level+this.star+1)/100);
  },
  checkEffect(model, turn){
    if (model.getComponent("item")) return;
    if (this.getEffectRate(model) > Math.random() ){
      turn += Math.min(2, Math.floor(this.level/18));
      model.gainStatus("stun",turn)
    }
  },
  // update (dt) {},
});
