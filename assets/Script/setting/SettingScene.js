import Global from "global"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      if ( wx ) {
        wx.showShareMenu(
          {withShareTicket:true}
        )
        cc.loader.loadRes("texture/Enemy/ghost",function(err,data){
          cc.log(err)
          cc.log(data)
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
    wxShare() {
      if ( !wx ) return;

      cc.loader.loadRes("Texture/Enemy/golem",function(err,data){
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
      this.star += 100;
      Global.UnlockScene.refresh();
    },
    clearData(){
      Storage.clearData("unlocked")
      Storage.clearData("star")
      Storage.clearData("rewardTaken")
      Storage.clearData("progress")
      cc.director.loadScene("IntroScene")
    },
    clearStatistics(){
      Storage.clearData("statistics")
    },

    // update (dt) {},
});
