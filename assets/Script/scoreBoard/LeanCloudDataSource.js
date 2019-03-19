const DataSource = require("DataSource");
// const AV = require('leancloud-storage');
const AV = require('leancloud-storage/dist/av-weapp-min.js'); //weixin小游戏

cc.Class({
    extends: DataSource,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor(){
      var APP_ID = 'Eiq6lDsGb7LVEKxRHPCNv1QP-gzGzoHsz';
      var APP_KEY = 'n3idGwvxn640x7suIE6Hrzso';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },

    start () {

    },

    loadScore(opt){
      var query = new AV.Query('ScoreBoard');
      query.descending('score');
      query.limit(opt.limit||20);
      query.find()
      .then(function (list) {
        if ( opt.success ) {
          //处理数据
          var resultList = [];
          list.forEach(function(entry){
            var data = entry.toJSON();
            if ( data.detail ) {
              try {
                data.detail = JSON.parse(data.detail )
              } catch ( e ) {
                data.detail = null;
              }
            }
            data.time = new Date(data.createdAt).toTimeString();
            resultList.push(data)
          },this)
          opt.success.call(opt.context, resultList)
        }
      }).catch(function(error) {
        if ( opt.error ) {
          opt.error.call(opt.context, error)
        }
      });
    },
    submitScore(scoreEntry, opt){
      var ScoreBoard = AV.Object.extend('ScoreBoard');
      var scoreBoard = new ScoreBoard();
      scoreBoard.set('nickname', scoreEntry.nickname);
      scoreBoard.set('turn', scoreEntry.turn);
      scoreBoard.set('score', scoreEntry.score);
      scoreBoard.set('avatarUrl', scoreEntry.avatarUrl);
      scoreBoard.set('platform', cc.sys.platform);
      scoreBoard.set('detail', JSON.stringify(scoreEntry.detail));
      scoreBoard.save().then(function() {
        if ( opt.success ) {
          opt.success.call(opt.context)
        }
      }, function(error) {
        if ( opt.error ) {
          opt.error.call(opt.context, error)
        }
      });
    }
    // update (dt) {},
});
