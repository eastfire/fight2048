import DataSource from "DataSource";
const AV = require('leancloud-storage');
//const AV = require('leancloud-storage/dist/av-weapp-min.js'); //weixin小游戏

cc.Class({
    extends: DataSource,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      var APP_ID = 'Eiq6lDsGb7LVEKxRHPCNv1QP-gzGzoHsz';
      var APP_KEY = 'n3idGwvxn640x7suIE6Hrzso';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },

    loadScore(callback, context){

    },
    submitScore(scoreEntry, callback, context){

    }
    // update (dt) {},
});
