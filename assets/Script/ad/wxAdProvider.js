const AdProvider = require("adProvider");

cc.Class({
  extends: AdProvider,

  properties: {

  },

  initBanner(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
    this.bannerAd = wx.createBannerAd({
      adUnitId: 'xxxx',
      style: {
        left: 10,
        top: 76,
        width: 320
      }
    })

  },
  refreshBanner(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
  },
  showBanner(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
    this.bannerAd.show()
  },
  hideBanner(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
    this.bannerAd.hide()
  },
  showVideo(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
  },
  initVideo(){
    if ( cc.sys.platform !== cc.sys.WECHAT_GAME ) return;
  }
})
