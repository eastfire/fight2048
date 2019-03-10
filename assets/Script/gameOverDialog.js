import Global from "global"
import Storage from "storage"
import LeanCloudDataSource from "LeanCloudDataSource";

cc.Class({
    extends: cc.Component,

    properties: {
      scoreLabel: cc.Label,
      skillPerkList: cc.Layout,
      submitButton: cc.Button,
      inputNameDialog: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.dataSource = new LeanCloudDataSource();
      if ( Storage.userInfo ) {
        this.submitScore();
      } else {
        //登入排行榜
        this.getUserInfo(function(userInfo){
          this.submitScore(function(){
            this.toScoreBoard();
          },this);
        }, this)
      }
    },

    submitScore(callback, context){
      //TODO 显示loading
      this.scoreEntry.nickname = Storage.userInfo.nickname;
      this.scoreEntry.avatarUrl = Storage.userInfo.avatarUrl;
      this.dataSource.submitScore(this.scoreEntry, {
        success(){
          //TODO 结束loading
          if ( callback ) {
            callback.call(context)
          }
        },
        error(error){
          //TODO 结束loading
        },
        context: this
      })
    },

    getUserInfo(callback, context){
      if ( cc.sys.platform == cc.sys.WECHAT_GAME ) {
        var position = Global.currentRoom.node.convertToWorldSpaceAR(this.submitButton.node.position)
        const button = wx.createUserInfoButton({
          type: 'text',
          text: '登入排行榜',
          style: {
            left: position.x,
            top: position.y,
            width: 150,
            height: 50,
            lineHeight: 40,
            backgroundColor: '#ffffff',
            color: '#000000',
            textAlign: 'center',
            fontSize: 16,
            borderRadius: 4
          }
        })
        button.onTap((res) => {
          console.log(res)
          if ( res ) {
            var userInfo = {
              nickname: res.nickname,
              avatarUrl: res.avatarUrl
            }
            Storage.saveUserInfo(userInfo)
            callback.call(context, userInfo)
          }
        })
      } else {
        //弹出输入框
        var dialog = cc.instantiate(this.inputNameDialog);
        dialog.getComponent("inputNameDialog").setCallback(function(nickname){
          this.node.active = true;
          var userInfo = {
            nickname: nickname,
          }
          Storage.saveUserInfo(userInfo)
          callback.call(context, nickname)
        }, this)
        this.node.active = false;
        Global.currentRoomScene.node.addChild(dialog)
      }
    },

    loadIcon(sprite, icon){
      cc.loader.loadRes(icon, cc.SpriteFrame,
        (err, frame)=>{
          sprite.spriteFrame = frame;
          sprite.node.width = 50
          sprite.node.height = 50
      })
    },

    setReason(reason){
      this.scoreEntry = {
        detail:{}
      };

      Storage.recordGameOver(reason, Global.currentRoom, Global.currentRoom.hero.getComponent("hero"));
      this.scoreLabel.string = "";
      this.scoreLabel.string += "分数："+Global.currentRoomScene.score+"\n"
      this.scoreLabel.string += "经过"+Global.currentRoom.turn+"回合\n"
      this.scoreLabel.string += "升到Lv"+Global.currentRoom.hero.getComponent("hero").level+"\n"
      this.scoreLabel.string += "受到"+reason.damage+"伤害"
      this.scoreLabel.string += "死于"

      if ( reason.type === "poison" ) {
        this.scoreLabel.string += "中毒"
      } else if ( reason.type === "enemy" ) {
        if ( reason.enemy.isBoss ) {
          this.scoreLabel.string += reason.enemy.title
        } else {
          this.scoreLabel.string += "LV"+reason.enemy.level+reason.enemy.title
        }
      }

      var slot = new cc.Node()
      slot.addComponent(cc.Sprite)
      this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Hero/unlock-"+Global.currentRoom.hero.getComponent("hero").subtype)
      slot.y = 0;
      this.skillPerkList.node.addChild(slot)

      this.scoreEntry.detail.skills = [];
      Global.currentRoomScene.forEachActiveSkill(function(skill){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Skill/"+skill.skillName)
        this.scoreEntry.detail.skills.push(skill.skillName)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this)
      this.scoreEntry.detail.perks = [];
      Global.selectedPerk.forEach(function(entry){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Perk/"+entry.name)
        this.scoreEntry.detail.perks.push(entry.name)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this);

      Global.currentRoom.node.active = false;
      Global.currentRoomScene.effectLayer.active = false;
      Global.currentRoomScene.exitButton.node.active = false;

      this.scoreEntry.score = Global.currentRoomScene.score;
      this.scoreEntry.turn = Global.currentRoom.turn;
      this.scoreEntry.detail.level = Global.currentRoom.hero.getComponent("hero").level
      this.scoreEntry.detail.type = Global.currentRoom.hero.getComponent("hero").subtype;
      this.scoreEntry.detail.killedBy = {
        type:reason.type,
        damage: reason.damage
      }
      if ( reason.type === "enemy" ) {
        this.scoreEntry.detail.killedBy.enemy = reason.enemy.type;
        this.scoreEntry.detail.killedBy.level = reason.enemy.level;
      }
    },
    toScoreBoard() {
      Global.currentRoom.destroy();
      Global.currentRoom = null;
      Global.currentRoomScene = null;
      cc.director.loadScene("MenuScene",function(){
        Global.MenuScene.toPage(null, 3)
      });
    },
    home() {
      Global.currentRoom.destroy();
      Global.currentRoom = null;
      Global.currentRoomScene = null;
      cc.director.loadScene("MenuScene");
    },
    restart(){
      this.node.runAction(cc.sequence(
        cc.fadeOut(Global.DIALOG_EXIT_TIME),
        cc.callFunc(function(){
          cc.director.loadScene("RoomScene")
        })
      ))
    }
    // update (dt) {},
});
