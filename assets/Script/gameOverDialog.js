import Global from "global"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {
      scoreLabel: {
        default: null,
        type: cc.Label,
      },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.currentRoom.setAcceptInput(false);
      Storage.statistics.gameTime ++;
      Storage.saveStatistics();
    },

    setReason(reason){
      this.scoreLabel.string = "";
      this.scoreLabel.string += "分数："+Global.currentRoomScene.score+"\n"
      this.scoreLabel.string += "经过"+Global.currentRoom.turn+"回合\n"
      this.scoreLabel.string += "升到Lv"+Global.currentRoom.hero.getComponent("hero").level+"\n"
      this.scoreLabel.string += "死于"

      if ( reason.type === "poison" ) {
        this.scoreLabel.string += "中毒"
      } else if ( reason.type === "enemy" ) {
        this.scoreLabel.string += "LV"+reason.enemy.level+" "+reason.enemy.title
      }
    },
    home() {
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
