module.exports = {
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
    seen:{slime:1},
    seenItem: {iceWall:1}
  },
  userInfo: null,
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
      seen:{slime:1},
      seenItem: {iceWall:1}
    }
    this.progress.maxSkill = this.progress.maxSkill || {}
    this.progress.maxPerk = this.progress.maxPerk || {}
    this.progress.seen = this.progress.seen || {slime:1};
    this.progress.seenItem = this.progress.seenItem || {iceWall:1}
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
    this.unlocked = v ? JSON.parse(v) : {
      "normal":1 //warrior
    };
  },
  loadStatistics(){
    var v = cc.sys.localStorage.getItem('statistics')
    try {
      this.statistics = v ? JSON.parse(v) : {
        gameTime: 0
      }
    } catch (e) {
      this.statistics = {
        gameTime: 0
      }
    }
    this.statistics.kill = this.statistics.kill || {}
    this.statistics.gameOver = this.statistics.gameOver || {}
    this.statistics.lastGame = this.statistics.lastGame || {}
    this.statistics.info = this.statistics.info || {}
  },
  recordKill(enemyType, enemyLevel, turn){
    if ( this.currentTurn !== turn ) {
      this.currentTurn = turn;
      this.killInOneTurn = 1;
      if ( !this.statistics.kill.oneTurn )
        this.statistics.kill.oneTurn = 1;
    } else {
      this.killInOneTurn++;
      if ( this.killInOneTurn > this.statistics.kill.oneTurn )
        this.statistics.kill.oneTurn = this.killInOneTurn;
    }
    this.statistics.kill[enemyType+"Count"] = this.statistics.kill[enemyType+"Count"] || 0;
    this.statistics.kill[enemyType+"Count"]++;
    this.statistics.kill[enemyType+"Level"] = this.statistics.kill[enemyType+"Level"] || enemyLevel;
    if ( enemyLevel > this.statistics.kill[enemyType+"Level"] )
      this.statistics.kill[enemyType+"Level"] = enemyLevel;
  },
  recordInfo(info){
    this.statistics.info[info] = this.statistics.info[info] || 0;
    this.statistics.info[info]++;
  },
  recordGameOver(reason, room, hero){
    this.statistics.gameTime ++;
    this.statistics.gameOver.turn = this.statistics.gameOver.turn || 0;
    this.statistics.gameOver.turn = Math.max(
      room.turn, this.statistics.gameOver.turn);
    this.statistics.gameOver[hero.subtype+"Turn"] = this.statistics.gameOver[hero.subtype+"Turn"] || 0;
    this.statistics.gameOver[hero.subtype+"Turn"] = Math.max(
      room.turn, this.statistics.gameOver[hero.subtype+"Turn"]);
    this.statistics.gameOver[reason.type] = this.statistics.gameOver[reason.type] || 0;
    this.statistics.gameOver[reason.type]++;
    this.statistics.gameOver.damage = this.statistics.gameOver.damage || 0;
    this.statistics.gameOver.damage = Math.max(
      reason.damage, this.statistics.gameOver.damage);

    this.saveStatistics();
  },
  recordLastGame(room, hero, perks) {
    this.statistics.lastGame.turn = room.turn;
    this.statistics.lastGame.level = hero.level;
    this.statistics.lastGame.type = hero.subtype;
    this.statistics.lastGame.perks = perks;

    this.saveStatistics();
  },
  recordDamage(hero){
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
  takeReward(name){
    this.rewardTaken[name] = 1;
    cc.sys.localStorage.setItem("rewardTaken",JSON.stringify(this.rewardTaken))
  },
  clearData(item){
    cc.sys.localStorage.removeItem(item)
  },
  loadUserInfo(){
    var v = cc.sys.localStorage.getItem('userInfo');
    this.userInfo = v ? JSON.parse(v) : null;
  },
  saveUserInfo(userInfo){
    if ( userInfo ) {
      this.userInfo = userInfo;
    }
    cc.sys.localStorage.setItem("userInfo",JSON.stringify(this.userInfo))
  }
}
