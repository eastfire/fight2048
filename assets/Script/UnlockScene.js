import Global from "global";
import Common from "common"
import Storage from "storage";

cc.Class({
    extends: cc.Component,

    properties: {
      unlockList:{
        default: null,
        type:cc.Layout
      },
      unlock:{
        default:null,
        type:cc.Prefab
      }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      Global.UnlockScene = this;

      var unlocks = [
        {
          name:"warriorSkillSlot3",
          displayName:"战士的第3个技能槽",
          prerequests: null,
          price: 5,
          type:"skillSlot",
          icon: "Texture/skillSlot"
        },
        {
          name:"warriorSkillSlot4",
          displayName:"战士的第4个技能槽",
          prerequests: ["warriorSkillSlot3"],
          price: 20,
          type:"skillSlot",
          icon: "Texture/skillSlot"
        },
        {
          name:"backwardSlashSkill",
          displayName:"战士的拖刀技",
          prerequests: null,
          price: 5,
          type:"skill",
          icon: "Texture/backwardSlashSkill"
        },
        {
          name:"whirlSkill",
          displayName:"战士的回旋斩",
          prerequests: null,
          price: 5,
          type:"skill",
          icon: "Texture/bigWhirlSkill"
        },{
          name:"bigWhirlSkill",
          displayName:"战士的大回旋斩",
          prerequests: ["bigWhirlSkill"],
          price: 20,
          type:"skill",
          icon: "Texture/bigWhirlSkill"
        },
      ];
      unlocks.forEach(function(entry){
        if ( !Storage.unlocked[entry.name] ){
          this.addUnlock(entry)
        }
      },this)
    },

    addUnlock(entry){
      var unlockNode = cc.instantiate(this.unlock)
      unlockNode.x = 0;
      var unlock = unlockNode.getComponent("unlock")
      unlock.unlockName = entry.name;
      unlock.displayName = entry.displayName;
      unlock.type = entry.type;
      unlock.price = entry.price;
      unlock.icon = entry.icon;
      unlock.prerequests = entry.prerequests;

      this.unlockList.node.addChild(unlockNode)
    },
    refresh(){
      this.unlockList.children.forEach(function(child){
        child.getComponent("unlock").validate();
      })
    }
    // update (dt) {},
});
