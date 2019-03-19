const DataSource = require("DataSource");

cc.Class({
    extends: DataSource,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor(){

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
      wx.setUserCloudStorage({
        KVDataList: [{ key: 'score', value: scoreEntry.score+"" },
        { key: 'turn', value: scoreEntry.turn+"" },
        { key: 'detail', value: JSON.stringify(scoreEntry.detail) }],
        success: res => {
          console.log(res);
          // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
          let openDataContext = wx.getOpenDataContext();
          openDataContext.postMessage({
            type: 'updateMaxScore',
          });
          if ( opt.success ) {
            opt.success.call(opt.context)
          }
        },
        fail: res => {
          console.log(res);
          if ( opt.error ) {
            opt.error.call(opt.context, error)
          }
        }
      });
    }
    // update (dt) {},
});
