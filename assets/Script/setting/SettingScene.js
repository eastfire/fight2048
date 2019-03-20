const Global = require("global");
const Storage = require("storage");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      if ( cc.sys.platform === cc.sys.WECHAT_GAME ) {
        wx.showShareMenu(
          {withShareTicket:true}
        )
        cc.loader.loadRes("Texture/Enemy/snake",cc.SpriteFrame,function(err,data){
          cc.log(err)
          cc.log(data)
          cc.log(data.url)
          wx.onShareAppMessage(
            function(res){
              return {
                title: "可以分享啦，啦啦啦",
                imageUrl: data.url,
                success(res){
                  console.log(res)
                },
                fail(res){
                  console.log(res)
                }
              }
            })
        })
      }
    },
    // wxGetInfo() {
    //   if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
    //   const button = wx.createUserInfoButton({
    //     type: 'text',
    //     text: '登入排行榜',
    //     style: {
    //       left: cc.winSize.width/2,
    //       top: cc.winSize.height/2,
    //       width: 200,
    //       height: 40,
    //       lineHeight: 40,
    //       backgroundColor: '#ffffff',
    //       color: '#000000',
    //       textAlign: 'center',
    //       fontSize: 16,
    //       borderRadius: 4
    //     }
    //   })
    //   button.onTap((res) => {
    //     console.log(res)
    //   })
    // },
    wxShare() {
      if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;

      cc.loader.loadRes("Texture/Enemy/golem",cc.SpriteFrame,function(err,data){
        cc.log(err)
        cc.log(data)
        wx.shareAppMessage({
          title: "可以分享啦，啦啦啦",
          imageUrl: "http://media.eshop-switch.com/s/%E7%84%B0%E7%81%AB%E6%88%98%E8%BD%A6/20190214205933.jpg",
          success(res){
            console.log(res)
          },
          fail(res){
            console.log(res)
          }
        })
      })
    },
    addStar(){
      Global.MenuScene.star += 100;
      Global.UnlockScene.refresh();
    },
    clearData(){
      Storage.clearData("unlocked")
      Storage.clearData("star")
      Storage.clearData("rewardTaken")
      Storage.clearData("progress")
      Storage.clearData("userInfo")
      cc.director.loadScene("IntroScene")
    },
    clearStatistics(){
      Storage.clearData("statistics")
    },

    // update (dt) {},
});
