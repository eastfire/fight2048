const Global = require("global");
const Common = require("common");
const Storage = require("storage");
const i18n = require('i18n');

module.exports = {
  unlocks:[
  {
    name:"warriorSkillSlot3",
    displayName:i18n.t("warriorSkillSlot3"),
    prerequests: null,
    price: 5,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorSkillSlot4",
    displayName:i18n.t("warriorSkillSlot4"),
    prerequests: ["warriorSkillSlot3"],
    price: 20,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorSkillSlot5",
    displayName:i18n.t("warriorSkillSlot5"),
    prerequests: ["warriorSkillSlot4"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 5;
      Storage.saveProgress();
    }
  },
  {
    name:"backwardSlashSkill",
    displayName:"战士的拖刀技",
    prerequests: null,
    price: 5,
    type:"skill",
    icon: "Texture/Skill/backwardSlashSkill"
  },
  {
    name:"whirlSkill",
    displayName:"战士的回旋斩",
    prerequests: null,
    price: 5,
    type:"skill",
    icon: "Texture/Skill/whirlSkill"
  },{
    name:"bigWhirlSkill",
    displayName:"战士的大回旋斩",
    prerequests: ["whirlSkill"],
    price: 50,
    type:"skill",
    icon: "Texture/Skill/bigWhirlSkill"
  },{
    name:"crossSlashSkill",
    displayName:"战士的十字斩",
    prerequests: ["backwardSlashSkill"],
    price: 50,
    type:"skill",
    icon: "Texture/Skill/crossSlashSkill"
  },
  {
    name:"warriorPerkSlot2",
    displayName:"战士的第2个特质槽",
    prerequests: null,
    price: 20,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 2;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"warriorPerkSlot3",
    displayName:"战士的第3个特质槽",
    prerequests: ["warriorPerkSlot2"],
    price: 50,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 3;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"warriorPerkSlot4",
    displayName:"战士的第4个特质槽",
    prerequests: ["warriorPerkSlot3"],
    price: 200,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 4;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"cleric",
    displayName:"牧师",
    prerequests: null,
    price: 100,
    type:"hero",
    icon: "Texture/Hero/unlock-cleric"
  },
  {
    name:"clericSkillSlot3",
    displayName:"牧师的第3个技能槽",
    prerequests: ["cleric"],
    price: 50,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"clericSkillSlot4",
    displayName:"牧师的第4个技能槽",
    prerequests: ["clericSkillSlot3"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"clericSkillSlot5",
    displayName:"牧师的第5个技能槽",
    prerequests: ["clericSkillSlot4"],
    price: 400,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 5;
      Storage.saveProgress();
    }
  },{
    name:"turnUndeadSkill",
    displayName:"牧师的驱逐死灵技能",
    prerequests: ["cleric"],
    price: 50,
    type:"skill",
    icon: "Texture/Skill/turnUndeadSkill"
  },{
    name:"resurrectionSkill",
    displayName:"牧师的复活技能",
    prerequests: ["cleric"],
    price: 150,
    type:"skill",
    icon: "Texture/Skill/resurrectionSkill"
  },{
    name:"wisdomSkill",
    displayName:"牧师的睿智技能",
    prerequests: ["cleric"],
    price: 300,
    type:"skill",
    icon: "Texture/Skill/wisdomSkill"
  },{
    name:"angelSkill",
    displayName:"牧师的召唤天使技能",
    prerequests: ["wisdomSkill","resurrectionSkill"],
    price: 1000,
    type:"skill",
    icon: "Texture/Skill/angelSkill"
  },
  {
    name:"clericPerkSlot2",
    displayName:"牧师的第2个特质槽",
    prerequests: ["cleric"],
    price: 50,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.cleric = 2;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"clericPerkSlot3",
    displayName:"牧师的第3个特质槽",
    prerequests: ["clericPerkSlot2"],
    price: 200,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.cleric = 3;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"clericPerkSlot4",
    displayName:"牧师的第4个特质槽",
    prerequests: ["clericPerkSlot3"],
    price: 1000,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.cleric = 4;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"wizard",
    displayName:"法师",
    prerequests: null,
    price: 200,
    type:"hero",
    icon: "Texture/Hero/unlock-wizard"
  },{
    name:"wizardSkillSlot3",
    displayName:"法师的第3个技能槽",
    prerequests: ["wizard"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"wizardSkillSlot4",
    displayName:"法师的第4个技能槽",
    prerequests: ["wizardSkillSlot3"],
    price: 300,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"wizardSkillSlot5",
    displayName:"法师的第5个技能槽",
    prerequests: ["wizardSkillSlot4"],
    price: 1000,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 5;
      Storage.saveProgress();
    }
  },{
    name:"teleportSkill",
    displayName:"法师的传送技能",
    prerequests: ["wizard"],
    price: 50,
    type:"skill",
    icon: "Texture/Skill/teleportSkill"
  },{
    name:"tornadoSkill",
    displayName:"法师的狂风技能",
    prerequests: ["wizard"],
    price: 250,
    type:"skill",
    icon: "Texture/Skill/tornadoSkill"
  },{
    name:"meteorShowerSkill",
    displayName:"法师的陨石雨技能",
    prerequests: ["wizard"],
    price: 500,
    type:"skill",
    icon: "Texture/Skill/meteorShowerSkill"
  },{
    name:"fireballSkill",
    displayName:"法师的火球术技能",
    prerequests: ["wizard"],
    price: 1000,
    type:"skill",
    icon: "Texture/Skill/fireballSkill"
  },{
    name:"lighteningSkill",
    displayName:"法师的闪电链技能",
    prerequests: ["wizard"],
    price: 1500,
    type:"skill",
    icon: "Texture/Skill/lighteningSkill"
  },
  {
    name:"wizardPerkSlot2",
    displayName:"法师的第2个特质槽",
    prerequests: ["wizard"],
    price: 50,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.wizard = 2;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"wizardPerkSlot3",
    displayName:"法师的第3个特质槽",
    prerequests: ["wizardPerkSlot2"],
    price: 200,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.wizard = 3;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"wizardPerkSlot4",
    displayName:"法师的第4个特质槽",
    prerequests: ["wizardPerkSlot3"],
    price: 1000,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.wizard = 4;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"thief",
    displayName:"盗贼",
    prerequests: ["cleric","wizard"],
    price: 300,
    type:"hero",
    icon: "Texture/Hero/unlock-thief"
  },{
    name:"thiefSkillSlot3",
    displayName:"盗贼的第3个技能槽",
    prerequests: ["thief"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.thief = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"thiefSkillSlot4",
    displayName:"盗贼的第4个技能槽",
    prerequests: ["thiefSkillSlot3"],
    price: 300,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.thief = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"thiefSkillSlot5",
    displayName:"盗贼的第5个技能槽",
    prerequests: ["thiefSkillSlot4"],
    price: 1000,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.thief = 5;
      Storage.saveProgress();
    }
  },{
    name:"blinkSkill",
    displayName:"盗贼的闪现技能",
    prerequests: ["thief"],
    price: 100,
    type:"skill",
    icon: "Texture/Skill/blinkSkill"
  },{
    name:"smokingBombSkill",
    displayName:"盗贼的烟雾弹技能",
    prerequests: ["thief"],
    price: 200,
    type:"skill",
    icon: "Texture/Skill/smokingBombSkill"
  },{
    name:"treasureSkill",
    displayName:"盗贼的寻宝技能",
    prerequests: ["thief"],
    price: 200,
    type:"skill",
    icon: "Texture/Skill/treasureSkill"
  },{
    name:"exchangeSkill",
    displayName:"盗贼的安装炸弹技能",
    prerequests: ["treasureSkill"],
    price: 500,
    type:"skill",
    icon: "Texture/Skill/exchangeSkill"
  },{
    name:"eightArrowSkill",
    displayName:"盗贼的八方箭技能",
    prerequests: ["thief"],
    price: 1500,
    type:"skill",
    icon: "Texture/Skill/eightArrowSkill"
  },
  {
    name:"thiefPerkSlot2",
    displayName:"盗贼的第2个特质槽",
    prerequests: ["thief"],
    price: 50,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.thief = 2;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"thiefPerkSlot3",
    displayName:"盗贼的第3个特质槽",
    prerequests: ["thiefPerkSlot2"],
    price: 200,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.thief = 3;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  },
  {
    name:"thiefPerkSlot4",
    displayName:"盗贼的第4个特质槽",
    prerequests: ["thiefPerkSlot3"],
    price: 1000,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.thief = 4;
      Storage.saveProgress();
      Global.ModeSelectScene.refresh();
    }
  }
]
}
