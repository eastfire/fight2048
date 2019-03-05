cc.Class({
  extends: cc.Component,

  properties: {
    duration:{
      default:1,
      visible:false
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },
  setExtra(extra){
    this.extra = extra;
  },
  onTurnEnd(movable){ //can be tile
    if ( this.duration !== -1 ) { //如果不是永久有效
      this.duration = Math.max(0,this.duration-1)
      if ( this.duration == 0 ) {
        movable.lostStatus(this.statusName)
      }
    }
  },
  addDuration(duration){
    this.duration+=duration;
  }
  // update (dt) {},
});
