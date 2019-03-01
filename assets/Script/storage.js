export default {
  star:0,
  game:{},
  meta:{},
  statistics:{},
  unlocked: {},
  rewardTaken: {},
  achievement: {},
  progress: {
    maxSkill:{},
    maxPerk:{},
  },
  loadMoney() {
    this.star = parseInt(cc.sys.localStorage.getItem('star') || 0 );
  },
  saveMoney(amount) {
    this.star = amount;
    cc.sys.localStorage.setItem("star",amount)
  },
  loadGame(){
    var v = cc.sys.localStorage.getItem('game');
    this.game = v ? JSON.parse(v) : {};
  },
  saveGame(){
    cc.sys.localStorage.setItem("statistics",JSON.stringify(this.game))
  },
  loadProgress(){
    var v = cc.sys.localStorage.getItem('progress')
    this.progress = v ? JSON.parse(v) : {
      maxSkill:{},
      maxPerk:{},
    }
  },
  loadRewardTaken(){
    var v = cc.sys.localStorage.getItem('rewardTaken');
    this.rewardTaken = v ? JSON.parse(v) : {};
  },
  loadAchievement(){
    var v = cc.sys.localStorage.getItem('achievement');
    this.achievement = v ? JSON.parse(v) : {};
  },
  loadUnlock(){
    var v = cc.sys.localStorage.getItem('unlocked')
    this.unlocked = v ? JSON.parse(v) : {};
  },
  loadStatistics(){
    var v = cc.sys.localStorage.getItem('statistics')
    this.statistics = v ? JSON.parse(v) : {
      gameTime: 0
    };
  },
  saveStatistics(){
    cc.sys.localStorage.setItem("statistics",JSON.stringify(this.statistics))
  },
  saveProgress(){
    cc.sys.localStorage.setItem("progress",JSON.stringify(this.progress))
  },
  unlock(unlockName){
    this.unlocked[unlockName] = 1;
    cc.sys.localStorage.setItem("unlocked",JSON.stringify(this.unlocked))
  },
  clearData(item){
    cc.sys.localStorage.removeItem(item)
  }
}
