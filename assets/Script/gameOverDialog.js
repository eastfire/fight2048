import Global from "global"
import Storage from "storage"

cc.Class({
    extends: cc.Component,

    properties: {
      scoreLabel: cc.Label,
      skillPerkList: cc.Layout
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
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
        this.scoreLabel.string += "LV"+reason.enemy.level+reason.enemy.title
      }

      Global.currentRoomScene.forEachActiveSkill(function(skill){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Skill/"+skill.skillName)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this)
      Global.selectedPerk.forEach(function(entry){
        var slot = new cc.Node()
        slot.addComponent(cc.Sprite)
        this.loadIcon(slot.getComponent(cc.Sprite),"Texture/Perk/"+entry.name)
        slot.y = 0;
        this.skillPerkList.node.addChild(slot)
      },this);


      // for ( var i = 0; i < Global.selectedPerk.length; i++){
      //   var entry = Global.selectedPerk[i]
      //   var iconNode = cc.instantiate(slot)
      //   (function(sprite, name){
      //     cc.loader.loadRes("Texture/Perk/"+name, cc.SpriteFrame,
      //       (err, frame)=>{
      //         sprite.spriteFrame = frame;
      //     })
      //   })(iconNode.getComponent(cc.Sprite), entry.name)
      //   iconNode.y = 0;
      //   iconNode.width = 50
      //   iconNode.height = 50
      //   this.skillPerkList.node.addChild(iconNode)
      // }

      Global.currentRoom.node.active = false;
      Global.currentRoomScene.effectLayer.active = false;
      Global.currentRoomScene.exitButton.node.active = false;
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
