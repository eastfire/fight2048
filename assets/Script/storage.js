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
    this.game = JSON.parse(cc.sys.localStorage.getItem('game')) || {};
  },
  loadProgress(){
    this.progress = JSON.parse(cc.sys.localStorage.getItem('progress')) || {
      maxSkill:{},
      maxPerk:{},
    }
  },
  loadRewardTaken(){
    this.rewardTaken = JSON.parse(cc.sys.localStorage.getItem('rewardTaken')) || {};
  },
  loadAchievement(){
    this.achievement = JSON.parse(cc.sys.localStorage.getItem('achievement')) || {};
  },
  loadUnlock(){
    this.unlocked = JSON.parse(cc.sys.localStorage.getItem('unlocked')) || {};
  },
  loadStatistics(){
    this.statistics = JSON.parse(cc.sys.localStorage.getItem('statistics')) || {};
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
