import Global from "global";
import Common from "common"
import Storage from "storage";
import MenuScene from "MenuScene"


cc.Class({
  extends: cc.Component,

  properties: {
    nicknameLabel: cc.Label,
    avatar: cc.Sprite,
    scoreLabel:cc.Label,
    turnLabel:cc.Label,
    detailLayout: cc.Layout,
    heroLevelLabel: cc.Label,
    killByLabel: cc.Label,
    killByIcon: cc.Sprite,
    timeLabel: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},
  formatDate(date, fmt)
  { //author: meizz
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
      "H+" : date.getHours(), //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  },

  start () {
  },

  updateItem: function(entry, itemID) {
    this.itemID = itemID;
    this.entry = entry;
    this.nicknameLabel.string = entry.nickname;
    this.scoreLabel.string = entry.score;
    this.turnLabel.string = entry.turn;
    this.timeLabel.string = this.formatDate(new Date(entry.createdAt), "yyyy-MM-dd HH:mm");
    this.heroLevelLabel.string = "Lv"+entry.detail.level;

    if ( entry.avatarUrl ) {
      cc.loader.load({
        url: entry.avatarUrl,
        // type: "jpeg"
        type: "png"
      }, (err, texture) => {
        if (err) {
          cc.log(err)
          return;
        }
        var frame = new cc.SpriteFrame(texture)
        this.avatar.spriteFrame = frame;
        //TODO 自己回收frame
      });
    }
    this.layoutDetail();
  },

  loadIcon(sprite, icon){
    cc.loader.loadRes(icon, cc.SpriteFrame,
      (err, frame)=>{
        sprite.spriteFrame = frame;
        sprite.node.width = 45
        sprite.node.height = 45
    })
  },

  layoutDetail(){
    this.detailLayout.node.removeAllChildren();
    if ( !this.entry.detail ) return;
    var slot = new cc.Node();
    slot.addComponent(cc.Sprite);
    this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Hero/unlock-"+this.entry.detail.type)
    slot.y = 0;
    this.detailLayout.node.addChild(slot)
    this.entry.detail.skills.forEach(function(skill){
      var slot = new cc.Node()
      slot.addComponent(cc.Sprite)
      this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Skill/"+skill)
      slot.y = 0;
      this.detailLayout.node.addChild(slot)
    },this)
    this.entry.detail.perks.forEach(function(perkName){
      var slot = new cc.Node();
      slot.addComponent(cc.Sprite);
      this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Perk/"+perkName)
      slot.y = 0;
      this.detailLayout.node.addChild(slot);
    },this)

    if ( this.entry.detail.killedBy.type == "enemy" ) {
      var enemyType = this.entry.detail.killedBy.enemy;
      if ( Common.contains(Global.bossPool, enemyType) ) {
        this.killByLabel.string = "";
      } else {
        this.killByLabel.string = "Lv"+this.entry.detail.killedBy.level;
      }

      if ( enemyType == "slime" ) {
        enemyType = "slime-red"
      }
      cc.loader.loadRes("Texture/Enemy/"+enemyType, cc.SpriteFrame,
        (err, frame)=>{
          if ( err ) {
            cc.log(err)
          } else {
            this.killByIcon.spriteFrame = frame;
          }
      })
    } else if ( this.entry.detail.killedBy.type == "poison" ) {
      this.killByLabel.string = "";
      cc.loader.loadRes("Texture/Status/status-poison", cc.SpriteFrame,
        (err, frame)=>{
          this.killByIcon.spriteFrame = frame;
      })
    }
  }
  // update (dt) {},
});
